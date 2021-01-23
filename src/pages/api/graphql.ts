/* eslint-disable no-shadow */
import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
import { NextApiRequest, NextApiResponse } from "next";

import withCookies from "../../graphql/helpers/withCookies";
import { authChecker } from "../../graphql/auth/authChecker";
import { UserResolver } from "../../graphql/resolvers/UserResolver";
import { RecipeResolver } from "../../graphql/resolvers/RecipeResolver";

let apolloServerHandler: (req: any, res: any) => Promise<void>;

const context = (ctx): any => ({ res: ctx.res, req: ctx.req });

const getApolloServerHandler = async (): Promise<(req: any, res: any) => Promise<void>> => {
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

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const apolloServerHandler = await getApolloServerHandler();
	return apolloServerHandler(req, res);
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default withCookies(handler);
