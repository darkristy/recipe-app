import cookie from "cookie";
import { QueryClient, QueryClientProvider } from "react-query";

import { CLIENT_URL } from "../utils/constants";
import { getAccessToken, setAccessToken } from "../utils/helpers";

const isServer = (): boolean => typeof window === "undefined";

export function withAuth(
	PageComponent: any,
	{ ssr = true } = {}
): {
	({ serverAccessToken, ...pageProps }: any): JSX.Element;
	displayName: string;
	getInitialProps(ctx: any): Promise<any>;
} {
	const WithAuth = ({ serverAccessToken, ...pageProps }: any): JSX.Element => {
		if (!isServer() && !getAccessToken()) {
			setAccessToken(serverAccessToken);
		}

		const queryClient = new QueryClient();

		return (
			<QueryClientProvider client={queryClient}>
				<PageComponent {...pageProps} />
			</QueryClientProvider>
		);
	};

	if (process.env.NODE_ENV !== "production") {
		// Find correct display name
		const displayName = PageComponent.displayName || PageComponent.name || "Component";

		// Warn if old way of installing apollo is used
		if (displayName === "App") {
			console.warn("This withAuth HOC only works with PageComponents.");
		}

		// Set correct display name for devtools
		WithAuth.displayName = `withAuth(${displayName})`;
	}

	if (ssr || PageComponent.getInitialProps) {
		WithAuth.getInitialProps = async (ctx: any): Promise<any> => {
			const { req } = ctx;

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

			const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

			const { id } = ctx.query;

			return {
				...pageProps,
				token: serverAccessToken,
				id,
			};
		};
	}

	return WithAuth;
}
