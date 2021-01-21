import { Query, Resolver } from "type-graphql";
import { PrismaClient } from "@prisma/client";

import { User } from "../models/user.model";

const prisma = new PrismaClient();

@Resolver(User)
export class UserResolver {
	@Query(() => User)
	users() {
		return prisma.user.findMany();
	}
}
