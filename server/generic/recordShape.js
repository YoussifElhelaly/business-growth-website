function buildFieldValue(field, rawValue) {
  switch (field.type) {
    case "checkbox":
      return Boolean(rawValue);
    case "string-list": {
      const list = Array.isArray(rawValue) ? rawValue : [];
      if (!field.bilingual) return list.map((v) => String(v ?? ""));
      return list.map((v) => ({ ar: String(v?.ar ?? ""), en: String(v?.en ?? "") }));
    }
    case "object-list": {
      const list = Array.isArray(rawValue) ? rawValue : [];
      return list.map((item) => buildRecord(undefined, item, field.subFields));
    }
    default: {
      if (field.bilingual) {
        return { ar: String(rawValue?.ar ?? ""), en: String(rawValue?.en ?? "") };
      }
      return rawValue == null ? "" : String(rawValue);
    }
  }
}

export function buildRecord(id, body, fields) {
  const record = {};
  if (id !== undefined) record.id = id;
  for (const field of fields) {
    record[field.key] = buildFieldValue(field, body?.[field.key]);
  }
  return record;
}

function validateField(field, rawValue) {
  if (!field.required) return null;
  switch (field.type) {
    case "checkbox":
      return null;
    case "string-list": {
      const list = Array.isArray(rawValue) ? rawValue : [];
      if (field.bilingual) {
        const ok = list.some((v) => v?.ar?.trim() && v?.en?.trim());
        return ok ? null : "أضف عنصرًا واحدًا على الأقل باللغتين";
      }
      const ok = list.some((v) => String(v ?? "").trim());
      return ok ? null : "أضف عنصرًا واحدًا على الأقل";
    }
    case "object-list": {
      const list = Array.isArray(rawValue) ? rawValue : [];
      return list.length > 0 ? null : "أضف عنصرًا واحدًا على الأقل";
    }
    default: {
      if (field.bilingual) {
        const okAr = rawValue?.ar && String(rawValue.ar).trim();
        const okEn = rawValue?.en && String(rawValue.en).trim();
        return okAr && okEn ? null : "هذا الحقل مطلوب باللغتين";
      }
      return rawValue != null && String(rawValue).trim() ? null : "هذا الحقل مطلوب";
    }
  }
}

export function validateRecord(fields, body) {
  const errors = {};
  for (const field of fields) {
    const err = validateField(field, body?.[field.key]);
    if (err) errors[field.key] = err;
  }
  return errors;
}
