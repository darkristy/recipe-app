import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { StoreProvider } from "easy-peasy";
import { NextPage } from "next";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { GlobalStyles } from "../styles/globals";
import store from "../store";
import { CLIENT_URL } from "../utils/constants";
import ThemeWrapper from "../shared/ThemeWrapper";

const MyApp: NextPage = ({ Component, pageProps, jid }: any) => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	const authLink = setContext((_, { headers }) => {
		const token = jid;

		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	const httpLink = createHttpLink({
		uri: `${CLIENT_URL}/api/graphql`,
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});

	useEffect(() => {
		setMounted(true);
	}, []);

	const body = (
		<ApolloProvider client={client}>
			<StoreProvider store={store}>
				<ThemeWrapper>
					<CacheProvider value={cache}>
						<GlobalStyles />
						<AnimatePresence exitBeforeEnter>
							<Component {...pageProps} key={router.route} />
						</AnimatePresence>
					</CacheProvider>
				</ThemeWrapper>
			</StoreProvider>
		</ApolloProvider>
	);

	if (!mounted) {
		return <div style={{ visibility: "hidden" }}>{body}</div>;
	}
	return body;
};

export default MyApp;

MyApp.getInitialProps = (ctx): { jid: string } => ({
	jid: "",
});
