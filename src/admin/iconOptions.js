import { ICONS } from "../design-system/index.js";

export const ICON_OPTIONS = Object.keys(ICONS)
  .sort()
  .map((key) => ({ value: key, label: key }));
