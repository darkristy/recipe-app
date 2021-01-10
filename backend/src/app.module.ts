import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseService } from "./database/database.service";
import { UserModule } from "./user/user.module";
import { RecipeModule } from "./recipe/recipe.module";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: DatabaseService,
		}),

		GraphQLModule.forRoot({
			autoSchemaFile: "src/schema.gql",
		}),
		ConfigModule.forRoot({ isGlobal: true }),
		UserModule,
		RecipeModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
