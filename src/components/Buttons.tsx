import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Mixins } from "../styles/mixins";

interface GeneralButtonProps {
	label: string;
	outline?: boolean;
}

const GeneralButton = ({ label, outline = false }: GeneralButtonProps): JSX.Element => {
	const hasOutlne = outline ? true : false;
	return (
		<GeneralButtonStyles.ButtonContainer outline={hasOutlne}>
			<Mixins.Flex center>
				<GeneralButtonStyles.Label>{label}</GeneralButtonStyles.Label>
			</Mixins.Flex>
		</GeneralButtonStyles.ButtonContainer>
	);
};

const GeneralButtonStyles = {
	ButtonContainer: styled.div<{ outline?: boolean }>`
		padding: 13px 0px;
		width: 100%;
		border-radius: 8px;
		background: ${(props): string => props.theme.tiertiary};
		${(props): any =>
			props.outline &&
			css`
				background: none;
				border: 2px solid ${props.theme.quaternary};
				p {
					color: ${props.theme.quaternary};
				}
			`}
	`,
	Label: styled.p`
		color: ${(props): string => props.theme.secondary};
		font-size: 18px;
		font-weight: 500;
	`,
};

export { GeneralButton };
