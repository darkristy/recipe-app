import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { NextPage } from "next";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

import useTogglePasswordVisiblity from "../hooks/useTogglePasswordVisiblity";
import { LoginUser, LoginUserVariables } from "../generated/LoginUser";
import Form, { FormInput } from "../components/Form";
import { LoginMutation } from "../lib/queries/authQueries";

interface FormInputs {
	username: string;
	password: string;
}

const LoginScreenStyles = {
	TopSection: styled.section``,
	BottomSection: styled.section``,
};

const LoginScreen: NextPage = () => {
	const [submitLogin, { data }] = useMutation<LoginUser, LoginUserVariables>(LoginMutation);

	const { register, handleSubmit, errors } = useForm<FormInputs>();
	const { passwordShown, togglePasswordVisiblity } = useTogglePasswordVisiblity();

	const onSubmit = (loginInput: FormInputs): void => {
		const { username, password } = loginInput;
		submitLogin({ variables: { username, password } });
	};

	if (data) {
		console.log(data);
	}
	return (
		<motion.div exit={{ opacity: 0 }}>
			<LoginScreenStyles.TopSection />
			<LoginScreenStyles.BottomSection>
				<Form handleSubmit={handleSubmit(onSubmit)}>
					<FormInput type="text" label="username" forwardedRef={register} />
					<FormInput type={passwordShown ? "text" : "password"} label="password" forwardedRef={register} />
					<input type="submit" />
				</Form>
			</LoginScreenStyles.BottomSection>
		</motion.div>
	);
};

export default LoginScreen;
