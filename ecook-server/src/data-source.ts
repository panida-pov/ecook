import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 23307,
  username: "root",
  password: "root",
  database: "ecook",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrationsRun: false,
  migrations: [__dirname + "/migration/*{.ts,.js}"],
  migrationsTableName: "migration",
  synchronize: false,
});
