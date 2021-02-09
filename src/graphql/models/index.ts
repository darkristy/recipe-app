import { IsString } from "class-validator";
import { Field, GraphQLISODateTime, InputType, Int, ObjectType, registerEnumType } from "type-graphql";

import { AbstractModel } from "./abstract-model";

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

registerEnumType(UserRole, {
	name: "UserRole",
});

@ObjectType()
export class AuthLogin {
	@Field()
	accessToken: string;

	@Field()
	success: string;
}

@ObjectType()
export class AuthRegister {
	@Field()
	success?: string;
}

@ObjectType()
export class Cuisine extends AbstractModel {
	@Field(() => String)
	name: string;
}

@ObjectType()
export class User {
	@Field()
	id: string;

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

	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Field(() => GraphQLISODateTime)
	updatedAt: Date;

	@Field(() => GraphQLISODateTime)
	deletedAt: Date;
}

@ObjectType()
export class Recipe extends AbstractModel {
	@Field(() => String)
	name: string;

	@Field(() => Boolean, { defaultValue: false })
	bookmarked: boolean;

	@Field(() => GraphQLISODateTime)
	cookTime: Date;

	@Field(() => GraphQLISODateTime)
	prepTime: Date;

	@Field(() => String)
	imageUrl: string;

	@Field(() => [RecipeIngredient])
	ingredients: RecipeIngredient[];

	@Field(() => [Instruction])
	instructions: Instruction[];

	@Field(() => Cuisine)
	cuisine: Cuisine;

	@Field(() => User)
	user: User;
}

@ObjectType()
export class MeasurmentQty extends AbstractModel {
	@Field(() => String)
	amount: string;
}

@ObjectType()
export class MeasurmentUnit extends AbstractModel {
	@Field(() => String)
	name: string;
}

@ObjectType()
export class Ingredient extends AbstractModel {
	@Field(() => String)
	name: string;
}

@ObjectType()
export class Instruction extends AbstractModel {
	@Field(() => String)
	description: string;

	@Field(() => Recipe)
	recipe: Recipe;
}

@ObjectType()
export class RecipeIngredient extends AbstractModel {
	@Field(() => Recipe)
	recipe: Recipe;
	@Field(() => MeasurmentUnit)
	measurmentUnit: MeasurmentUnit;
	@Field(() => MeasurmentQty)
	measurmentQty: MeasurmentQty;

	@Field(() => Ingredient)
	ingredient: Ingredient;
}

@InputType()
export class MeasurmentQtyInput {
	@Field(() => String)
	amount: string;
}
@InputType()
export class MeasurmentUnitInput {
	@Field(() => String)
	name: string;
}

@InputType()
export class IngredientInput {
	@Field(() => String)
	name: string;
}

@InputType()
export class RecipeIngredientInput {
	@Field(() => MeasurmentUnitInput)
	measurmentUnit: MeasurmentUnit;
	@Field(() => MeasurmentQtyInput)
	measurmentQty: MeasurmentQtyInput;

	@Field(() => IngredientInput)
	ingredient: IngredientInput;
}

@InputType()
export class InstructionInput {
	@Field()
	description: string;
}

@InputType()
export class RecipeInput {
	@Field()
	name: string;
	@Field(() => GraphQLISODateTime)
	cookTime: Date;

	@Field(() => GraphQLISODateTime)
	prepTime: Date;

	@Field(() => String)
	imageUrl: string;

	@Field(() => [RecipeIngredientInput])
	ingredients: RecipeIngredientInput[];

	@Field(() => [InstructionInput])
	instructions: InstructionInput[];

	@Field(() => String)
	cuisine: string;
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
