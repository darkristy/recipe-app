import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { CacheProvider } from "@emotion/react";
import { cache } from "@emotion/css";
import { StoreProvider } from "easy-peasy";
import { NextPage } from "next";

import { GlobalStyles } from "../styles/globals";
import store from "../store";
import ThemeWrapper from "../shared/ThemeWrapper";

const MyApp: NextPage = ({ Component, pageProps }: any) => {
	const router = useRouter();

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const body = (
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
	);

	if (!mounted) {
		return <div style={{ visibility: "hidden" }}>{body}</div>;
	}
	return body;
};

export default MyApp;
