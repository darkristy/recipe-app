import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Recipe } from "../models/recipe.model";

@Injectable()
export class RecipeService {
	constructor(
		@InjectRepository(Recipe) private userRepository: Repository<Recipe>,
	) {}

	async showAll() {
		return await this.userRepository.find();
	}
}
