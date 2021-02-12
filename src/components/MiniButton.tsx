import styled from "@emotion/styled";
import { FC } from "react";

import { Mixins } from "../styles/mixins";

export interface MiniButtonProps {
	label: string;
	borderRadius?: string;
	padding?: string;
	onClick?: () => void;
}

const ButtonStyles = {
	ButtonContainer: styled.button<{ padding?: string; borderRadius?: string }>`
		border-radius: ${(props): string => (props.borderRadius ? props.borderRadius : "4px")};
		border: 1px solid ${(props): string => props.theme.tiertiary};
		padding: ${(props): string => (props.padding ? props.padding : "4px")};
	`,
	Label: styled.p`
		font-size: 18px;
		font-weight: 500;
		color: ${(props): string => props.theme.tiertiary};
	`,
};
const MiniButton: FC<MiniButtonProps> = ({ label, ...props }) => {
	console.log();

	return (
		<ButtonStyles.ButtonContainer {...props}>
			<Mixins.Flex center>
				<ButtonStyles.Label>{label}</ButtonStyles.Label>
			</Mixins.Flex>
		</ButtonStyles.ButtonContainer>
	);
};

export default MiniButton;
