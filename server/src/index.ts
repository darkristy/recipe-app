import "reflect-metadata";
import "dotenv/config";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

import { authChecker } from "./auth/authChecker";
import { UserResolver } from "./resolvers/UserResolver";
import { Authentication } from "./auth";
import { User } from "./models/user.model";

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

	app.use(
		cors({
			origin: "http://localhost:3000",
			credentials: true,
		}),
	);

	app.use(cookieParser());
	app.post("/refresh_token", async (req, res) => {
		const token = req.cookies.jid;

		if (!token) {
			return res.send({ ok: false, accessToken: "" });
		}

		const payload = await Authentication.validateToken(
			token,
			"refresh",
		).catch(err => res.send({ ok: false, accessToken: "" }));

		const user = await User.findOne(payload.userId);

		if (!user || user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: "" });
		}

		Authentication.sendRefreshToken(
			Authentication.createRefreshToken(user),
			res,
		);

		return res.send({
			ok: false,
			accessToken: Authentication.createAccessToken(user),
		});
	});

	createConnection({
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
		context: ({ req, res }): any => ({ req, res }),
	});

	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () =>
		console.log(
			`🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
		),
	);
};

bootstrap();
