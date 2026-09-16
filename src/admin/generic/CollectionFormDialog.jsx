import { useEffect, useState } from "react";
import { Dialog, Button } from "../../design-system/index.js";
import { useCreateItem, useUpdateItem } from "./genericHooks.js";
import { ResourceFields } from "./ResourceFields.jsx";
import { validateResourceForm, emptyResourceValue } from "./validateResource.js";

export function CollectionFormDialog({ resource, open, item, refOptionsByKey, onClose }) {
  const [form, setForm] = useState(() => emptyResourceValue(resource));
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(item);
  const createMutation = useCreateItem(resource.key);
  const updateMutation = useUpdateItem(resource.key);
  const mutation = isEdit ? updateMutation : createMutation;

  useEffect(() => {
    if (open) {
      setForm(item ? { ...item } : emptyResourceValue(resource));
      setErrors({});
      mutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item]);

  const submit = () => {
    const nextErrors = validateResourceForm(resource, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const args = isEdit ? { id: item.id, payload: form } : form;
    mutation.mutate(args, { onSuccess: onClose });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEdit ? `تعديل — ${resource.navLabel}` : `إضافة — ${resource.navLabel}`}
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
      <div className="flex max-h-[65vh] flex-col overflow-y-auto pe-1">
        <ResourceFields resource={resource} value={form} onChange={setForm} errors={errors} refOptionsByKey={refOptionsByKey} />
      </div>
    </Dialog>
  );
}
