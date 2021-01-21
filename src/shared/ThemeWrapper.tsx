import { FunctionComponent } from "react";
import { ThemeProvider } from "@emotion/react";

import { useStoreState } from "../store/hooks";
import { darkTheme, lightTheme } from "../styles/theme";

const ThemeWrapper: FunctionComponent = ({ children }) => {
	const currentTheme = useStoreState((state) => state.currentTheme);

	return <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
