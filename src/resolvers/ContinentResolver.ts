import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Country, { CountryInput } from "../entities/Country";
import { GraphQLError } from "graphql/error";
import Continent, { ContinentInput } from "../entities/Continent";

@Resolver(Continent)
export default class ContinentResolver {
  @Query(() => [Continent])
  async continents() {
    return Continent.find();
  }

  @Mutation(() => Continent)
  async addContinent(@Arg("data", { validate: true }) data: ContinentInput) {
    const newContinent = new Continent();
    Object.assign(newContinent, data);
    const { id } = await newContinent.save();
    return Continent.findOne({
      where: { id },
    });
  }
}
