import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "database.sqlite");

// Ensure data directory exists
await fs.mkdir(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);

// Create the resources table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS resources (
    key TEXT PRIMARY KEY,
    data TEXT NOT NULL
  )
`);

// Optimize performance
db.pragma('journal_mode = WAL');
