import { GraphQLClient } from "graphql-request";

const API_URL = "http://localhost:4000/graphql";

const fetcher = (query, variables, token): Promise<any> => {
	const qraphQLClient = new GraphQLClient(API_URL, {
		headers: { authorization: token ? `Bearer ${token}` : "" },
	});

	return qraphQLClient.request(query, variables);
};

export default fetcher;
