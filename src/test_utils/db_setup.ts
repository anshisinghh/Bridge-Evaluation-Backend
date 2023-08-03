// This file is executed once in the worker before executing each test file. We
// wait for the database connection and make sure to close it afterwards.

import { AppDataSource } from "../data_source";

// TODO(felix) we do not need to run this for all the tests
// for instance there are tests that do not need a database.
// maybe add it to the files using: https://dev.to/caiulucas/tests-with-jest-and-typeorm-4j1l
beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
});

afterAll(async () => {
  AppDataSource.entityMetadatas.forEach(async (entity) => {
    const repository = AppDataSource.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.schema || "public"}.${entity.tableName}`);
  });

  await AppDataSource.destroy();
});