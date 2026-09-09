import clsx from "clsx";
import { FieldShell, fieldBase, fieldBorder } from "./FieldShell.jsx";

let uid = 0;
export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  rows = 5,
  hint,
  error,
  required,
  id,
  className = "",
}) {
  const areaId = id || `textarea-${(uid += 1)}`;
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} id={areaId}>
      <textarea
        id={areaId}
        rows={rows}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={clsx(fieldBase, fieldBorder(error), "resize-y leading-[1.85]", className)}
      />
    </FieldShell>
  );
}
