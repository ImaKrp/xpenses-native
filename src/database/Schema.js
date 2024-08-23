import db from "./SQLiteDB";
import { migrations } from "../utils/migrations";

// db.execSync("DROP TABLE schemas;");

db.execSync(`
  PRAGMA foreign_keys = ON;CREATE TABLE IF NOT EXISTS schemas (id INTEGER PRIMARY KEY AUTOINCREMENT, version REAL UNIQUE, done INTEGER);
`);

migrations.forEach(({ version, done }) => {
  db.runSync("INSERT OR IGNORE INTO schemas (version, done) values (?, ?);", [
    version,
    done,
  ]);
});

const checkNrun = async () => {
  const allRows = await db.getAllAsync("SELECT * FROM schemas WHERE done=0;");
  if (!allRows || allRows.length === 0) return true;

  for (let i = 0; i < allRows.length; i++) {
    const current = allRows[i]?.version;

    if (current === 0.1) {
        await db.runAsync(
          `CREATE TABLE transactions_backup (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category_id INTEGER, value REAL, date INTEGER, frequency TEXT, type TEXT, FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL);`
        );
        await db.runAsync(
          `INSERT INTO transactions_backup SELECT * FROM transactions`
        );
        await db.runAsync(`DROP TABLE transactions;`);
        await db.runAsync(
          `CREATE TABLE transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, category_id INTEGER, value REAL, date INTEGER, frequency TEXT, type TEXT, FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE SET NULL);`
        );
        await db.runAsync(
          `INSERT INTO transactions SELECT * FROM transactions_backup`
        );
        await db.runAsync(`DROP TABLE transactions_backup;`);
        await db.runAsync("UPDATE schemas SET done=1 WHERE id=?;", [
          allRows[i]?.id,
        ]);
    }
  }

  return true;
};

export default { checkNrun };
