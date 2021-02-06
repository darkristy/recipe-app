import "dotenv/config";
import * as argon2 from "argon2";
import * as cookie from "cookie";
import { sign, verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-micro";
import { NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Authentication = {
	createAccessToken: (user): string =>
		sign({ userId: user.id }, process.env.ACCESS_SECRET, {
			expiresIn: "15m",
		}),
	createRefreshToken: (user): string =>
		sign({ userId: user.id, tokenVersion: user.tokenVersion }, process.env.REFRESH_SECRET, {
			expiresIn: "7d",
		}),
	hashPassword: async (password: string): Promise<string> =>
		await argon2.hash(password, {
			hashLength: 12,
			type: argon2.argon2id,
		}),

	compareWithPassword: async (attempt: string, user): Promise<boolean> => await argon2.verify(user.password, attempt),

	validateToken: async (authorization: string, tokenType: "access" | "refresh"): Promise<any> => {
		if (!authorization) {
			throw new AuthenticationError("Not Authenticated");
		}
		let payload = null;
		const token = authorization.replace("Bearer ", "");

		if (tokenType === "access") {
			payload = verify(token, process.env.ACCESS_SECRET);
		}

		if (tokenType === "refresh") {
			payload = verify(token, process.env.REFRESH_SECRET);
		}

		return payload;
	},

	sendRefreshToken: (token: string, res: NextApiResponse): void => {
		res.setHeader(
			"Set-Cookie",
			cookie.serialize("jid", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				sameSite: "strict",
				path: "/",
			})
		);
		res.statusCode = 200;
	},

	revokeRefreshTokens: async (userId: string): Promise<void> => {
		await prisma.$executeRaw(`update "User" set tokenVersion = tokenVersion + 1 where id = ${userId}`);
	},
};
