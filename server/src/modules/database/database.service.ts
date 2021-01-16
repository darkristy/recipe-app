import "dotenv/config";

import { Injectable } from "@nestjs/common";
import {
	TypeOrmOptionsFactory,
	TypeOrmModuleOptions,
} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
	private username = process.env.POSTGRES_USER;

	private password = process.env.POSTGRES_PASSWORD;

	private databaseName =
		process.env.NODE_ENV === "test"
			? process.env.POSTGRES_DB_TEST
			: process.env.POSTGRES_DB;

	private databaseUrl =
		process.env.NODE_ENV === "production"
			? process.env.DATABASE_URL
			: `postgres://${this.username}:${this.password}@localhost:5432/${this.databaseName}`;

	private logging = process.env.NODE_ENV !== "production";

	private dropSchema = process.env.NODE_ENV === "test";

	createTypeOrmOptions(): TypeOrmModuleOptions {
		return {
			type: "postgres",
			url: this.databaseUrl,
			entities: ["dist/**/*.model.js"],
			synchronize: true,
			logging: this.logging,
			dropSchema: this.dropSchema,
		};
	}
}
