/* eslint-disable no-shadow */
import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { category, PrismaClient, recipe } from "@prisma/client";

import { Category, Recipe, UserRole } from "../models";

const prisma = new PrismaClient();

@Resolver(Recipe)
export class RecipeResolver {
	@Query(() => [Recipe])
	@Authorized(UserRole.ADMIN)
	async recipes(): Promise<recipe[]> {
		const recipes = await prisma.recipe.findMany();
		return recipes;
	}

	@Query(() => [Recipe])
	@Authorized()
	async userRecipes(@Ctx() ctx): Promise<recipe[]> {
		const user = ctx.payload;
		const currentUser = await prisma.user.findUnique({ where: { id: user.userId }, include: { recipes: true } });

		return currentUser.recipes;
	}

	@Query(() => [Category])
	@Authorized()
	async userRecipeCategories(@Ctx() ctx): Promise<category[]> {
		const categories = [];
		const user = ctx.payload;
		const currentUser = await prisma.user.findUnique({ where: { id: user.userId }, include: { recipes: true } });

		const recipes = currentUser.recipes;

		for (const recipe of recipes) {
			const category = await prisma.category.findUnique({
				where: {
					id: recipe.categoryId,
				},
			});
			categories.push(category);
		}

		return [...new Set(categories)];
	}
}
