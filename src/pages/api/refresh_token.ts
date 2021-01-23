import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { Authentication } from "../../graphql/auth";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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

	res.statusCode = 200;
	res.send({
		ok: true,
		accessToken: Authentication.createAccessToken(user),
	});
};
