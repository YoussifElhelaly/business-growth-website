import { useEffect, useState } from "react";
import { Button } from "../../design-system/index.js";
import { useSingleton, useUpdateSingleton } from "./genericHooks.js";
import { ResourceFields } from "./ResourceFields.jsx";
import { validateResourceForm, emptyResourceValue } from "./validateResource.js";

export function SingletonAdminPage({ resource }) {
  const { data, isLoading } = useSingleton(resource.key);
  const [form, setForm] = useState(() => emptyResourceValue(resource));
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const mutation = useUpdateSingleton(resource.key);

  useEffect(() => {
    if (data) setForm({ ...emptyResourceValue(resource), ...data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const submit = () => {
    const nextErrors = validateResourceForm(resource, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSaved(false);
    mutation.mutate(form, { onSuccess: () => setSaved(true) });
  };

  if (isLoading) return <p className="text-text-muted">جارِ التحميل…</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-text-strong">{resource.navLabel}</h1>
      <div className="mt-6 max-w-[720px] bg-white p-6">
        <ResourceFields resource={resource} value={form} onChange={setForm} errors={errors} />
        <div className="mt-6 flex items-center gap-4 border-t border-border-subtle pt-5">
          <Button size="sm" onClick={submit} disabled={mutation.isPending}>
            {mutation.isPending ? "جارِ الحفظ…" : "حفظ التغييرات"}
          </Button>
          {saved && !mutation.isPending && <span className="text-sm font-semibold text-success-600">تم الحفظ</span>}
        </div>
      </div>
    </div>
  );
}
