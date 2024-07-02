import { Resolver, Query, Mutation, Arg } from "type-graphql";
import Country, { CountryInput } from "../entities/Country";
import { GraphQLError } from "graphql/error";
import Continent, { ContinentInput } from "../entities/Continent";
import { Like } from "typeorm";

@Resolver(Country)
export default class CountryResolver {
  @Query(() => [Country])
  async countries() {
    return Country.find();
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("isocode", () => String) isocode: string) {
    const country = await Country.findOne({
      where: { isocode },
    });
    if (!country) throw new GraphQLError("not found");
    return country;
  }

  @Query(() => [Country])
  async getCountriesByContinent(
    @Arg("continent", () => String) continentName: string
  ) {
    const continent = await Continent.findOne({
      where: { name: Like(`%${continentName}%`) },
    });
    if (!continent) throw new GraphQLError("contient not found");

    const countries = await Country.find({
      where: { continent: { id: continent.id } },
      relations: ["continent"],
    });

    if (!countries) throw new GraphQLError("not countries for this continent");
    return countries;
  }

  @Mutation(() => Country)
  async addCountry(@Arg("data", { validate: true }) data: CountryInput) {
    const newCountry = new Country();
    Object.assign(newCountry, data);
    const { id } = await newCountry.save();
    return Country.findOne({
      where: { id },
    });
  }

  @Mutation(() => Country)
  async addCountryWContinent(
    @Arg("data", { validate: true }) data: CountryInput
  ) {
    const continent = await Continent.findOne({
      where: { isocode: Like(`%${data.continent}%`) },
    });
    if (!continent) throw new GraphQLError("no continent found");

    const newCountry = Country.create({
      name: data.name,
      isocode: data.isocode,
      flag: data.flag,
      continent: continent,
    });

    await newCountry.save();
    return newCountry;
  }
}
