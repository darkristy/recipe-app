import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as yup from "yup";
import { NextPage } from "next";
import styled from "@emotion/styled";

import { RegisterMutation } from "../graphql/queries/authQueries";
import { RegisterUser, RegisterUserVariables } from "../generated/RegisterUser";
import Form, { FormInput, FormSubmitButton } from "../components/Form";
import { withApollo } from "../lib/withApollo";

interface FormInputs {
	email: string;
	username: string;
	password: string;
}

const RegisterScreenStyles = {
	TopSection: styled.section``,
	BottomSection: styled.section``,
};

const RegisterScreen: NextPage = () => {
	const [submitUser, { data }] = useMutation<RegisterUser, RegisterUserVariables>(RegisterMutation);

	const { handleBlur, handleSubmit, handleChange, errors, values, touched } = useFormik({
		initialValues: {
			email: "",
			username: "",
			password: "",
		},
		onSubmit: (loginInput: FormInputs): void => {
			const { email, username, password } = loginInput;
			submitUser({ variables: { email, username, password } }).catch((err) => {
				console.error(err.graphQLErrors);
			});
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.email()
				.required(),
			username: yup.string().required(),
			password: yup.string().required(),
		}),
	});

	if (data) {
		console.log(data);
	}
	return (
		<motion.div exit={{ opacity: 0 }}>
			<RegisterScreenStyles.TopSection />
			<RegisterScreenStyles.BottomSection>
				<Form handleSubmit={handleSubmit}>
					<FormInput
						type="text"
						name="email"
						onChange={handleChange}
						touched={touched.email}
						value={values.email}
						error={errors.email}
						onBlur={handleBlur}
					/>

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
					<FormSubmitButton name="Signup" />
				</Form>
			</RegisterScreenStyles.BottomSection>
		</motion.div>
	);
};

export default withApollo(RegisterScreen);
