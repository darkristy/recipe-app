import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { RecipeService } from "../recipe/recipe.service";
import {
	User,
	UserResponse,
	Auth,
	UserRole,
	UserRegisterInput,
	UserLoginInput,
} from "../../models/user.model";
import { JwtAuthGuard } from "../auth/guards/jwt-guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../../decorators/roles.decorator";
import { CurrentUser } from "../../decorators/currentUser.decorator";

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

	@Mutation(() => User)
	register(
		@Args("registerInput") registerInput: UserRegisterInput,
	): Promise<UserResponse> {
		return this.userService.registerUser(registerInput);
	}

	@Mutation(() => Auth)
	async login(@Args("loginInput") loginInput: UserLoginInput): Promise<Auth> {
		return this.userService.loginUser(loginInput);
	}
}
