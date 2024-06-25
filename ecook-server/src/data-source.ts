import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "23307"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DBNAME || "ecook",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrationsRun: false,
  migrations: [__dirname + "/migration/*{.ts,.js}"],
  migrationsTableName: "migration",
  synchronize: false,
});
