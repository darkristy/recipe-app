import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "../models/user.model";
import { RecipeEntity } from "../models/recipe.model";

import { RecipeResolver } from "./recipe.resolver";
import { RecipeService } from "./recipe.service";

@Module({
	imports: [TypeOrmModule.forFeature([RecipeEntity, User])],
	providers: [RecipeResolver, RecipeService],
})
export class RecipeModule {}
