// Projects a stored record (bilingual fields as {ar,en}) down to the flat,
// single-language shape the public site's page components expect.
// Shared between the Express server (not currently needed there) and the
// Vite/React client (src/api/mockApi.js).

function projectValue(value, field, lang) {
  switch (field.type) {
    case "string-list": {
      const list = value || [];
      if (!field.bilingual) return list;
      return list.map((v) => v?.[lang] ?? v?.ar ?? "");
    }
    case "object-list": {
      const list = value || [];
      return list.map((item) => projectRecord(item, field.subFields, lang));
    }
    default: {
      if (!field.bilingual) return value;
      return value?.[lang] ?? value?.ar ?? "";
    }
  }
}

export function projectRecord(record, fields, lang) {
  if (!record) return record;
  const out = { id: record.id };
  for (const field of fields) {
    out[field.key] = projectValue(record[field.key], field, lang);
  }
  return out;
}
