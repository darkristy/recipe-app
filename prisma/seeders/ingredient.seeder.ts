import { PrismaClient } from "@prisma/client";

import data from "../seed-data";

export const ingredientSeeder = async (prisma: PrismaClient): Promise<void> => {
	const ingredients = data.ingredients;

	for (const ingredient of ingredients) {
		await prisma.ingredient.create({
			data: {
				...ingredient,
			},
		});
	}
};
