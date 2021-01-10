import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from "../models/recipe.model";
import { User } from "../models/user.model";
import { AuthModule } from "../auth/auth.module";

import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, Recipe]), AuthModule],
	providers: [UserResolver, UserService, RecipeService],
})
export class UserModule {}
