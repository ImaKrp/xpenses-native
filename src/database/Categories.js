import db from "./SQLiteDB";
import { categories } from "../utils/categories";

db.execSync(`
  CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, icon TEXT, icon_type TEXT, color TEXT, type TEXT);
`);

categories.forEach(({ name, icon, icon_type, color }) => {
  db.runSync(
    "INSERT OR IGNORE INTO categories (name, icon, icon_type, color, type) values (?, ?, ?, ?, ?);",
    [name, icon, icon_type, color, "default"]
  );
});

const create = async (data) => {
  db.runSync(
    "INSERT INTO categories (name, icon, icon_type, color, type) values (?, ?, ?, ?, ?);",
    [data?.name, data?.icon, data?.icon_type, data?.color, "custom"]
  );
};

const update = async (data) => {
  db.runSync(
    "UPDATE categories SET name=?, icon=?, icon_type=?, color=? WHERE id=?;",
    [data?.name, data?.icon, data?.icon_type, data?.color, data?.id]
  );
};

const deleteCategory = async (id) => {
  db.runSync("DELETE FROM categories WHERE id=?;", [id]);
};

const listAll = async (filter) => {
  let query = "SELECT * FROM categories";
  if (filter?.search) {
    query += " WHERE name LIKE '%" + filter.search + "%'";
  }

  const allRows = await db.getAllAsync(query);
  return allRows;
};

const listAllCustom = async () => {
  const allRows = await db.getAllAsync(
    "SELECT * FROM categories WHERE type = 'custom'"
  );
  return allRows;
};

const listAllDefault = async () => {
  const allRows = await db.getAllAsync(
    "SELECT * FROM categories WHERE type = 'default'"
  );
  return allRows;
};

export default {
  create,
  update,
  deleteCategory,
  listAll,
  listAllDefault,
  listAllCustom,
};
