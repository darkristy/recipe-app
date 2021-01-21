/* eslint-disable import/no-cycle */
import { Field, ObjectType } from "type-graphql";

import { AbstractModel } from "./abstract-model";
import { User, UserResponse } from "./user.model";

@ObjectType()
export class Recipe extends AbstractModel {
	@Field(() => String)
	name: string;

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

export interface RecipeResponse {
	name: string;
	imageUrl: string;
	ingredients: string;
	category: string;
	instructions: string;
	user: UserResponse;
}
