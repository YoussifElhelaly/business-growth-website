import { useState } from "react";
import { Button, Icon, IconButton } from "../../design-system/index.js";
import { useCollection, useDeleteItem, useReorderItems } from "./genericHooks.js";
import { CollectionFormDialog } from "./CollectionFormDialog.jsx";
import { ConfirmDialog } from "../ConfirmDialog.jsx";

function rowTitle(item, resource) {
  const field = resource.simpleList ? "value" : resource.itemLabelField;
  const bilingual = item[field];
  return { ar: bilingual?.ar || "", en: bilingual?.en || "" };
}

function useRefOptions(resource) {
  const refFields = resource.fields.filter((f) => f.type === "select-ref");
  const refKeys = [...new Set(refFields.map((f) => f.refKey))];
  // Fixed, small set of possible ref keys across the whole registry — calling
  // the hook conditionally per key keeps this simple without a dynamic hook list.
  const faqCats = useCollection("faqCats");
  const blogCats = useCollection("blogCats");
  const sources = { faqCats, blogCats };

  const refOptionsByKey = {};
  for (const field of refFields) {
    const source = sources[field.refKey];
    const data = source?.data || [];
    refOptionsByKey[field.refKey] = data.map((d) => ({ value: d.id, label: d[field.refLabelField]?.ar ?? d[field.refLabelField] }));
  }
  return { refOptionsByKey, needed: refKeys };
}

export function CollectionAdminPage({ resource }) {
  const { data: items, isLoading } = useCollection(resource.key);
  const reorder = useReorderItems(resource.key);
  const deleteMutation = useDeleteItem(resource.key);
  const { refOptionsByKey } = useRefOptions(resource);
  const [formState, setFormState] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const hasIcon = resource.fields.some((f) => f.key === "icon" && f.type === "icon");

  const move = (index, dir) => {
    if (!items) return;
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    reorder.mutate(next.map((it) => it.id));
  };

  const confirmDelete = () => {
    deleteMutation.mutate(deleteTarget.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-text-strong">{resource.navLabel}</h1>
        <Button size="sm" iconStart="plus" onClick={() => setFormState({ item: null })}>
          إضافة
        </Button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-text-muted">جارِ التحميل…</p>
      ) : (
        <div className="mt-6 flex flex-col bg-white">
          {items.map((item, i) => {
            const title = rowTitle(item, resource);
            return (
              <div key={item.id} className="flex items-center gap-4 border-b border-border-subtle px-5 py-4 last:border-0">
                {hasIcon && (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy text-green">
                    <Icon name={item.icon} size={18} />
                  </span>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-text-strong">{title.ar}</p>
                  {title.en && <p className="text-sm text-text-muted">{title.en}</p>}
                </div>
                <div className="flex items-center gap-1">
                  <IconButton name="chevron-up" label="تحريك للأعلى" onClick={() => move(i, -1)} className={i === 0 ? "opacity-30" : ""} />
                  <IconButton name="chevron-down" label="تحريك للأسفل" onClick={() => move(i, 1)} className={i === items.length - 1 ? "opacity-30" : ""} />
                  <IconButton name="edit" label="تعديل" onClick={() => setFormState({ item })} />
                  <IconButton name="trash" label="حذف" onClick={() => setDeleteTarget(item)} />
                </div>
              </div>
            );
          })}
          {items.length === 0 && <p className="px-5 py-8 text-center text-text-muted">لا توجد عناصر بعد</p>}
        </div>
      )}

      <CollectionFormDialog
        resource={resource}
        open={Boolean(formState)}
        item={formState?.item ?? null}
        refOptionsByKey={refOptionsByKey}
        onClose={() => setFormState(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="حذف العنصر"
        body={deleteTarget ? `هل أنت متأكد من حذف "${rowTitle(deleteTarget, resource).ar}"؟ لا يمكن التراجع عن هذا الإجراء.` : ""}
        confirmLabel="حذف"
        pending={deleteMutation.isPending}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
