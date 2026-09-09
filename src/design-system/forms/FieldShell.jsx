export function FieldShell({ label, hint, error, required, children, id }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-text-strong">
          {label}
          {required && <span className="ms-1 text-danger-600">*</span>}
        </label>
      )}
      {children}
      {(hint || error) && (
        <span className={`text-xs ${error ? "text-danger-600" : "text-text-subtle"}`}>{error || hint}</span>
      )}
    </div>
  );
}

export const fieldBase =
  "w-full rounded-md border bg-white px-4 py-[13px] text-base text-text-body outline-none transition-[border-color,box-shadow] duration-base ease-standard placeholder:text-text-subtle disabled:opacity-55";

export function fieldBorder(error) {
  return error
    ? "border-danger-600 focus:shadow-focus"
    : "border-border focus:border-navy-500 focus:shadow-focus";
}
