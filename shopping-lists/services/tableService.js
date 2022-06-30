import { executeQuery } from "../database/database.js";

const create = async () => {
  await executeQuery(
    "CREATE TABLE shopping_lists (id SERIAL PRIMARY KEY, name TEXT NOT NULL, active BOOLEAN DEFAULT TRUE);",
  );
  await executeQuery(
    "CREATE TABLE shopping_list_items (id SERIAL PRIMARY KEY, shopping_list_id INTEGER REFERENCES shopping_lists(id), name TEXT NOT NULL, collected BOOLEAN DEFAULT FALSE);",
  );
};

export { create };
