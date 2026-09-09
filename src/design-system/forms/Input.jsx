import clsx from "clsx";
import { FieldShell, fieldBase, fieldBorder } from "./FieldShell.jsx";

let uid = 0;
export function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  hint,
  error,
  required,
  disabled,
  id,
  className = "",
}) {
  const inputId = id || (id === "" ? undefined : `input-${(uid += 1)}`);
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} id={inputId}>
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={clsx(fieldBase, fieldBorder(error), className)}
      />
    </FieldShell>
  );
}
