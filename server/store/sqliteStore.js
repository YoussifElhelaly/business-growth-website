import { db } from "./db.js";

export function createSqliteStore(key, defaultValue) {
  const getStmt = db.prepare("SELECT data FROM resources WHERE key = ?");
  const insertStmt = db.prepare(`
    INSERT INTO resources (key, data)
    VALUES (@key, @data)
    ON CONFLICT(key) DO UPDATE SET data = excluded.data
  `);

  async function read() {
    const row = getStmt.get(key);
    if (row) {
      return JSON.parse(row.data);
    }
    // If not found, insert default and return it
    insertStmt.run({ key, data: JSON.stringify(defaultValue) });
    return defaultValue;
  }

  // write in genericStore is expected to return a Promise for compatibility
  async function write(value) {
    insertStmt.run({ key, data: JSON.stringify(value) });
  }

  return { read, write };
}
