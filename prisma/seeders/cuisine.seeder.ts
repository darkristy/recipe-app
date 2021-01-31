import { PrismaClient } from "@prisma/client";

import data from "../seed-data";

export const cuisineSeeder = async (prisma: PrismaClient): Promise<void> => {
	const cuisines = data.cuisines;

	for (const cuisine of cuisines) {
		await prisma.cuisine.create({
			data: {
				name: cuisine.name,
			},
		});
	}
};
