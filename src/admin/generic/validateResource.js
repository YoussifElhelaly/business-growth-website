export function validateResourceForm(resource, value) {
  const errors = {};
  for (const field of resource.fields) {
    if (!field.required) continue;

    if (field.type === "object-list") {
      const list = value[field.key] || [];
      if (list.length === 0) errors[field.key] = "أضف عنصرًا واحدًا على الأقل";
      continue;
    }

    if (field.type === "checkbox") continue;

    if (!field.bilingual) {
      if (!String(value[field.key] ?? "").trim()) errors[field.key] = "هذا الحقل مطلوب";
      continue;
    }

    if (field.type === "string-list") {
      const pairs = value[field.key] || [];
      const ok = pairs.some((p) => p?.ar?.trim() && p?.en?.trim());
      if (!ok) errors[field.key] = "أضف عنصرًا واحدًا على الأقل باللغتين";
      continue;
    }

    const ar = value[field.key]?.ar;
    const en = value[field.key]?.en;
    if (!ar?.trim()) errors[`${field.key}Ar`] = "مطلوب";
    if (!en?.trim()) errors[`${field.key}En`] = "مطلوب";
  }
  return errors;
}

export function emptyResourceValue(resource) {
  const value = {};
  for (const field of resource.fields) {
    if (field.type === "checkbox") value[field.key] = false;
    else if (field.type === "object-list") value[field.key] = [];
    else if (field.type === "string-list") value[field.key] = field.bilingual ? [{ ar: "", en: "" }] : [""];
    else if (field.bilingual) value[field.key] = { ar: "", en: "" };
    else value[field.key] = "";
  }
  return value;
}
