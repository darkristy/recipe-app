import { PrismaClient } from "@prisma/client";

import data from "../seed-data";

export const recipeIngredientSeeder = async (prisma: PrismaClient): Promise<void> => {
	const recipeIngredients = data.recipeIngredients;

	for (const recipeIngredient of recipeIngredients) {
		await prisma.recipeIngredient.create({
			data: {
				...recipeIngredient,
			},
		});
	}
};
