import { executeQuery } from "../database/database.js";

const create = async (shopping_list_id, name) => {
  await executeQuery(
    "INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($1, $2);",
    shopping_list_id,
    name,
  );
};

const countItems = async () => {
  const result = await executeQuery(
    "SELECT COUNT(*) FROM shopping_list_items;",
  );
  return result.rows[0].count;
};

const findAllCollected = async (shopping_list_id) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $1 AND collected = TRUE ORDER BY name;",
    shopping_list_id,
  );
  return result.rows;
};

const collect = async (id) => {
  await executeQuery(
    "UPDATE shopping_list_items SET collected = TRUE WHERE id = $1;",
    id,
  );
};

const findAllNonCollected = async (shopping_list_id) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $1 AND collected = FALSE ORDER BY name;",
    shopping_list_id,
  );
  return result.rows;
};

export { collect, countItems, create, findAllCollected, findAllNonCollected };
