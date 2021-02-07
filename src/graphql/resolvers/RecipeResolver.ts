/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-shadow */

import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { cuisine, ingredient, measurmentUnit, PrismaClient, recipe } from "@prisma/client";

import { Cuisine, Ingredient, MeasurmentUnit, Recipe, UserRole } from "../models";

const prisma = new PrismaClient();

@Resolver(Recipe)
export class RecipeResolver {
	@Query(() => [Recipe])
	@Authorized(UserRole.ADMIN)
	async recipes(): Promise<recipe[]> {
		const recipes = await prisma.recipe.findMany();
		return recipes;
	}

	@Query(() => [Cuisine])
	@Authorized()
	async cuisines(): Promise<cuisine[]> {
		const cuisines = await prisma.cuisine.findMany();
		return cuisines;
	}

	@Query(() => [MeasurmentUnit])
	@Authorized()
	async measurmentUnits(): Promise<measurmentUnit[]> {
		const measurmentUnits = await prisma.measurmentUnit.findMany();
		return measurmentUnits;
	}

	@Query(() => [Ingredient])
	@Authorized()
	async ingredients(): Promise<ingredient[]> {
		const ingredients = await prisma.ingredient.findMany();
		return ingredients;
	}

	@Query(() => [Recipe])
	@Authorized()
	async userRecipes(@Ctx() ctx): Promise<recipe[]> {
		const user = ctx.payload;
		const currentUser = await prisma.user.findUnique({
			where: { id: user.userId },
			// @ts-ignore
			include: { recipes: { include: { cuisine } } },
		});

		return currentUser.recipes;
	}

	@Query(() => [Cuisine])
	@Authorized()
	async userRecipeCuisines(@Ctx() ctx): Promise<cuisine[]> {
		const cuisines = [];
		const user = ctx.payload;
		const currentUser = await prisma.user.findUnique({ where: { id: user.userId }, include: { recipes: true } });

		const recipes = currentUser.recipes;

		for (const recipe of recipes) {
			const cuisine = await prisma.cuisine.findUnique({
				where: {
					id: recipe.cuisineId,
				},
			});
			cuisines.push(cuisine);
		}

		return [...new Set(cuisines)];
	}

	@Query(() => Recipe)
	@Authorized()
	async getRecipeById(@Arg("recipeId") recipeId: number): Promise<recipe> {
		const possibleRecipe = await prisma.recipe.findUnique({ where: { id: recipeId }, include: { cuisine: true } });

		return possibleRecipe;
	}
}
