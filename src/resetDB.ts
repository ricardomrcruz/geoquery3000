import db from "./db";
import Country from "./entities/Country";
import Continent from "./entities/Continent";

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("PRAGMA foreign_keys=OFF");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS ${entity.tableName}`)
    )
  );
  await runner.query("PRAGMA foreign_keys=ON");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const france = Country.create({
    isocode: "FR",
    name: "France",
    flag: "🇫🇷",
  });

  const germany = Country.create({
    isocode: "DE",
    name: "Germany",
    flag: "🇩🇪",
  });

  const usa = Country.create({
    isocode: "US",
    name: "United States",
    flag: "🇺🇸",
  });

  const brazil = Country.create({
    isocode: "BR",
    name: "Brazil",
    flag: "🇧🇷",
  });

  const nigeria = Country.create({
    isocode: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
  });

  const southAfrica = Country.create({
    isocode: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
  });

  const australia = Country.create({
    isocode: "AU",
    name: "Australia",
    flag: "🇦🇺",
  });

  const antarctica = Country.create({
    isocode: "AQ",
    name: "Antarctica",
    flag: "🇦🇶",
  });

  const europe = Continent.create({ name: "Europe", isocode: "EU" });
  const northAmerica = Continent.create({
    name: "North America",
    isocode: "NA",
  });
  const southAmerica = Continent.create({
    name: "South America",
    isocode: "SA",
  });
  const africa = Continent.create({ name: "Africa", isocode: "AF" });
  const australiaContinent = Continent.create({
    name: "Australia/Oceania",
    isocode: "OC",
  });
  const antarcticaContinent = Continent.create({
    name: "Antarctica",
    isocode: "AN",
  });

  await europe.save();
  await northAmerica.save();
  await southAmerica.save();
  await africa.save();
  await australiaContinent.save();
  await antarcticaContinent.save();

  france.continent = europe;
  germany.continent = europe;
  usa.continent = northAmerica;
  brazil.continent = southAmerica;
  nigeria.continent = africa;
  southAfrica.continent = africa;
  australia.continent = australiaContinent;
  antarctica.continent = antarcticaContinent;

  await france.save();
  await germany.save();
  await usa.save();
  await brazil.save();
  await nigeria.save();
  await southAfrica.save();
  await australia.save();
  await antarctica.save();
}

main();
