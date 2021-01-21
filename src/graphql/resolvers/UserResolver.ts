import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { PrismaClient } from "@prisma/client";

import { Auth, User, UserLoginInput, UserRegisterInput, UserRole } from "../models";
import { Authentication } from "../auth";
import { MyContext } from "../interfaces/context.interface";

const prisma = new PrismaClient();

@Resolver(User)
export class UserResolver {
	@Query((returns) => [User])
	@Authorized(UserRole.ADMIN)
	async users(@Ctx() { res }: MyContext) {
		const users = await prisma.user.findMany();

		return users;
	}

	@Mutation(() => String)
	async register(@Arg("registerInput") registerInput: UserRegisterInput): Promise<{ success: string }> {
		const { username, password } = registerInput;

		const hashedPassword = await Authentication.hashPassword(password);

		const user = await prisma.user.findUnique({ where: { username: username } });

		if (user) {
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

	@Mutation(() => Auth)
	async login(@Arg("loginInput") loginInput: UserLoginInput, @Ctx() { res }: MyContext): Promise<Auth> {
		const { username, password } = loginInput;

		const user = await prisma.user.findUnique({ where: { username: username } });

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
}
