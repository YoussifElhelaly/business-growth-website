import { createSqliteStore } from "./sqliteStore.js";

export const servicesStore = createSqliteStore("services", []);
