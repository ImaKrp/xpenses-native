import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("database");

export default db;
