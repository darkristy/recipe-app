import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { RecipeService } from "../recipe/recipe.service";
import { CreateUserDTO, User, UserResponse } from "../models/user.model";

import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
	constructor(
		private userService: UserService,
		private recipeService: RecipeService,
	) {}

	@Query(() => [User])
	users(): Promise<UserResponse[]> {
		return this.userService.showAll();
	}

	@Mutation((returns) => User)
	async login(
		@Args({ name: "email", type: () => String }) username: string,
		@Args({ name: "password", type: () => String }) password: string,
	) {
		const data: CreateUserDTO = { username, password };
		return this.userService.loginUser(data);
	}
}
