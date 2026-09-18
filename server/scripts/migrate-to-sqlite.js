import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../store/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

async function migrate() {
  console.log("Starting migration to SQLite...");
  const files = await fs.readdir(dataDir);
  
  const insertStmt = db.prepare(`
    INSERT INTO resources (key, data)
    VALUES (@key, @data)
    ON CONFLICT(key) DO UPDATE SET data = excluded.data
  `);

  for (const file of files) {
    if (file.endsWith(".json") && file !== "database.sqlite") {
      const key = file.replace(".json", "");
      try {
        const raw = await fs.readFile(path.join(dataDir, file), "utf-8");
        // Verify it's valid JSON
        JSON.parse(raw);
        insertStmt.run({ key, data: raw });
        console.log(`Migrated ${key}`);
      } catch (err) {
        console.error(`Failed to migrate ${file}:`, err.message);
      }
    }
  }
  
  console.log("Migration complete!");
}

migrate().catch(console.error);
