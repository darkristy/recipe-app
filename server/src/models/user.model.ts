import "dotenv/config";
import { IsString } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

import { AbstractEntity } from "./abstract-model";
import { Recipe, RecipeResponse } from "./recipe.model";

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

@ObjectType()
@Entity("user")
export class User extends AbstractEntity {
	@Field()
	@Column({ unique: true, length: 254 })
	email: string;

	@Field()
	@Column({ unique: true, length: 254 })
	username: string;

	@Column({ length: 127 })
	password: string;

	@Column("int", { default: 0 })
	tokenVersion: number;

	@Field()
	@Column({
		type: "enum",
		enum: UserRole,
		nullable: true,
		default: UserRole.USER,
	})
	role: UserRole;

	@Field(() => [Recipe])
	@OneToMany(
		() => Recipe,
		(recipe: Recipe) => recipe.user,
	)
	recipes: Recipe[];

	toResponseObject(): any {
		const { id, createdAt, username, recipes, role, email } = this;
		const responseObject: UserResponse = {
			id,
			createdAt,
			email,
			username,
			recipes,
			role,
		};

		return responseObject;
	}
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
	recipes: RecipeResponse[];
}
