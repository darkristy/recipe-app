import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { NextPage } from "next";
import styled from "@emotion/styled";
import * as yup from "yup";
import { Field, useFormik, FormikProvider } from "formik";
import { useRouter } from "next/router";

import { Sublink } from "../shared/UIElements";
import { Mixins } from "../styles/mixins";
import { LoginUser, LoginUserVariables } from "../generated/LoginUser";
import Form, { FormInput } from "../components/Form";
import { LoginMutation } from "../graphql/queries/authQueries";
import { setAccessToken } from "../utils/helpers";
import { withApollo } from "../lib/withApollo";
import { Wrapper } from "../styles/globals";
import Button from "../components/Button";
import Alert from "../components/Alert";

interface FormInputs {
	username: string;
	password: string;
}

const LoginScreenStyles = {
	Container: styled(motion.div)`
		display: flex;
		flex-direction: column;
		height: 100%;
	`,
	TopSection: styled.section`
		background-color: ${(props): string => props.theme.secondary};
		h2 {
			span {
				color: ${(props): string => props.theme.tiertiary};
			}
		}
	`,
	BottomSection: styled.section`
		padding-top: 14px;
		flex: 1;
	`,
};

const LoginScreen: NextPage = () => {
	const [submitLogin, { error }] = useMutation<LoginUser, LoginUserVariables>(LoginMutation);

	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (loginInput: FormInputs): Promise<void> => {
			const { username, password } = loginInput;
			const response = await submitLogin({ variables: { username, password } }).catch((err) => null);

			if (response && response.data) {
				setAccessToken(response.data.login.accessToken);
				router.push("/home");
			}
		},
		validationSchema: yup.object().shape({
			username: yup.string(),
			password: yup.string(),
		}),
	});

	let errorMessage;

	if (error) {
		errorMessage = error?.graphQLErrors.map((err) => err.message);
	}

	return (
		<LoginScreenStyles.Container exit={{ opacity: 0 }}>
			<LoginScreenStyles.TopSection>
				<Wrapper>
					<h2>
						<span>Feeling Hungry?</span> Login.
					</h2>
				</Wrapper>
			</LoginScreenStyles.TopSection>
			<LoginScreenStyles.BottomSection>
				<Wrapper>
					<FormikProvider value={formik}>
						<Form handleSubmit={formik.handleSubmit}>
							<Field name="username" component={FormInput} />
							<Mixins.Spacer height="20px" />
							<Field type="password" name="password" component={FormInput} />
							<Mixins.Flex flexEnd style={{ paddingTop: 10, paddingBottom: 24 }}>
								<Sublink href="/login" linkedText="Forgot Password?" />
							</Mixins.Flex>
							<Button type="submit" label="Login" size="full" primary />

							<Mixins.Flex center style={{ paddingTop: 26 }}>
								<Sublink href="/register" unlinkedText="Don't have an account? " linkedText="Signup." />
							</Mixins.Flex>
						</Form>
					</FormikProvider>
					<Mixins.Flex center style={{ paddingTop: 26 }}>
						{error && <Alert message={errorMessage} severity="error" />}
					</Mixins.Flex>
				</Wrapper>
			</LoginScreenStyles.BottomSection>
		</LoginScreenStyles.Container>
	);
};

export default withApollo(LoginScreen);
