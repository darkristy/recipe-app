import { gql } from "@apollo/client";

const LoginMutation = gql`
	mutation LoginUser($username: String!, $password: String!) {
		login(loginInput: { username: $username, password: $password }) {
			success
			accessToken
		}
	}
`;

const RegiterMutation = gql`
	mutation RegiterUser($email: String!, $username: String!, $password: String!) {
		register(registerInput: { email: $email, username: $username, password: $password })
	}
`;

export { LoginMutation, RegiterMutation };
