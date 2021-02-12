import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface FlexProps {
	spaceBetween?: any;
	flexEnd?: any;
	alignTop?: any;
	noHeight?: any;
	center?: any;
	margin?: any;
}

interface MarginProps {
	marginBottom?: any;
	marginTop?: any;
	marginLeft?: any;
	marginRight?: any;
}

interface SpacerProps {
	grow?: string;
	width?: string;
	height?: string;
}
const Flex = styled.div<FlexProps>`
	position: relative;
	display: flex;
	align-items: center;
	margin: ${(props): string => (props.margin ? props.margin : "")};
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

const Margin = styled.div<MarginProps>`
	margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
	margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)};
	margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
	margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)};
`;

const Spacer = styled.div<SpacerProps>`
	width: ${(props) => (props.width ? props.width : 0)};
	flex-grow: ${(props) => (props.grow ? props.grow : 0)};
	height: ${(props) => (props.height ? props.height : 0)};
`;

export const Mixins = {
	Flex,
	Margin,
	Spacer,
};
