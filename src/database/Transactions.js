import db from "./SQLiteDB";

// db.execSync("DROP TABLE transactions;");

db.execSync(`
  PRAGMA foreign_keys = ON;CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category_id INTEGER, value REAL, date INTEGER, frequency TEXT, type TEXT, FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL);
`);

const create = async (data) => {
  db.runSync(
    "INSERT INTO transactions (title, category_id, value, date, type, frequency) values (?, ?, ?, ?, ?, ?);",
    [
      data?.title,
      data?.category_id,
      data?.value,
      data?.date,
      data?.type,
      data?.frequency,
    ]
  );
};

const update = async (data) => {
  db.runSync(
    "UPDATE transactions SET title=?, category_id=?, value=?, date=?, type=?, frequency=? WHERE id=?;",
    [
      data?.title,
      data?.category_id,
      data?.value,
      data?.date,
      data?.type,
      data?.frequency,
      data?.id,
    ]
  );
};

const deleteTransaction = async (id) => {
  db.runSync("DELETE FROM transactions WHERE id=?;", [id]);
};

const listAll = async (filter) => {
  let query = `SELECT 
    transactions.*, 
    categories.name, 
    categories.icon, 
    categories.icon_type, 
    categories.color  
    FROM 
        transactions
    LEFT JOIN 
        categories 
    ON 
    transactions.category_id = categories.id`;

  if (Object.keys(filter).length > 0) query += " WHERE ";

  let hasSetFilter = false;

  if (filter?.date) {
    if (hasSetFilter) query += " AND ";
    query +=
      "transactions.date BETWEEN " +
      filter?.date[0] +
      " AND " +
      filter?.date[1];
    hasSetFilter = true;
  }

  if (filter.title) {
    if (hasSetFilter) query += " AND ";
    query += "transactions.title LIKE '%" + filter.title + "%'";
    hasSetFilter = true;
  }

  if (filter.category_id) {
    if (hasSetFilter) query += " AND ";
    query += "transactions.category_id = " + filter.category_id;
    if (filter.category?.name === "outros") {
      query += " OR transactions.category_id IS NULL";
    }
    hasSetFilter = true;
  }

  if (filter.type) {
    if (hasSetFilter) query += " AND ";
    query += "transactions.type = '" + filter.type + "'";
    hasSetFilter = true;
  }

  query += " ORDER BY transactions.date DESC, transactions.title ASC;";

  const allRows = await db.getAllAsync(query);
  return allRows;
};

export default {
  create,
  update,
  deleteTransaction,
  listAll,
};
