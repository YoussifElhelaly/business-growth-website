import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Button, Input, Textarea } from "../design-system/index.js";
import { useSubmitConsultationRequest } from "../api/hooks.js";
import { closeRequestDialog } from "../app/uiSlice.js";

export function RequestDialog() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const service = useSelector((s) => s.ui.requestDialogService);
  const open = service !== null;
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const mutation = useSubmitConsultationRequest();

  const close = () => {
    dispatch(closeRequestDialog());
  };

  useEffect(() => {
    if (!open) {
      setForm({ name: "", phone: "", note: "" });
      mutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    mutation.mutate(
      { ...form, service },
      {
        onSuccess: () => {
          setTimeout(close, 1200);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      title={t("common.requestServiceDialogTitle", { service })}
      footer={
        mutation.isSuccess ? null : (
          <>
            <Button size="sm" onClick={submit} disabled={mutation.isPending}>
              {mutation.isPending ? t("common.sending") : t("common.sendRequest")}
            </Button>
            <Button size="sm" variant="ghost" onClick={close}>
              {t("common.cancel")}
            </Button>
          </>
        )
      }
    >
      {mutation.isSuccess ? (
        <p className="text-sm leading-[1.85] text-text-muted">{t("common.requestReceivedBody")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          <Input label={t("common.fullName")} placeholder={t("common.fullNamePlaceholder")} value={form.name} onChange={set("name")} required />
          <Input label={t("common.phone")} type="tel" placeholder={t("common.phonePlaceholder")} value={form.phone} onChange={set("phone")} required />
          <Textarea label={t("common.requestDetails")} rows={3} placeholder={t("common.requestDetailsPlaceholder")} value={form.note} onChange={set("note")} />
        </div>
      )}
    </Dialog>
  );
}
