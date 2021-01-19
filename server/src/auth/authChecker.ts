import { AuthChecker } from "type-graphql";
import { AuthenticationError } from "apollo-server-express";

import { User } from "../models/user.model";
import { MyContext } from "../interfaces/context.interface";

import { Authentication } from ".";

export const authChecker: AuthChecker<MyContext> = async (
	{ context },
	roles,
) => {
	const authorization = context.req.headers["authorization"];

	const payload = await Authentication.validateRefreshToken(
		authorization,
	).catch(err => {
		throw new AuthenticationError("Not Authenticated");
	});

	context.payload = payload;

	const userId = context.payload.userId;
	const user = await User.findOne(userId);

	if (roles.length === 0) {
		return user !== undefined;
	}

	if (!user) {
		return false;
	}

	if (roles.indexOf(user.role) > -1) {
		return true;
	}

	return false;
};
