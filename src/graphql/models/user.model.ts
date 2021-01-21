/* eslint-disable import/no-cycle */
import "dotenv/config";
import { IsString } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

import { Recipe, RecipeResponse } from "./recipe.model";
import { AbstractModel } from "./abstract-model";

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

@ObjectType()
export class User extends AbstractModel {
	@Field()
	email: string;

	@Field()
	username: string;

	password: string;

	tokenVersion: number;

	@Field()
	role: UserRole;

	@Field(() => [Recipe])
	recipes: [Recipe];
}

@ObjectType()
export class Auth {
	@Field()
	accessToken: string;

	@Field()
	success: string;
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
