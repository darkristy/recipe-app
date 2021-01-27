import { PrismaClient } from "@prisma/client";

import { categorySeeder } from "./seeders/category.seeder";
import { recipeSeeder } from "./seeders/recipe.seeder";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
	await prisma.$connect().catch((e) => console.error(e));

	await Promise.all([categorySeeder(prisma), recipeSeeder(prisma)]).catch((e) => console.error(e));
};

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Seeders generated");
	});
