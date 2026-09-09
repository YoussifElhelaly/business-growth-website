import clsx from "clsx";
import { Icon } from "../core/Icon.jsx";
import { FieldShell, fieldBase, fieldBorder } from "./FieldShell.jsx";

let uid = 0;
export function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = "اختر…",
  hint,
  error,
  required,
  id,
  className = "",
}) {
  const selectId = id || `select-${(uid += 1)}`;
  return (
    <FieldShell label={label} hint={hint} error={error} required={required} id={selectId}>
      <div className="relative">
        <select
          id={selectId}
          value={value || ""}
          required={required}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={clsx(fieldBase, fieldBorder(error), "cursor-pointer appearance-none ps-4 pe-11", className)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => {
            const optValue = typeof o === "string" ? o : o.value;
            const optLabel = typeof o === "string" ? o : o.label;
            return (
              <option key={optValue} value={optValue}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <span className="pointer-events-none absolute inset-y-0 end-4 flex items-center text-text-subtle">
          <Icon name="chevron-down" size={18} />
        </span>
      </div>
    </FieldShell>
  );
}
