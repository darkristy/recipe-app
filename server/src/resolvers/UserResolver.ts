import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { MyContext } from "../interfaces/context.interface";
import { Authentication } from "../auth";
import {
	Auth,
	User,
	UserLoginInput,
	UserRegisterInput,
	UserResponse,
	UserRole,
} from "../models/user.model";

@Resolver()
export class UserResolver {
	@Query(() => [User])
	@Authorized(UserRole.ADMIN)
	async users(): Promise<User[]> {
		return await User.find();
	}

	@Query(() => User)
	@Authorized()
	async whoami(@Ctx() ctx): Promise<UserResponse> {
		const user = ctx.payload;
		return User.findOne(user.userId);
	}

	@Mutation(() => Auth)
	async login(
		@Arg("loginInput") loginInput: UserLoginInput,
		@Ctx() { res }: MyContext,
	): Promise<Auth> {
		const { username, password } = loginInput;

		const user = await User.findOne({ where: { username } });

		if (!user || !(await Authentication.compareWithPassword(password, user))) {
			throw new Error("Invalid username/password");
		}

		const refreshToken = await Authentication.createRefreshToken(user);

		Authentication.sendRefreshToken(refreshToken, res);

		return {
			success: "success",
			accessToken: Authentication.createAccessToken(user),
		};
	}

	@Mutation(() => String)
	async register(
		@Arg("registerInput") registerInput: UserRegisterInput,
	): Promise<{ success: string }> {
		const { username, password } = registerInput;

		const hashedPassword = await Authentication.hashPassword(password);

		const user = await User.findOne({ where: { username } });

		if (user) {
			throw new Error("User already exists");
		}

		await User.insert({
			...registerInput,
			password: hashedPassword,
		});

		return { success: "success" };
	}
}
