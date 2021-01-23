import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { NextPage } from "next";
import styled from "@emotion/styled";
import * as yup from "yup";
import { useFormik } from "formik";

import { LoginUser, LoginUserVariables } from "../generated/LoginUser";
import Form, { FormInput, FormSubmitButton } from "../components/Form";
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

	const { handleBlur, handleSubmit, handleChange, errors, values, touched } = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: (loginInput: FormInputs): void => {
			const { username, password } = loginInput;
			submitLogin({ variables: { username, password } }).catch((err) => {
				console.error(err.graphQLErrors);
			});
		},
		validationSchema: yup.object().shape({
			username: yup.string().required(),
			password: yup.string().required(),
		}),
	});

	if (data) {
		console.log(data);
	}
	return (
		<motion.div exit={{ opacity: 0 }}>
			<LoginScreenStyles.TopSection />
			<LoginScreenStyles.BottomSection>
				<Form handleSubmit={handleSubmit}>
					<FormInput
						type="text"
						name="username"
						onChange={handleChange}
						touched={touched.username}
						value={values.username}
						error={errors.username}
						onBlur={handleBlur}
					/>

					<FormInput
						type="password"
						name="password"
						onChange={handleChange}
						touched={touched.password}
						value={values.password}
						error={errors.password}
						onBlur={handleBlur}
					/>
					<FormSubmitButton name="Login" />
				</Form>
			</LoginScreenStyles.BottomSection>
		</motion.div>
	);
};

export default LoginScreen;
