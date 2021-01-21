import "dotenv/config";
import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-micro";
import { Response } from "express";

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

	sendRefreshToken: (token: string, res?: Response): void => {
		res.cookie("jid", token, {
			httpOnly: true,
			path: "/refresh_token",
		});
	},
};
