import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PrismaClient, recipe, user } from "@prisma/client";

import { AuthLogin, AuthRegister, User, UserLoginInput, UserRegisterInput, UserRole } from "../models";
import { Authentication } from "../auth";

const prisma = new PrismaClient();

@Resolver(User)
export class UserResolver {
	@Query(() => [User])
	@Authorized(UserRole.ADMIN)
	async users(): Promise<
		(user & {
			recipes: recipe[];
		})[]
	> {
		const users = await prisma.user.findMany({ include: { recipes: true } });
		return users;
	}

	@Query(() => User)
	@Authorized(UserRole.USER, UserRole.ADMIN)
	async whoami(
		@Ctx() ctx
	): Promise<
		user & {
			recipes: recipe[];
		}
	> {
		const payload = ctx.payload;
		const currentUser = await prisma.user.findUnique({ where: { id: payload.userId }, include: { recipes: true } });

		return currentUser;
	}

	@Mutation(() => AuthRegister)
	async register(@Arg("registerInput") registerInput: UserRegisterInput): Promise<AuthRegister> {
		const { username, password } = registerInput;

		const hashedPassword = await Authentication.hashPassword(password);

		const possibleUser = await prisma.user.findUnique({ where: { username: username } });

		if (possibleUser) {
			throw new Error("User already exists");
		}

		await prisma.user.create({
			data: {
				...registerInput,
				password: hashedPassword,
			},
		});

		return { success: "success" };
	}

	@Mutation(() => AuthLogin)
	async login(@Arg("loginInput") loginInput: UserLoginInput, @Ctx() ctx): Promise<AuthLogin> {
		const { username, password } = loginInput;

		const registeredUser = await prisma.user.findUnique({ where: { username: username } });

		if (!registeredUser || !(await Authentication.compareWithPassword(password, registeredUser))) {
			throw new Error("Invalid username/password");
		}

		Authentication.sendRefreshToken(Authentication.createRefreshToken(registeredUser), ctx.res);

		return {
			success: "success",
			accessToken: Authentication.createAccessToken(registeredUser),
		};
	}
}
