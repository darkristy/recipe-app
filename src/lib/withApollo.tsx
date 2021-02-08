/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-shadow */
import {
	ApolloClient,
	createHttpLink,
	from,
	InMemoryCache,
	ApolloProvider,
	NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "isomorphic-unfetch";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { onError } from "@apollo/client/link/error";
import cookie from "cookie";
import Head from "next/head";

import AppBar from "../components/AppBar";
import { CLIENT_URL } from "../utils/constants";
import { getAccessToken, setAccessToken } from "../utils/helpers";

const isServer = (): boolean => typeof window === "undefined";

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(
	PageComponent: any,
	{ ssr = true } = {}
): {
	({ apolloClient, serverAccessToken, apolloState, ...pageProps }: any): JSX.Element;
	displayName: string;
	getInitialProps(ctx: any): Promise<any>;
} {
	const WithApollo = ({ apolloClient, path, serverAccessToken, apolloState, ...pageProps }: any): JSX.Element => {
		if (!isServer() && !getAccessToken()) {
			setAccessToken(serverAccessToken);
		}
		const client = apolloClient || initApolloClient(apolloState);

		const whiteListedRoutes = /^(\/recipes|\/home|\/bookmarks|\/new-recipe|\/profile)$/;

		const isDisabled = path.match(whiteListedRoutes) ? false : true;

		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
				<AppBar disabled={isDisabled} />
			</ApolloProvider>
		);
	};

	if (process.env.NODE_ENV !== "production") {
		// Find correct display name
		const displayName = PageComponent.displayName || PageComponent.name || "Component";

		// Warn if old way of installing apollo is used
		if (displayName === "App") {
			console.warn("This withApollo HOC only works with PageComponents.");
		}

		// Set correct display name for devtools
		WithApollo.displayName = `withApollo(${displayName})`;
	}

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async (ctx: any): Promise<any> => {
			const { AppTree, req, res } = ctx;

			const path = ctx.pathname;
			let serverAccessToken = "";

			if (isServer()) {
				const cookies = cookie.parse(req.headers.cookie);

				if (cookies.jid) {
					const response = await fetch(`${CLIENT_URL}/api/refresh_token`, {
						method: "POST",
						credentials: "include",
						headers: {
							cookie: "jid=" + cookies.jid,
						},
					});
					const data = await response.json();

					serverAccessToken = data.accessToken;
				}
			}

			// Run all GraphQL queries in the component tree
			// and extract the resulting data
			const apolloClient = (ctx.apolloClient = initApolloClient({}, serverAccessToken));

			const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

			// Only on the server
			if (typeof window === "undefined") {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (res && res.finished) {
					return {};
				}

				if (ssr) {
					try {
						// Run all GraphQL queries
						const { getDataFromTree } = await import("@apollo/react-ssr");
						await getDataFromTree(
							<AppTree
								pageProps={{
									...pageProps,
									path,
									apolloClient,
								}}
								apolloClient={apolloClient}
							/>
						);
					} catch (error) {
						// Prevent Apollo Client GraphQL errors from crashing SSR.
						// Handle them in components via the data.error prop:
						// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
						console.error("Error while running `getDataFromTree`", error);
					}
				}

				// getDataFromTree does not call componentWillUnmount
				// head side effect therefore need to be cleared manually
				Head.rewind();
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract();
			const { id } = ctx.query;

			return {
				...pageProps,
				apolloState,
				serverAccessToken,
				id,
				path,
			};
		};
	}

	return WithApollo;
}

let apolloClient: ApolloClient<any> | null = null;

/**
 * Creates or reuses apollo client in the browser.
 */
const initApolloClient = (initState: any, serverAccessToken?: string): ApolloClient<any> => {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (isServer()) {
		return createApolloClient(initState, serverAccessToken);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		// setAccessToken(cookie.parse(document.cookie).test);
		apolloClient = createApolloClient(initState);
	}

	return apolloClient;
};

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
const createApolloClient = (initialState = {}, serverAccessToken?: string): ApolloClient<NormalizedCacheObject> => {
	const httpLink = createHttpLink({
		uri: `${CLIENT_URL}/api/graphql`,
		credentials: "include",
		fetch,
	});

	const refreshLink = new TokenRefreshLink({
		accessTokenField: "accessToken",
		isTokenValidOrUndefined: (): boolean => {
			const token = getAccessToken();

			if (!token) {
				return true;
			}

			try {
				// @ts-ignore
				const { exp } = jwtDecode(token);
				if (Date.now() >= exp * 1000) {
					return false;
				} else {
					return true;
				}
			} catch {
				return false;
			}
		},
		fetchAccessToken: (): Promise<Response> =>
			fetch(`${CLIENT_URL}/api/refresh_token`, {
				method: "POST",
				credentials: "include",
			}),
		handleFetch: (accessToken): void => {
			setAccessToken(accessToken);
		},
		handleError: (err): void => {
			console.warn("Your refresh token is invalid. Try to relogin");
			console.error(err);
		},
	});

	const authLink = setContext((_request, { headers }) => {
		const token = isServer() ? serverAccessToken : getAccessToken();
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	const errorLink = onError(({ graphQLErrors, networkError }) => {
		console.log(graphQLErrors);
		console.log(networkError);
	});

	return new ApolloClient({
		ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
		link: from([refreshLink, authLink, errorLink, httpLink]),
		cache: new InMemoryCache().restore(initialState),
	});
};
