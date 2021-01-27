import { PrismaClient } from "@prisma/client";

import data from "../seedData";

export const categorySeeder = async (prisma: PrismaClient): Promise<void> => {
	const categories = data.categories;

	for (const category of categories) {
		await prisma.category.create({
			data: {
				name: category.name,
			},
		});
	}
};
