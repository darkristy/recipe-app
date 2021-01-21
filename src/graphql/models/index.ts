import { IsString } from "class-validator";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";

import { AbstractModel } from "./abstract-model";

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

registerEnumType(UserRole, {
	name: "UserRole",
});

@ObjectType()
export class Auth {
	@Field()
	accessToken: string;

	@Field()
	success: string;
}

@ObjectType()
export class User extends AbstractModel {
	@Field()
	email: string;

	@Field()
	username: string;

	password: string;

	tokenVersion: number;

	@Field(() => UserRole, { defaultValue: "user" })
	role: UserRole;

	@Field(() => [Recipe])
	recipes: [Recipe];
}

@ObjectType()
export class Recipe extends AbstractModel {
	@Field(() => String)
	name: string;

	@Field(() => Boolean, { defaultValue: false })
	bookmarked: boolean;

	@Field(() => String)
	imageUrl: string;

	@Field(() => String)
	ingredients: string;

	@Field(() => String)
	instructions: string;

	@Field(() => String)
	category: string;

	@Field(() => User)
	user: User;
}

@InputType()
export class UserRegisterInput {
	@Field()
	@IsString()
	email: string;

	@Field()
	@IsString()
	username: string;

	@Field()
	@IsString()
	password: string;
}

@InputType()
export class UserLoginInput {
	@Field()
	@IsString()
	username: string;

	@Field()
	@IsString()
	password: string;
}

export interface UserResponse {
	id: number;
	email: string;
	username: string;
	role: string;
	createdAt: Date;
	recipes: [RecipeResponse];
}

export interface RecipeResponse {
	name: string;
	imageUrl: string;
	ingredients: string;
	category: string;
	instructions: string;
	user: UserResponse;
}