import { Query, Resolver } from "type-graphql";
import { PrismaClient } from "@prisma/client";

import { Recipe } from "../models";

const prisma = new PrismaClient();

@Resolver(Recipe)
export class RecipeResolver {
	@Query((returns) => [Recipe])
	async recipe() {
		const recipe = await prisma.recipe.findMany();
		return recipe;
	}
}
