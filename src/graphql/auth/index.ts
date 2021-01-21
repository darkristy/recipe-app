import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import * as argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-micro";
import { Response } from "express";

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

	sendRefreshToken: (token: string, res): void => {
		res.cookie("jid", token, {
			httpOnly: true,
			path: "/",
			sameSite: "strict",
		});
	},

	isAuthenticated: async (req, res) => {
		const token = req?.cookies.jid;
		if (!token) {
			return res.send({ ok: false, accessToken: "" });
		}

		const payload = await Authentication.validateToken(token, "refresh").catch((err) =>
			res.send({ ok: false, accessToken: "" })
		);

		const user = await prisma.user.findUnique({ where: { id: payload.userId } });

		if (!user || user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: false, accessToken: "" });
		}

		Authentication.sendRefreshToken(Authentication.createRefreshToken(user), res);

		return res.send({
			ok: false,
			accessToken: Authentication.createAccessToken(user),
		});
	},
};
