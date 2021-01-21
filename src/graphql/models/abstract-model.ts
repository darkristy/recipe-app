import { Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";

@ObjectType()
export abstract class AbstractModel {
	@Field(() => Int)
	id: number;

	@Field(() => GraphQLISODateTime)
	createdAt: Date;

	@Field(() => GraphQLISODateTime)
	updatedAt: Date;

	@Field(() => GraphQLISODateTime)
	deletedAt: Date;
}
