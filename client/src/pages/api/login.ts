import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default (req: NextApiRequest, res: NextApiResponse): void => {
	res.setHeader(
		"Set-Cookie",
		cookie.serialize("jid", req.body.jid, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			maxAge: 60 * 60,
			sameSite: "strict",
			path: "/",
		})
	);
	res.statusCode = 200;
	res.json({ success: true });
};
