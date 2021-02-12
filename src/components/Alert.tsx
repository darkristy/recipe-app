import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Mixins } from "../styles/mixins";

export interface AlertProps {
	message: string;
	severity: "warning" | "success" | "error";
}

const AlertStyles = {
	Container: styled.div<{ warning?: boolean; error?: boolean; success?: boolean }>`
		border-radius: 8px;
		width: fit-content;
		padding: 13px 38px;
		${(props): any =>
			props.warning &&
			css`
				border: 1px solid #d6b851;
				background-color: rgba(214, 184, 81, 0.19);
				p {
					margin-block-start: 0;
					margin-block-end: 0;
					font: 14px Arial;
					font-weight: 500;
					color: #d6b851;
				}
			`};
		${(props): any =>
			props.error &&
			css`
				border: 1px solid #ce4b2e;
				background-color: rgba(206, 75, 46, 0.19);
				p {
					margin-block-start: 0;
					margin-block-end: 0;
					font: 14px Arial;
					font-weight: 500;
					color: #ce4b2e;
				}
			`};
		${(props): any =>
			props.success &&
			css`
				border: 1px solid #c1ce2e;
				background-color: rgba(193, 206, 46, 0.19);
				p {
					margin-block-start: 0;
					margin-block-end: 0;
					font: 14px Arial;
					font-weight: 500;
					color: #c1ce2e;
				}
			`};
	`,
};
const Alert: React.FC<AlertProps> = ({ message, severity, ...props }) => {
	const isWarning = severity === "warning" ? true : false;
	const isError = severity === "error" ? true : false;
	const isSuccess = severity === "success" ? true : false;
	return (
		<AlertStyles.Container warning={isWarning} error={isError} success={isSuccess}>
			<Mixins.Flex center>
				<p>{message}</p>
			</Mixins.Flex>
		</AlertStyles.Container>
	);
};

export default Alert;
