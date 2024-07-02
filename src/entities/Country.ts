import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { ObjectId } from "../types";
import Continent from "./Continent";

@Entity()
@ObjectType()
export default class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  isocode: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  flag: string;

  @ManyToOne(() => Continent, (c) => c.countries, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @Field(() => Continent)
  continent: Continent;
}

@InputType()
export class CountryInput {
  @Field()
  isocode: string;

  @Field()
  name: string;

  @Field()
  flag: string;

  @Field()
  continent: string;
}
