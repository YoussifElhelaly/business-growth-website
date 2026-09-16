import { ScalarFieldInput } from "./ScalarFieldInput.jsx";
import { BilingualStringListField, ObjectListField } from "./ListFields.jsx";

const LANGS = [
  { lang: "ar", label: "العربية" },
  { lang: "en", label: "English" },
];

export function ResourceFields({ resource, value, onChange, errors, refOptionsByKey }) {
  const sharedFields = resource.fields.filter((f) => !f.bilingual);
  const bilingualFields = resource.fields.filter((f) => f.bilingual);

  const setField = (key) => (v) => onChange({ ...value, [key]: v });

  return (
    <div className="flex flex-col gap-5">
      {sharedFields.map((field) => {
        if (field.type === "object-list") {
          return (
            <ObjectListField
              key={field.key}
              label={field.label}
              items={value[field.key]}
              subFields={field.subFields}
              onChange={setField(field.key)}
              error={errors[field.key]}
            />
          );
        }
        return (
          <ScalarFieldInput
            key={field.key}
            field={field}
            value={value[field.key]}
            onChange={setField(field.key)}
            error={errors[field.key]}
            refOptions={field.type === "select-ref" ? refOptionsByKey?.[field.refKey] : undefined}
          />
        );
      })}

      {bilingualFields.length > 0 &&
        LANGS.map(({ lang, label }) => (
          <div key={lang} className="flex flex-col gap-4 border-t border-border-subtle pt-5">
            <h5 className="text-sm font-bold tracking-wide text-copper-dark">{label}</h5>
            {bilingualFields.map((field) => {
              if (field.type === "string-list") {
                return (
                  <BilingualStringListField
                    key={field.key}
                    label={field.label}
                    pairs={value[field.key]}
                    lang={lang}
                    onChange={setField(field.key)}
                    error={errors[field.key]}
                  />
                );
              }
              return (
                <ScalarFieldInput
                  key={field.key}
                  field={field}
                  value={value[field.key]?.[lang]}
                  onChange={(v) => setField(field.key)({ ...value[field.key], [lang]: v })}
                  error={lang === "ar" ? errors[`${field.key}Ar`] : errors[`${field.key}En`]}
                />
              );
            })}
          </div>
        ))}
    </div>
  );
}
