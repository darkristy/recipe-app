import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface FormInputProps {
	label?: string;
	forwardedRef?: any;
	type: string;
}

const FormStyles = {
	Input: styled.input``,
	FormBody: styled.form``,
};

export const FormInput = ({ type, forwardedRef, label }: FormInputProps): JSX.Element => (
	<FormStyles.Input type={type} ref={forwardedRef} name={label} placeholder={label} />
);

const Form = ({ children, handleSubmit }) => (
	<FormStyles.FormBody onSubmit={handleSubmit}>{children}</FormStyles.FormBody>
);

export default Form;
