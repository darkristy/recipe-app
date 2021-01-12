import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "../auth/guards/jwt-guard";
import { User } from "../models/user.model";
import { RecipeEntity } from "../models/recipe.model";
import { CurrentUser } from "../auth/decorators/currentUser";

import { RecipeService } from "./recipe.service";

@Resolver()
export class RecipeResolver {
	constructor(private recipeService: RecipeService) {}

	@Query(() => [RecipeEntity])
	recipes(): Promise<RecipeEntity[]> {
		return this.recipeService.showAll();
	}

	@Query(() => [RecipeEntity])
	@UseGuards(JwtAuthGuard)
	userRecipes(
		@CurrentUser() user: User,
		@Args({ name: "filter", type: () => String, nullable: true })
		filter: string,
	): Promise<RecipeEntity[]> {
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
