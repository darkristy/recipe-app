import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Recipe } from "../models/recipe.model";

import { RecipeResolver } from "./recipe.resolver";
import { RecipeService } from "./recipe.service";

@Module({
	imports: [TypeOrmModule.forFeature([Recipe])],
	providers: [RecipeResolver, RecipeService],
})
export class RecipeModule {}
