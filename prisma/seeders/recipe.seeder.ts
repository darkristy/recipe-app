/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { PrismaClient } from "@prisma/client";

import data from "../seed-data";

export const recipeSeeder = async (prisma: PrismaClient): Promise<void> => {
	const recipes = data.recipes;

	for (const recipe of recipes) {
		await prisma.recipe.create({
			// @ts-ignore
			data: {
				...recipe,
			},
		});
	}
};
