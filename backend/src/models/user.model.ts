import "dotenv/config";
import { IsString } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";

import { AbstractModel } from "./abstract-model";
import { Recipe, RecipeResponse } from "./recipe.model";

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

@ObjectType()
@Entity("user")
export class User extends AbstractModel {
	@Field()
	@Column({ unique: true, length: 254 })
	email: string;

	@Field()
	@Column({ unique: true, length: 254 })
	username: string;

	@Column({ length: 127 })
	password: string;

	@Field()
	@Column({
		type: "enum",
		enum: UserRole,
		nullable: true,
		default: UserRole.USER,
	})
	role?: UserRole;

	@Field((type) => [Recipe])
	@OneToMany(() => Recipe, (recipe: Recipe) => recipe.user)
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
	token: string;

	@Field()
	username: string;
}

export class CreateUserDTO {
	@IsString()
	username: string;

	@IsString()
	password: string;
}

export interface UserResponse {
	id: number;
	email: string;
	username: string;
	token?: string;
	role?: string;
	createdAt: Date;
	recipes: RecipeResponse[];
}
