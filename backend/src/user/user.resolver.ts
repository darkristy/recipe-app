import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { RecipeService } from "../recipe/recipe.service";
import {
	UserDTO,
	User,
	UserResponse,
	Auth,
	UserRole,
} from "../models/user.model";
import { JwtAuthGuard } from "../auth/guards/jwt-guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/currentUser";
import { UserIsUserGuard } from "../auth/guards/userIsUser.guard";

import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
	constructor(
		private userService: UserService,
		private recipeService: RecipeService,
	) {}

	@Query(() => [User])
	@Roles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	users(): Promise<UserResponse[]> {
		return this.userService.showAll();
	}

	@Query(() => User)
	@UseGuards(JwtAuthGuard)
	whoami(@CurrentUser() user: User): Promise<UserResponse> {
		const { username } = user;
		return this.userService.findUser(username);
	}

	@Query(() => User)
	@UseGuards(JwtAuthGuard)
	user(
		@Args({ name: "username", type: () => String }) username: string,
	): Promise<UserResponse> {
		return this.userService.findUser(username);
	}

	@Mutation(() => Auth)
	login(
		@Args({ name: "username", type: () => String }) username: string,
		@Args({ name: "password", type: () => String }) password: string,
	): Promise<{ username: string; token: string }> {
		const data: UserDTO = { username, password };
		return this.userService.loginUser(data);
	}

	@Mutation(() => User)
	register(
		@Args({ name: "email", type: () => String }) email: string,
		@Args({ name: "username", type: () => String }) username: string,
		@Args({ name: "password", type: () => String }) password: string,
	): Promise<UserResponse> {
		const data: UserDTO = { email, username, password };
		return this.userService.registerUser(data);
	}
}
