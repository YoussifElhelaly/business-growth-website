import path from "path";
import { fileURLToPath } from "url";
import { createJsonStore } from "../store/jsonStore.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

export function createResourceStore(resource) {
  const filePath = path.join(dataDir, `${resource.key}.json`);
  const defaultValue = resource.mode === "collection" ? [] : {};
  return createJsonStore(filePath, defaultValue);
}
