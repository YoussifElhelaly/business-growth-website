import { useEffect, useState } from "react";
import { Dialog, Button, IconButton, Input, Select, Textarea } from "../design-system/index.js";
import { useCreateService, useUpdateService } from "../api/adminHooks.js";
import { ICON_OPTIONS } from "./iconOptions.js";

const emptyForm = {
  icon: "building",
  image: "",
  title: { ar: "", en: "" },
  tag: { ar: "", en: "" },
  description: { ar: "", en: "" },
  items: { ar: [""], en: [""] },
  outcome: { ar: "", en: "" },
};

function ItemsField({ label, items, onChange }) {
  const setItem = (i, value) => onChange(items.map((it, idx) => (idx === i ? value : it)));
  const removeItem = (i) => onChange(items.length > 1 ? items.filter((_, idx) => idx !== i) : items);
  const addItem = () => onChange([...items, ""]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-text-strong">{label}</span>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={item} onChange={(v) => setItem(i, v)} className="flex-1" />
          <IconButton name="trash" label="حذف العنصر" onClick={() => removeItem(i)} />
        </div>
      ))}
      <Button type="button" variant="ghost" size="sm" iconStart="plus" onClick={addItem} className="self-start">
        إضافة عنصر
      </Button>
    </div>
  );
}

export function ServiceFormDialog({ open, service, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(service);
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const mutation = isEdit ? updateMutation : createMutation;

  useEffect(() => {
    if (open) {
      setForm(
        service
          ? {
              icon: service.icon,
              image: service.image,
              title: { ...service.title },
              tag: { ...service.tag },
              description: { ...service.description },
              items: { ar: [...service.items.ar], en: [...service.items.en] },
              outcome: { ...service.outcome },
            }
          : emptyForm
      );
      setErrors({});
      mutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, service]);

  const setField = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const setLangField = (key, lang) => (value) =>
    setForm((f) => ({ ...f, [key]: { ...f[key], [lang]: value } }));
  const setItems = (lang) => (items) =>
    setForm((f) => ({ ...f, items: { ...f.items, [lang]: items } }));

  const validate = () => {
    const next = {};
    if (!form.title.ar.trim()) next.titleAr = "مطلوب";
    if (!form.title.en.trim()) next.titleEn = "مطلوب";
    if (!form.description.ar.trim()) next.descriptionAr = "مطلوب";
    if (!form.description.en.trim()) next.descriptionEn = "مطلوب";
    if (!form.items.ar.some((s) => s.trim())) next.itemsAr = "أضف عنصرًا واحدًا على الأقل";
    if (!form.items.en.some((s) => s.trim())) next.itemsEn = "أضف عنصرًا واحدًا على الأقل";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    const payload = {
      ...form,
      items: {
        ar: form.items.ar.filter((s) => s.trim()),
        en: form.items.en.filter((s) => s.trim()),
      },
    };
    const args = isEdit ? { id: service.id, payload } : payload;
    mutation.mutate(args, { onSuccess: onClose });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEdit ? "تعديل الخدمة" : "إضافة خدمة"}
      width={720}
      footer={
        <>
          <Button size="sm" onClick={submit} disabled={mutation.isPending}>
            {mutation.isPending ? "جارِ الحفظ…" : "حفظ"}
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </>
      }
    >
      <div className="flex max-h-[65vh] flex-col gap-6 overflow-y-auto pe-1">
        <div className="grid grid-cols-2 gap-4">
          <Select label="الأيقونة" options={ICON_OPTIONS} value={form.icon} onChange={setField("icon")} />
          <Input label="رابط الصورة" value={form.image} onChange={setField("image")} placeholder="https://..." />
        </div>

        {[
          { lang: "ar", label: "العربية" },
          { lang: "en", label: "English" },
        ].map(({ lang, label }) => (
          <div key={lang} className="flex flex-col gap-4 border-t border-border-subtle pt-5">
            <h5 className="text-sm font-bold tracking-wide text-copper-dark">{label}</h5>
            <Input
              label="العنوان"
              value={form.title[lang]}
              onChange={setLangField("title", lang)}
              error={lang === "ar" ? errors.titleAr : errors.titleEn}
              required
            />
            <Input label="الوصف المختصر (tag)" value={form.tag[lang]} onChange={setLangField("tag", lang)} />
            <Textarea
              label="الوصف"
              rows={3}
              value={form.description[lang]}
              onChange={setLangField("description", lang)}
              error={lang === "ar" ? errors.descriptionAr : errors.descriptionEn}
              required
            />
            <ItemsField label="البنود" items={form.items[lang]} onChange={setItems(lang)} />
            {(lang === "ar" ? errors.itemsAr : errors.itemsEn) && (
              <span className="text-xs text-danger-600">{lang === "ar" ? errors.itemsAr : errors.itemsEn}</span>
            )}
            <Textarea label="خلاصة النتيجة (outcome)" rows={2} value={form.outcome[lang]} onChange={setLangField("outcome", lang)} />
          </div>
        ))}
      </div>
    </Dialog>
  );
}
