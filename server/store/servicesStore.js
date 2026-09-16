import path from "path";
import { fileURLToPath } from "url";
import { createJsonStore } from "./jsonStore.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "..", "data", "services.json");

export const servicesStore = createJsonStore(filePath, []);
