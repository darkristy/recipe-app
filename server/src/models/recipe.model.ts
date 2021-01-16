import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, Column, ManyToOne } from "typeorm";

import { AbstractEntity } from "./abstract-model";
import { User, UserResponse } from "./user.model";

@ObjectType()
@Entity("recipe")
export class Recipe extends AbstractEntity {
	@Field(() => String)
	@Column({ unique: true, length: 354 })
	name: string;

	@Field(() => String)
	@Column({ unique: true, length: 354 })
	imageUrl: string;

	@Field(() => String)
	@Column({ length: 4000 })
	ingredients: string;

	@Field(() => String)
	@Column({ length: 5000 })
	instructions: string;

	@Field(() => String)
	@Column({ type: "text" })
	category: string;

	@Field(() => User)
	@ManyToOne(() => User, (user: User) => user.id)
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
