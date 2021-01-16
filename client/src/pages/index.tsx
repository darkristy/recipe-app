import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { gql, useMutation, useQuery } from "urql";

import { clearToken, getToken, saveToken } from "../lib/helpers";
import { LoginMutation } from "../lib/queries/authQueries";

const Home: FunctionComponent = () => {
	const [loginResult, executeLogin] = useMutation(LoginMutation);

	const RecipeQuery = gql`
		query {
			userRecipes {
				ingredients
			}
		}
	`;

	const [result, reexecuteQuery] = useQuery({
		query: RecipeQuery,
	});

	console.log(result.data?.userRecipes);

	const submit = async () => {
		const variables = { username: "darkristy", password: "799791!" };
		executeLogin(variables);

		const token = loginResult.data?.login.token;

		saveToken(token);

		console.log(getToken());
	};

	return (
		<>
			<Button onClick={submit}>
				<p>login</p>
			</Button>
			<Button onClick={clearToken}>
				<p>logout</p>
			</Button>
		</>
	);
};

export default Home;

const Button = styled.div`
	background: gray;
	width: 100px;
	height: 20px;
`;
