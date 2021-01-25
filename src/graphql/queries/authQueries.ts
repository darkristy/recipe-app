import { gql } from "@apollo/client";

const LoginMutation = gql`
	mutation LoginUser($username: String!, $password: String!) {
		login(loginInput: { username: $username, password: $password }) {
			success
			accessToken
		}
	}
`;

const RegisterMutation = gql`
	mutation RegisterUser($email: String!, $username: String!, $password: String!) {
		register(registerInput: { email: $email, username: $username, password: $password })
	}
`;

const WhoAmIQuery = gql`
	query WhoAmI {
		whoami {
			id
		}
	}
`;

export { LoginMutation, RegisterMutation, WhoAmIQuery };
