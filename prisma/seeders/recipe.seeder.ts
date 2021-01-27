import { PrismaClient } from "@prisma/client";

import data from "../seedData";

export const recipeSeeder = async (prisma: PrismaClient): Promise<void> => {
	const recipes = data.recipes;

	for (const recipe of recipes) {
		await prisma.recipe.create({
			data: {
				...recipe,
			},
		});
	}
};
