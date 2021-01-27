import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as yup from "yup";
import { NextPage } from "next";
import styled from "@emotion/styled";

import { RegisterMutation } from "../graphql/queries/authQueries";
import { RegisterUser, RegisterUserVariables } from "../generated/RegisterUser";
import Form, { FormInput } from "../components/Form";
import { withApollo } from "../lib/withApollo";
import Button from "../components/Button";

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
	const [submitUser, { data, error }] = useMutation<RegisterUser, RegisterUserVariables>(RegisterMutation);

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

	let errorMessage;
	const inputTouchedAndError = (touched.email && errors.email) || (touched.password && errors.password);
	const errorIndicator = error || inputTouchedAndError;

	if (error) {
		errorMessage = error?.graphQLErrors.map((err) => err.message);
		console.log(errorMessage);
	}

	if (touched.email && errors.email) {
		errorMessage = errors.email;
		console.log(errors.email);
	}

	if (touched.password && errors.password) {
		errorMessage = errors.password;
		console.log(errors.password);
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
					<Button type="submit" label="Signup" size="full" primary />
				</Form>
			</RegisterScreenStyles.BottomSection>
		</motion.div>
	);
};

export default withApollo(RegisterScreen);
