import { useState } from "react";
import { Button, Icon, IconButton } from "../design-system/index.js";
import { useAdminServices, useDeleteService, useReorderServices } from "../api/adminHooks.js";
import { ServiceFormDialog } from "./ServiceFormDialog.jsx";
import { ConfirmDialog } from "./ConfirmDialog.jsx";

export function ServicesListPage() {
  const { data: services, isLoading } = useAdminServices();
  const reorder = useReorderServices();
  const deleteMutation = useDeleteService();
  const [formState, setFormState] = useState(null); // { service: null|object }
  const [deleteTarget, setDeleteTarget] = useState(null);

  const move = (index, dir) => {
    if (!services) return;
    const target = index + dir;
    if (target < 0 || target >= services.length) return;
    const next = [...services];
    [next[index], next[target]] = [next[target], next[index]];
    reorder.mutate(next.map((s) => s.id));
  };

  const confirmDelete = () => {
    deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-text-strong">الخدمات</h1>
        <Button size="sm" iconStart="plus" onClick={() => setFormState({ service: null })}>
          إضافة خدمة
        </Button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-text-muted">جارِ التحميل…</p>
      ) : (
        <div className="mt-6 flex flex-col bg-white">
          {services.map((s, i) => (
            <div key={s.id} className="flex items-center gap-4 border-b border-border-subtle px-5 py-4 last:border-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-green">
                <Icon name={s.icon} size={18} />
              </span>
              <div className="flex-1">
                <p className="font-semibold text-text-strong">{s.title.ar}</p>
                <p className="text-sm text-text-muted">{s.title.en}</p>
              </div>
              <div className="flex items-center gap-1">
                <IconButton name="chevron-up" label="تحريك للأعلى" onClick={() => move(i, -1)} className={i === 0 ? "opacity-30" : ""} />
                <IconButton name="chevron-down" label="تحريك للأسفل" onClick={() => move(i, 1)} className={i === services.length - 1 ? "opacity-30" : ""} />
                <IconButton name="edit" label="تعديل" onClick={() => setFormState({ service: s })} />
                <IconButton name="trash" label="حذف" onClick={() => setDeleteTarget(s)} />
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="px-5 py-8 text-center text-text-muted">لا توجد خدمات بعد</p>}
        </div>
      )}

      <ServiceFormDialog
        open={Boolean(formState)}
        service={formState?.service ?? null}
        onClose={() => setFormState(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="حذف الخدمة"
        body={deleteTarget ? `هل أنت متأكد من حذف "${deleteTarget.title.ar}"؟ لا يمكن التراجع عن هذا الإجراء.` : ""}
        confirmLabel="حذف"
        pending={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
