import { Button, IconButton, Input, Textarea } from "../../design-system/index.js";

export function BilingualStringListField({ label, pairs, lang, onChange, error }) {
  const list = pairs || [];
  const setAt = (i, v) => onChange(list.map((p, idx) => (idx === i ? { ...p, [lang]: v } : p)));
  const removeAt = (i) => onChange(list.length > 1 ? list.filter((_, idx) => idx !== i) : list);
  const add = () => onChange([...list, { ar: "", en: "" }]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-text-strong">{label}</span>
      {list.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={p[lang] || ""} onChange={(v) => setAt(i, v)} className="flex-1" />
          <IconButton name="trash" label="حذف العنصر" onClick={() => removeAt(i)} />
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" iconStart="plus" onClick={add} className="self-start">
        إضافة عنصر
      </Button>
      {error && <span className="text-xs text-danger-600">{error}</span>}
    </div>
  );
}

export function ObjectListField({ label, items, subFields, onChange, error }) {
  const list = items || [];

  const emptyItem = () =>
    Object.fromEntries(subFields.map((sf) => [sf.key, sf.bilingual ? { ar: "", en: "" } : ""]));

  const updateItem = (i, key, lang, v) =>
    onChange(
      list.map((item, idx) => {
        if (idx !== i) return item;
        if (lang) return { ...item, [key]: { ...item[key], [lang]: v } };
        return { ...item, [key]: v };
      })
    );
  const removeItem = (i) => onChange(list.filter((_, idx) => idx !== i));
  const addItem = () => onChange([...list, emptyItem()]);

  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-semibold text-text-strong">{label}</span>
      {list.map((item, i) => (
        <div key={i} className="flex flex-col gap-3 border border-border-subtle p-4">
          <div className="flex justify-end">
            <IconButton name="trash" label="حذف البند" onClick={() => removeItem(i)} />
          </div>
          {subFields.map((sf) =>
            sf.bilingual ? (
              <div key={sf.key} className="grid grid-cols-2 gap-3">
                {sf.type === "textarea" ? (
                  <>
                    <Textarea label={`${sf.label} (عربي)`} rows={2} value={item[sf.key]?.ar || ""} onChange={(v) => updateItem(i, sf.key, "ar", v)} />
                    <Textarea label={`${sf.label} (EN)`} rows={2} value={item[sf.key]?.en || ""} onChange={(v) => updateItem(i, sf.key, "en", v)} />
                  </>
                ) : (
                  <>
                    <Input label={`${sf.label} (عربي)`} value={item[sf.key]?.ar || ""} onChange={(v) => updateItem(i, sf.key, "ar", v)} />
                    <Input label={`${sf.label} (EN)`} value={item[sf.key]?.en || ""} onChange={(v) => updateItem(i, sf.key, "en", v)} />
                  </>
                )}
              </div>
            ) : (
              <Input key={sf.key} label={sf.label} value={item[sf.key] || ""} onChange={(v) => updateItem(i, sf.key, null, v)} />
            )
          )}
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" iconStart="plus" onClick={addItem} className="self-start">
        إضافة بند
      </Button>
      {error && <span className="text-xs text-danger-600">{error}</span>}
    </div>
  );
}
