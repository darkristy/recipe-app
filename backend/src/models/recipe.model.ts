import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, Column, ManyToOne } from "typeorm";

import { AbstractModel } from "./abstract-model";
import { User, UserResponse } from "./user.model";

@ObjectType()
@Entity("recipe")
export class Recipe extends AbstractModel {
	@Field((type) => String)
	@Column({ unique: true, length: 354 })
	name: string;

	@Field((type) => String)
	@Column({ unique: true, length: 354 })
	imageUrl: string;

	@Field((type) => String)
	@Column({ length: 4000 })
	ingredients: string;

	@Field((type) => String)
	@Column({ length: 5000 })
	instructions: string;

	@Field((type) => User)
	@ManyToOne(() => User, (user: User) => user.id)
	user: User;
}

export interface RecipeResponse {
	name: string;
	imageUrl: string;
	ingredients: string;
	instructions: string;
	user: UserResponse;
}
