import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as express from "express";
import cookieParser from "cookie-parser";

import { authChecker } from "./auth/authChecker";
import { UserResolver } from "./resolvers/UserResolver";
import { Authentication } from "./auth";

const dropSchema = process.env.NODE_ENV === "test" ? true : false;
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const databaseName =
	process.env.NODE_ENV === "test"
		? process.env.POSTGRES_DB_TEST
		: process.env.POSTGRES_DB;

const databaseUrl =
	process.env.NODE_ENV === "production"
		? process.env.DATABASE_URL
		: `postgres://${username}:${password}@localhost:5432/${databaseName}`;

const logging = process.env.NODE_ENV === "production" ? false : true;

const bootstrap = async (): Promise<void> => {
	const app = express();

	await createConnection({
		type: "postgres",
		url: databaseUrl,
		entities: [__dirname + "/**/*.model.{ts,js}"],
		synchronize: true,
		logging: logging,
		dropSchema: dropSchema,
	});

	const schema = await buildSchema({
		resolvers: [UserResolver],
		authChecker,
	});

	const server = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res }),
	});

	server.applyMiddleware({ app, path: "/graphql", cors: false });

	app.listen({ port: 4000 }, () =>
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
		),
	);

	// other initialization code, like creating http server
};

bootstrap();
