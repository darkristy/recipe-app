import { GraphQLClient } from "graphql-request";

import { CLIENT_URL } from "../utils/constants";

export const fetcher = async (...args: any[]) => {
	const [query, token, variables = {}] = args;

	const graphQLClient = new GraphQLClient(`${CLIENT_URL}/api/graphql`, {
		headers: {
			authorization: `Bearer ${token}`,
			credentials: "include",
		},
	});

	return await graphQLClient.request(query, variables);
};
