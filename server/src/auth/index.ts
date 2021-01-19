import "dotenv/config";
import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import { Response } from "express";

import { User } from "../models/user.model";

export const Authentication = {
	createAccessToken: (user: User): string =>
		sign({ userId: user.id }, process.env.ACCESS_SECRET, {
			expiresIn: "15m",
		}),
	createRefreshToken: (user: User): string =>
		sign(
			{ userId: user.id, tokenVersion: user.tokenVersion },
			process.env.REFRESH_SECRET,
			{
				expiresIn: "7d",
			},
		),
	hashPassword: async (password: string): Promise<string> =>
		await argon2.hash(password, {
			hashLength: 12,
			type: argon2.argon2id,
		}),

	compareWithPassword: async (attempt: string, user: User): Promise<boolean> =>
		await argon2.verify(user.password, attempt),

	validateRefreshToken: async (authorization: string): Promise<any> => {
		if (!authorization) {
			throw new AuthenticationError("Not Authenticated");
		}

		const refreshToken = authorization.replace("Bearer ", "");
		const payload: any = verify(refreshToken, process.env.REFRESH_SECRET);

		return payload;
	},

	sendRefreshToken: (token: string, res?: Response): void => {
		res.cookie("jid", token, {
			httpOnly: true,
			path: "/refresh_token",
		});
	},
};
