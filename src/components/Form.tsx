import styled from "@emotion/styled";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { FC } from "react";
import { FieldProps, getIn } from "formik";

import { useSelectStyles } from "../hooks/useSelectStyles";
import { useHandleOptions } from "../hooks/useHandleOptions";

interface FormInputProps extends FieldProps {
	type: any;
	placeholder: string;
	size?: string;
}

interface FormSelectProps extends FieldProps {
	defaultOptions: any[];
	defaultValue?: any;
	size?: string;
}

const FormStyles = {
	InputContainer: styled.div<{ size: string }>`
		width: ${(props): string => (props.size ? props.size : "100%")};
	`,
	Input: styled.input<{ error: boolean }>`
		width: 100%;
		background: ${(props): string => props.theme.quinary};
		border-radius: 4px;
		padding: 7px 8px;
		font-family: ${(props): string => props.theme.fonts.body};
		::placeholder {
			color: ${(props): string => props.theme.tiertiary};
			text-transform: capitalize;
			font-weight: 500;
			opacity: 0.63;
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
		border-radius: 4px;
		background: ${(props): string => props.theme.tiertiary};
		color: white;
		font-family: ${(props): string => props.theme.fonts.body};
		font-weight: 500;
	`,
};

export const FormSelect: FC<FormSelectProps> = ({ ...props }) => {
	const { field, form, defaultOptions, size, defaultValue } = props;
	const { options } = useHandleOptions(defaultOptions);
	const { customSelectStyles } = useSelectStyles();

	return (
		<Select
			type="text"
			{...field}
			defaultValue={defaultValue}
			value={options ? options.find((option) => option.value === field.value) : ""}
			onChange={(option): void => form.setFieldValue(field.name, option.value)}
			options={options}
			styles={customSelectStyles}
			width={size}
			height="20px"
		/>
	);
};

export const FormCreatableSelect: FC<FormSelectProps> = ({ ...props }) => {
	const { field, form, defaultOptions, size, defaultValue } = props;
	const { options, loading, handleCreate } = useHandleOptions(defaultOptions);
	const { customSelectStyles } = useSelectStyles();
	return (
		<CreatableSelect
			type="text"
			{...field}
			defaultValue={defaultValue}
			value={options ? options.find((option) => option.value === field.value) : ""}
			onChange={(option): void => form.setFieldValue(field.name, option.value)}
			options={options}
			onCreateOption={handleCreate}
			isDisabled={loading}
			isLoading={loading}
			styles={customSelectStyles}
			width={size}
		/>
	);
};

export const FormInput = ({ ...props }: FormInputProps): JSX.Element => {
	const {
		type,
		field,
		form: { errors },
		placeholder,
		size,
	} = props;

	const error = getIn(errors, field.name);
	const isError = error ? true : false;

	return (
		<FormStyles.InputContainer size={size}>
			<FormStyles.Input type={type} error={isError} placeholder={placeholder} {...field} />
		</FormStyles.InputContainer>
	);
};
const Form = ({ children, handleSubmit }): JSX.Element => (
	<FormStyles.FormBody onSubmit={handleSubmit}>{children}</FormStyles.FormBody>
);

export default Form;
