import "dotenv/config";

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

const config = {
	type: "postgres",
	url: databaseUrl,
	entities: [__dirname + "/**/*.model.{ts,js}"],
	synchronize: true,
	logging: logging,
	dropSchema: dropSchema,
};

export default config;
