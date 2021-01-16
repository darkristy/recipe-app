import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-guard";
import { CurrentUser } from "../../decorators/currentUser.decorator";
import { User } from "../../models/user.model";
import { Recipe } from "../../models/recipe.model";

import { RecipeService } from "./recipe.service";

@Resolver()
export class RecipeResolver {
	constructor(private recipeService: RecipeService) {}

	@Query(() => [Recipe])
	recipes(): Promise<Recipe[]> {
		return this.recipeService.showAll();
	}

	@Query(() => [Recipe])
	@UseGuards(JwtAuthGuard)
	userRecipes(
		@CurrentUser() user: User,
		@Args({ name: "filter", type: () => String, nullable: true })
		filter: string,
	): Promise<Recipe[]> {
		const id = user.id;

		return this.recipeService.getByUser(id, filter);
	}

	@Query(() => [String])
	@UseGuards(JwtAuthGuard)
	userCategories(@CurrentUser() user: User): Promise<string[]> {
		const username = user.username;

		return this.recipeService.getUserRecipCategories(username);
	}
}
