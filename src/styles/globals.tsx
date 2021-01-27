/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { css, Global, withTheme } from "@emotion/react";
import styled from "@emotion/styled";

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

	#__next {
		height: 100%;
	}

	body {
		background: ${theme.primary};
		display: block;
	}

	ul {
		list-style: none;
	}

	h1,
	h2,
	h3 {
		font-family: ${theme.fonts.heading};
	}

	p {
		font-family: ${theme.fonts.body};
	}

	h2 {
		font-size: 38px;
	}

	ul {
		list-style: none;
	}

	a {
		text-decoration: none;

		/* &:focus {
			box-shadow: 0 0 0 1px rgba(256, 256, 256, 0.6);
		} */
	}
`;

// @ts-ignore
export const GlobalStyles = withTheme(({ theme }) => <Global styles={makeGlobalStyles(theme)} />);

export const Wrapper = styled.div`
	padding: 9%;
`;
