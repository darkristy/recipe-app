import { useEffect, useState, FunctionComponent } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { StoreProvider } from "easy-peasy";
import { createClient, Provider } from "urql";

import { GlobalStyles } from "../styles/globals";
import store from "../store";
import { getToken } from "../lib/helpers";

interface MyAppProps {
	Component: any;
	pageProps: any;
}

const client = createClient({
	url: "http://localhost:4000/graphql",
	fetchOptions: () => {
		const token = getToken();
		return {
			headers: { authorization: token ? `Bearer ${token}` : "" },
		};
	},
});

const MyApp: FunctionComponent<MyAppProps> = ({ Component, pageProps }) => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const body = (
		<Provider value={client}>
			<StoreProvider store={store}>
				<CacheProvider value={cache}>
					<GlobalStyles />
					<AnimatePresence exitBeforeEnter>
						<Component {...pageProps} key={router.route} />
					</AnimatePresence>
				</CacheProvider>
			</StoreProvider>
		</Provider>
	);

	if (!mounted) {
		return <div style={{ visibility: "hidden" }}>{body}</div>;
	}
	return body;
};

export default MyApp;
