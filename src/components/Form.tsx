import styled from "@emotion/styled";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";

interface FormInputProps {
	type: string;
	name: string;
	value: any;
	error: any;
	touched: any;
	onChange: any;
	onBlur: any;
}

interface FormSelectProps {
	creatable?: boolean;
	id: string;
	defaultOptions: any;
	value: any;
	setFieldValue: any;
	handleBlur: any;
}

const FormStyles = {
	InputContainer: styled.div`
		&:first-child {
			margin-bottom: 38px;
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

export const FormSelect: React.FC<FormSelectProps> = ({
	id,
	creatable,
	defaultOptions,
	handleBlur,
	value,
	setFieldValue,
}) => {
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
				value={value}
				onChange={(option) => setFieldValue(id, option)}
				options={options}
				onBlur={handleBlur}
				onCreateOption={handleCreate}
				isDisabled={loading}
				isLoading={loading}
			/>
		);
	}

	return (
		<Select
			type="text"
			value={value}
			onChange={(option) => setFieldValue(id, option)}
			options={optionList}
			onBlur={handleBlur}
		/>
	);
};

export const FormInput = ({ type, error, ...args }: FormInputProps): JSX.Element => {
	const isError = error ? true : false;
	const { touched, name } = args;

	return (
		<FormStyles.InputContainer>
			<FormStyles.Input type={type} error={isError} placeholder={name} {...args} />
		</FormStyles.InputContainer>
	);
};
const Form = ({ children, handleSubmit }): JSX.Element => (
	<FormStyles.FormBody onSubmit={handleSubmit}>{children}</FormStyles.FormBody>
);

export default Form;
