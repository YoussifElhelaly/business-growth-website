import { Input, Select, Textarea } from "../../design-system/index.js";
import { ICON_OPTIONS } from "../iconOptions.js";

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-copper" />
      <span className="text-sm font-semibold text-text-strong">{label}</span>
    </label>
  );
}

export function ScalarFieldInput({ field, value, onChange, error, refOptions }) {
  switch (field.type) {
    case "textarea":
      return <Textarea label={field.label} rows={3} value={value || ""} onChange={onChange} error={error} required={field.required} />;
    case "icon":
      return <Select label={field.label} options={ICON_OPTIONS} value={value || ""} onChange={onChange} error={error} required={field.required} />;
    case "select-ref":
      return <Select label={field.label} options={refOptions || []} value={value || ""} onChange={onChange} error={error} required={field.required} />;
    case "checkbox":
      return <CheckboxField label={field.label} checked={Boolean(value)} onChange={onChange} />;
    default:
      return <Input label={field.label} value={value || ""} onChange={onChange} error={error} required={field.required} />;
  }
}
