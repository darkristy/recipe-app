/* eslint-disable no-shadow */
import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { NextApiRequest, NextApiResponse } from "next";

import withCookies from "../../graphql/helpers/withCookies";
import { authChecker } from "../../graphql/auth/authChecker";
import { UserResolver } from "../../graphql/resolvers/UserResolver";
import { RecipeResolver } from "../../graphql/resolvers/RecipeResolver";
import { Authentication } from "../../graphql/auth";

let apolloServerHandler: (req: any, res: any) => Promise<void>;

const context = (ctx) => ({ res: ctx.res, req: ctx.req });

const getApolloServerHandler = async () => {
	if (!apolloServerHandler) {
		const schema = await buildSchema({
			resolvers: [RecipeResolver, UserResolver],
			authChecker,
		});
		apolloServerHandler = new ApolloServer({
			schema,
			context,
			uploads: false,
			subscriptions: false,
		}).createHandler({ path: "/api/graphql" });
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

export default withCookies(handler);
