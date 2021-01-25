import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface FormInputProps {
	type: string;
	name: string;
	value: any;
	error: any;
	touched: any;
	onChange: any;
	onBlur: any;
}

const FormStyles = {
	InputContainer: styled.div<{ error: boolean }>`
		margin-bottom: ${(props): string | number => (props.error ? 0 : `38px`)};
	`,
	Input: styled.input<{ error: boolean }>`
		width: 100%;
		border: 2px solid ${(props): string => props.theme.quaternary};
		border-radius: 8px;
		padding: 13px 16px;

		font-family: ${(props): string => props.theme.fonts.body};
		::-webkit-input-placeholder {
			color: ${(props): string => props.theme.quaternary};
			text-transform: capitalize;
			font-weight: 500;
		}
		&:focus {
			border: 2px solid ${(props): string => (props.error ? props.theme.tiertiary : `blue`)};
		}
	`,
	FormBody: styled.form``,
	Error: styled.p<{ error: boolean }>`
		height: 38px;
	`,
	Button: styled.button<{ outline?: boolean }>`
		padding: 13px 0px;
		width: 100%;
		border-radius: 8px;
		background: ${(props): string => props.theme.tiertiary};
		color: white;
		font-family: ${(props): string => props.theme.fonts.body};
		font-weight: 500;
	`,
};

export const FormSubmitButton = ({ name }): JSX.Element => (
	<FormStyles.Button type="submit" value={name}>
		{name}
	</FormStyles.Button>
);

export const FormInput = ({ type, error, ...args }: FormInputProps): JSX.Element => {
	const isError = error ? true : false;
	const { touched, name } = args;

	return (
		<FormStyles.InputContainer error={isError}>
			<FormStyles.Input type={type} error={isError} placeholder={name} {...args} />
			{error && touched ? <FormStyles.Error error={isError}>{error}</FormStyles.Error> : null}
		</FormStyles.InputContainer>
	);
};

const Form = ({ children, handleSubmit }): JSX.Element => (
	<FormStyles.FormBody onSubmit={handleSubmit}>{children}</FormStyles.FormBody>
);

export default Form;
