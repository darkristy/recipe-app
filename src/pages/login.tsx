import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { NextPage } from "next";
import styled from "@emotion/styled";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";

import { Sublink } from "../shared/UIElements";
import { Mixins } from "../styles/mixins";
import { LoginUser, LoginUserVariables } from "../generated/LoginUser";
import Form, { FormInput, FormSubmitButton } from "../components/Form";
import { LoginMutation } from "../graphql/queries/authQueries";
import { setAccessToken } from "../utils/helpers";
import { withApollo } from "../lib/withApollo";
import { Container } from "../styles/globals";

interface FormInputs {
	username: string;
	password: string;
}

const LoginScreenStyles = {
	TopSection: styled.section`
		background-color: ${(props) => props.theme.secondary};
		h2 {
			span {
				color: ${(props) => props.theme.tiertiary};
			}
		}
	`,
	BottomSection: styled.section``,
};

const LoginScreen: NextPage = () => {
	const [submitLogin] = useMutation<LoginUser, LoginUserVariables>(LoginMutation);

	const router = useRouter();

	const { handleBlur, handleSubmit, handleChange, errors, values, touched } = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (loginInput: FormInputs): Promise<void> => {
			const { username, password } = loginInput;
			const response = await submitLogin({ variables: { username, password } }).catch((err) => {
				console.error(err.graphQLErrors);
			});

			console.log(response);

			if (response && response.data) {
				setAccessToken(response.data.login.accessToken);
				router.push("/whoami");
			}
		},
		validationSchema: yup.object().shape({
			username: yup.string().required(),
			password: yup.string().required(),
		}),
	});

	return (
		<motion.div exit={{ opacity: 0 }}>
			<LoginScreenStyles.TopSection>
				<Container>
					<h2>
						<span>Feeling Hungry?</span> Login.
					</h2>
				</Container>
			</LoginScreenStyles.TopSection>
			<LoginScreenStyles.BottomSection>
				<Container>
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
						<Mixins.Flex flexEnd>
							<Sublink href="/login" linkedText="Forgot Password?" />
						</Mixins.Flex>
						<FormSubmitButton name="Login" />
					</Form>
				</Container>
			</LoginScreenStyles.BottomSection>
		</motion.div>
	);
};

export default withApollo(LoginScreen);
