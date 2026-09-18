import { createSqliteStore } from "../store/sqliteStore.js";

export function createResourceStore(resource) {
  const defaultValue = resource.mode === "collection" ? [] : {};
  return createSqliteStore(resource.key, defaultValue);
}
