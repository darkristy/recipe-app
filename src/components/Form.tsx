import styled from "@emotion/styled";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import React, { useState } from "react";
import { FieldArray, FieldProps, getIn } from "formik";

import Button from "./Button";

interface FormInputProps extends FieldProps {
	type: any;
	noMargin?: any;
}

interface FormSelectProps extends FieldProps {
	creatable?: boolean;
	defaultOptions: any;
	setFieldValue: any;
}

const FormStyles = {
	InputContainer: styled.div<{ noMargin?: boolean }>`
		&:first-child {
			margin-bottom: ${(props) => (props.noMargin ? 0 : "38px")};
		}
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

export const FormSelect: React.FC<FormSelectProps> = ({ creatable, defaultOptions, setFieldValue, field }) => {
	const [loading, setLoading] = useState(false);
	const [options, setOptions] = useState([]);

	const optionList = [];

	if (defaultOptions) {
		for (const option of defaultOptions) {
			optionList.push({
				label: option.name,
				value: option.name,
			});
		}
	}

	if (optionList && options.length === 0) {
		options.push(...optionList);
	}

	const createOption = (label: string) => ({
		label,
		value: label,
	});

	const handleCreate = (inputValue: any) => {
		setLoading(true);

		setTimeout(() => {
			const newOption = createOption(inputValue);
			console.log(newOption);
			setOptions([...options, newOption]);
			setLoading(false);
		}, 1000);
	};

	if (creatable) {
		return (
			<CreatableSelect
				type="text"
				value={field.value}
				onChange={(option) => setFieldValue(field.name, option)}
				options={options}
				onBlur={field.onBlur}
				onCreateOption={handleCreate}
				isDisabled={loading}
				isLoading={loading}
			/>
		);
	}

	return (
		<Select
			type="text"
			value={field.value}
			onChange={(option) => setFieldValue(field.name, option)}
			options={optionList}
			onBlur={field.onBlur}
		/>
	);
};

export const FormInput = ({ type, field, form: { errors }, noMargin }: FormInputProps): JSX.Element => {
	const error = getIn(errors, field.name);

	const isError = error ? true : false;
	const hasNoMargin = noMargin ? true : false;

	return (
		<FormStyles.InputContainer noMargin={hasNoMargin}>
			<FormStyles.Input type={type} error={isError} placeholder={field.name} {...field} />
		</FormStyles.InputContainer>
	);
};
const Form = ({ children, handleSubmit }): JSX.Element => (
	<FormStyles.FormBody onSubmit={handleSubmit}>{children}</FormStyles.FormBody>
);

export default Form;
