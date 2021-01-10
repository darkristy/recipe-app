import { Query, Resolver } from "@nestjs/graphql";

import { Recipe } from "../models/recipe.model";

import { RecipeService } from "./recipe.service";

@Resolver()
export class RecipeResolver {
	constructor(private recipeService: RecipeService) {}

	@Query(() => [Recipe])
	recipes() {
		return this.recipeService.showAll();
	}
}
