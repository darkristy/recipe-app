/* eslint-disable no-shadow */
import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { NextApiRequest, NextApiResponse } from "next";

import withCookies from "../../graphql/helpers/withCookies";
import { TestResolver } from "../../graphql/resolvers/TestResolver";
import { authChecker } from "../../graphql/auth/authChecker";

let apolloServerHandler: (req: any, res: any) => Promise<void>;

const getApolloServerHandler = async () => {
	if (!apolloServerHandler) {
		const schema = await buildSchema({
			resolvers: [TestResolver],
			authChecker,
		});
		apolloServerHandler = new ApolloServer({ schema, uploads: false, subscriptions: false }).createHandler({
			path: "/api/graphql",
		});
	}
	return apolloServerHandler;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const apolloServerHandler = await getApolloServerHandler();
	return apolloServerHandler(req, res);
};

export const config = {
	api: {
		bodyParser: false,
	},
};

// attach cookie helpers to all response
export default withCookies(handler);
