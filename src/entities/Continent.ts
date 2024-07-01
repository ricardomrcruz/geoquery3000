import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";
import { ObjectId } from "../types";
import Country from "./Country";

@Entity()
@ObjectType()
export default class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  isocode: string;

  @OneToMany(() => Country, (country) => country.continent)
  countries: Country[];
}

@InputType()
export class ContinentInput {
  @Field()
  isocode: string;

  @Field()
  name: string;

}
