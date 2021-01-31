import { PrismaClient } from "@prisma/client";

import { measurmentUnitSeeder } from "./seeders/measurmentUnit.seeder";
import { measurmentQtySeeder } from "./seeders/measurmentQty.seeder";
import { recipeIngredientSeeder } from "./seeders/recipe-ingredients.seeder";
import { ingredientSeeder } from "./seeders/ingredient.seeder";
import { cuisineSeeder } from "./seeders/cuisine.seeder";
import { recipeSeeder } from "./seeders/recipe.seeder";
import { instructionSeeder } from "./seeders/instruction.seeder";

const prisma = new PrismaClient();

const seed =
	process.env.NODE_ENV !== "production"
		? [
				cuisineSeeder(prisma),
				ingredientSeeder(prisma),
				measurmentUnitSeeder(prisma),
				// measurmentQtySeeder(prisma),
				// recipeIngredientSeeder(prisma),
				// instructionSeeder(prisma),
				// recipeSeeder(prisma),
		  ]
		: [cuisineSeeder(prisma), ingredientSeeder(prisma)];

const main = async (): Promise<void> => {
	await prisma.$connect().catch((e) => console.error(e));

	await Promise.all([...seed]).catch((e) => console.error(e));
};

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
		console.log("Seeders generated");
	});
