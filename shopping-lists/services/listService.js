import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery("INSERT INTO shopping_lists (name) VALUES ($1);", name);
};

const findById = async (id) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE id = $1;",
    id,
  );
  return result.rows[0];
};

const findAllNonActiveLists = async () => {
  const result = await executeQuery(
    "SELECT * FROM shopping_lists WHERE active = true;",
  );
  return result.rows;
};

const deactivate = async (id) => {
  await executeQuery(
    "UPDATE shopping_lists SET active = FALSE WHERE id = $1;",
    id,
  );
};

const countLists = async () => {
  const result = await executeQuery(
    "SELECT COUNT(*) FROM shopping_lists;",
  );
  return result.rows[0].count;
};

export { countLists, create, deactivate, findAllNonActiveLists, findById };
