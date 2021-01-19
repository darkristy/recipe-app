import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from "typeorm";

@ObjectType()
export abstract class AbstractEntity extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => GraphQLISODateTime)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => GraphQLISODateTime)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field(() => GraphQLISODateTime)
	@DeleteDateColumn()
	deletedAt: Date;
}
