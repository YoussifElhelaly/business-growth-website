import { Icon } from "../../design-system/index.js";
import { ICON_OPTIONS } from "../iconOptions.js";

export function IconPicker({ label, value, onChange, error, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-text-strong">
        {label} {required && <span className="text-danger-600">*</span>}
      </label>
      <div className="flex flex-wrap gap-2 rounded border border-border-subtle bg-white p-3 max-h-48 overflow-y-auto">
        {ICON_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            title={opt.value}
            className={`flex h-10 w-10 items-center justify-center rounded transition-colors ${
              value === opt.value ? "bg-copper text-white hover:bg-copper-dark" : "bg-sand-deep text-text-muted hover:bg-sand hover:text-text-strong"
            }`}
          >
            <Icon name={opt.value} size={20} />
          </button>
        ))}
      </div>
      {error && <span className="text-sm text-danger-600">{error}</span>}
    </div>
  );
}
