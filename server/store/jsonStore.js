import { promises as fs } from "fs";
import path from "path";

export function createJsonStore(filePath, defaultValue) {
  let writeQueue = Promise.resolve();

  async function ensureFile() {
    try {
      await fs.access(filePath);
    } catch {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultValue, null, 2));
    }
  }

  async function read() {
    await ensureFile();
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  }

  function write(value) {
    writeQueue = writeQueue.then(async () => {
      const tmpPath = `${filePath}.tmp`;
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(tmpPath, JSON.stringify(value, null, 2));
      await fs.rename(tmpPath, filePath);
    });
    return writeQueue;
  }

  return { read, write };
}
