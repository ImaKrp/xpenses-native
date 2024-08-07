import db from "./SQLiteDB";
import { categories } from "../utils/categories";

// db.execSync("DROP TABLE users;");

db.execSync(
  "PRAGMA foreign_keys = ON;CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image_path TEXT);"
);

const create = async (data) => {
  db.runSync("INSERT INTO users (name, image_path) values (?, ?);", [
    data?.name,
    data?.image_path,
  ]);
};

const update = async (data) => {
  db.runSync("UPDATE users SET name=?, image_path=? WHERE id=?;", [
    data?.name,
    data?.image_path,
    data?.id,
  ]);
};

const find = async () => {
  let query = "SELECT * FROM users";

  const allRows = await db.getFirstAsync(query);
  return allRows;
};

export default {
  create,
  update,
  find,
};
