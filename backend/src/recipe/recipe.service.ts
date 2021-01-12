import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../models/user.model";
import { RecipeEntity } from "../models/recipe.model";

@Injectable()
export class RecipeService {
	constructor(
		@InjectRepository(RecipeEntity)
		private recipeRepository: Repository<RecipeEntity>,
		@InjectRepository(User) private userRepository: Repository<User>,
	) {}

	async showAll(): Promise<RecipeEntity[]> {
		return await this.recipeRepository.find({ relations: ["user"] });
	}

	async getByUser(userId: number, filter: any): Promise<RecipeEntity[]> {
		const recipes =
			filter !== null
				? await this.recipeRepository.find({
						relations: ["user"],
						where: [{ user: { id: userId } }, { category: filter }],
				  })
				: await this.recipeRepository.find({
						relations: ["user"],
						where: { user: { id: userId } },
				  });

		return recipes;
	}

	async getUserRecipCategories(username: string): Promise<string[]> {
		const categories = [];

		const user = await this.userRepository.findOne({
			where: { username: username },
			relations: ["recipes"],
		});

		user.recipes.forEach((recipe) => {
			categories.push(recipe.category);
		});

		return [...new Set(categories)];
	}
}
