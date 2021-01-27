import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

import { Mixins } from "../styles/mixins";

export interface ButtonProps {
	primary?: boolean;
	type?: "button" | "submit" | "reset";
	secondary?: boolean;
	borderColor?: string;
	label: string;
	size?: "full" | string;
	onClick?: () => void;
}

const ButtonStyles = {
	ButtonContainer: styled.button<{ primary: boolean; secondary: boolean; width: any; borderColor: string }>`
		width: ${(props): any => props.width};
		border-radius: 8px;
		${(props): any =>
			props.primary &&
			css`
				padding: 13px 0px;
				width: ${props.width};
				border-radius: 8px;
				background: ${props.theme.tiertiary};
				border: none;
				p {
					color: white;
					margin-block-start: 0;
					margin-block-end: 0;
				}
			`};
		${(props): any =>
			props.secondary &&
			css`
				background: none;
				border: 2px solid ${props.borderColor};
				padding: 11px 0px;
				p {
					color: ${props.theme.quaternary};
					margin-block-start: 0;
					margin-block-end: 0;
				}
			`};
	`,
	Label: styled.p`
		font-size: 18px;
		font-weight: 500;
	`,
};

const Button: React.FC<ButtonProps> = ({ primary = false, secondary = false, label, size, ...props }) => {
	const theme = useTheme();
	const isPrimary = primary ? true : false;
	const isSecondary = secondary || !primary ? true : false;

	const width = size === "full" ? "100%" : size || size ? size : "100px";

	const borderColor = props.borderColor ? props.borderColor : theme.quaternary;

	return (
		<ButtonStyles.ButtonContainer
			type={props.type}
			primary={isPrimary}
			secondary={isSecondary}
			onClick={props.onClick}
			width={width}
			borderColor={borderColor}
		>
			<Mixins.Flex center>
				<ButtonStyles.Label>{label}</ButtonStyles.Label>
			</Mixins.Flex>
		</ButtonStyles.ButtonContainer>
	);
};

export default Button;
