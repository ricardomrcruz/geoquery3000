import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "geoquery3000.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
});
