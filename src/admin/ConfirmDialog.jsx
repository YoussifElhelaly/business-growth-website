import { Dialog, Button } from "../design-system/index.js";

export function ConfirmDialog({ open, title, body, confirmLabel = "تأكيد", pending, onConfirm, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      width={420}
      footer={
        <>
          <Button size="sm" variant="secondary" onClick={onConfirm} disabled={pending} className="!border-danger-600 !text-danger-600">
            {pending ? "جارِ الحذف…" : confirmLabel}
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose}>
            إلغاء
          </Button>
        </>
      }
    >
      <p className="text-sm leading-[1.85] text-text-muted">{body}</p>
    </Dialog>
  );
}
