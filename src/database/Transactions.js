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

  let hasSetFilter = false;
  const args = [];

  const addWhereClause = () => {
    if (!hasSetFilter) {
      query += " WHERE ";
      hasSetFilter = true;
    } else {
      query += " AND ";
    }
  };

  if (filter?.date) {
    addWhereClause();
    query += "transactions.date BETWEEN ? AND ?";
    args.push(filter.date[0], filter.date[1]);
  }

  if (filter.title) {
    addWhereClause();
    query += "transactions.title LIKE ?";
    args.push(`%${filter.title}%`);
  }

  if (filter.category_id) {
    addWhereClause();
    if (filter.category?.name === "outros") {
      query += "(transactions.category_id = ? OR transactions.category_id IS NULL)";
    } else {
      query += "transactions.category_id = ?";
    }
    args.push(filter.category_id);
  }

  if (filter.type) {
    addWhereClause();
    query += "transactions.type = ?";
    args.push(filter.type);
  }

  query += " ORDER BY transactions.date DESC, transactions.title ASC;";

  const allRows = await db.getAllAsync(query, args);
  return allRows;
};

export default {
  create,
  update,
  deleteTransaction,
  listAll,
};
