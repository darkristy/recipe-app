import { useMutation } from "@apollo/client";
import { useFormik, FormikProvider, Field } from "formik";
import { motion } from "framer-motion";
import * as yup from "yup";
import { NextPage } from "next";
import styled from "@emotion/styled";

import { Wrapper } from "../styles/globals";
import { RegisterMutation } from "../graphql/queries/authQueries";
import { RegisterUser, RegisterUserVariables } from "../generated/RegisterUser";
import Form, { FormInput } from "../components/Form";
import { withApollo } from "../lib/withApollo";
import Button from "../components/Button";
import { Mixins } from "../styles/mixins";
import Alert from "../components/Alert";

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

	const formik = useFormik({
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
	const inputTouchedAndError =
		(formik.touched.email && formik.errors.email) ||
		(formik.touched.username && formik.errors.username) ||
		(formik.touched.password && formik.errors.password);

	const errorIndicator = error || inputTouchedAndError;

	if (error) {
		errorMessage = error?.graphQLErrors.map((err) => err.message);
		console.log(errorMessage);
	}

	if (formik.touched.email && formik.errors.email) {
		errorMessage = formik.errors.email;
		console.log(formik.errors.email);
	}

	if (formik.touched.username && formik.errors.username) {
		errorMessage = formik.errors.username;
		console.log(formik.errors.username);
	}

	if (formik.touched.password && formik.errors.password) {
		errorMessage = formik.errors.password;
		console.log(formik.errors.password);
	}

	return (
		<motion.div exit={{ opacity: 0 }}>
			<RegisterScreenStyles.TopSection />
			<RegisterScreenStyles.BottomSection>
				<Wrapper>
					<FormikProvider value={formik}>
						<Form handleSubmit={formik.handleSubmit}>
							<Field name="email" component={FormInput} />
							<Mixins.Spacer height="20px" />
							<Field name="username" component={FormInput} />
							<Mixins.Spacer height="20px" />
							<Field name="password" component={FormInput} />
							<Mixins.Spacer height="42px" />
							<Button type="submit" label="Signup" size="full" primary />
						</Form>
					</FormikProvider>

					<Mixins.Flex center style={{ paddingTop: 26 }}>
						{errorIndicator && <Alert message={errorMessage} severity="error" />}
					</Mixins.Flex>
				</Wrapper>
			</RegisterScreenStyles.BottomSection>
		</motion.div>
	);
};

export default withApollo(RegisterScreen);
