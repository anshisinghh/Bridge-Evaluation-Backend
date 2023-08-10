import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

const { JEST_WORKER_ID, NODE_ENV } = process.env;
const db_name = NODE_ENV === "test" ? `test_${JEST_WORKER_ID}` : "postgres";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 3000,
  username: "user",
  password: "password",
  database: db_name,
  synchronize: false,
  logging: false,
  entities: ["src/data/*.ts"],
  subscribers: [],
  migrations: ["src/migrations/*.ts"],
});