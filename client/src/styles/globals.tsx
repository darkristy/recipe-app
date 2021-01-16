/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { css, Global, withTheme } from "@emotion/react";
import styled from "@emotion/styled";

import * as pallete from "../utils/variables";

import { media } from "./style-functions";

const makeGlobalStyles = (theme): any => css`
	* {
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		font-size: 100%;
		vertical-align: baseline;
		box-sizing: border-box;
	}

	body {
		background: ${theme.primary};
		display: block;
	}

	ul {
		list-style: none;
	}
`;
// @ts-ignore
export const GlobalStyles = withTheme(({ theme }) => <Global styles={makeGlobalStyles(theme)} />);

// .grid1 .grid_three_column {
// 	width: 100%
// }

// .grid1 .last_column .vc_column-inner .wpb_wrapper {
// 	display: block
// }

// .grid1 .last_column  {
// 	width: 104%
// }
