import { css } from "@emotion/react";
import styled from "@emotion/styled";

const Flex = styled.div<{ spaceBetween?: any; flexEnd?: any; alignTop?: any; noHeight?: any; center?: any }>`
	position: relative;
	display: flex;
	align-items: center;
	${(props): any =>
		props.spaceBetween &&
		css`
			justify-content: space-between;
		`};
	${(props): any =>
		props.flexEnd &&
		css`
			justify-content: flex-end;
		`};
	${(props): any =>
		props.alignTop &&
		css`
			align-items: flex-start;
		`};
	${(props): any =>
		props.center &&
		css`
			justify-content: center;
		`};
	${(props): any =>
		props.noHeight &&
		css`
			height: 0;
		`};
`;

export const Mixins = {
	Flex: Flex,
};
