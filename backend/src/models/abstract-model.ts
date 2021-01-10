import {
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from "typeorm";
import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export abstract class AbstractModel extends BaseEntity {
	@Field((type) => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field((type) => Date)
	@CreateDateColumn()
	createdAt: Date;

	@Field((type) => Date)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field((type) => Date)
	@DeleteDateColumn()
	deletedAt: Date;
}
