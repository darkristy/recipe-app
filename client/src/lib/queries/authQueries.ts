import { gql } from "@apollo/client";

const LoginMutation = gql`
	mutation($username: String!, $password: String!) {
		login(loginInput: { username: $username, password: $password }) {
			token
		}
	}
`;

const RegiterMutation = gql`
	mutation($email: String!, $username: String!, $password: String!) {
		register(registerInput: { email: $email, username: $username, password: $password })
	}
`;

export { LoginMutation, RegiterMutation };
