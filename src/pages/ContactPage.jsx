import { SEO } from "../components/site/SEO.jsx";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, Button, Input, Select, Textarea } from "../design-system/index.js";
import { useSiteContent, useSubmitConsultationRequest } from "../api/hooks.js";
import { Photo } from "../components/site/Photo.jsx";
import { PageHead } from "../components/site/PageHead.jsx";
import { SectionHead } from "../components/site/SectionHead.jsx";
import { ClientWall } from "../components/site/ClientWall.jsx";

export function ContactPage() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", note: "" });
  const mutation = useSubmitConsultationRequest();
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const rows = [
    { icon: "map-pin", label: t("contact.rows.address"), value: content.contact.address },
    { icon: "phone", label: t("contact.rows.phone"), value: content.contact.phone },
    { icon: "message-circle", label: t("contact.rows.whatsapp"), value: content.contact.whatsapp },
    { icon: "mail", label: t("contact.rows.email"), value: content.contact.email },
    { icon: "clock", label: t("contact.rows.hours"), value: content.contact.hours },
  ];

  return (
    <main>
      <SEO title={t("contact.pageHead.title")} />

      <PageHead kicker={t("contact.pageHead.kicker")} title={t("contact.pageHead.title")} lead={t("contact.pageHead.lead")} image={pictures.pageHead.contact} />

      <section className="sec">
        <div className="wrap r-split grid items-start gap-[clamp(40px,5vw,80px)]" style={{ gridTemplateColumns: "1.15fr .85fr" }}>
          <div className="bg-sand" style={{ padding: "clamp(32px,4vw,52px)" }}>
            <SectionHead kicker={t("contact.form.kicker")} title={t("contact.form.title")} max={480} />
            {mutation.isSuccess ? (
              <div className="mt-8 border-t-2 border-copper bg-parchment px-[26px] py-7">
                <span className="flex h-[50px] w-[50px] items-center justify-center bg-navy text-green">
                  <Icon name="check-circle" size={26} />
                </span>
                <h4 className="h4 mt-[14px]">{t("contact.form.successTitle")}</h4>
                <p className="mt-2 text-[15px] leading-[1.85] text-text-muted">{t("contact.form.successBody")}</p>
                <div className="mt-5">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      mutation.reset();
                      setForm({ name: "", phone: "", email: "", service: "", note: "" });
                    }}
                  >
                    {t("contact.form.successRetry")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-5">
                <div className="r-g2 grid grid-cols-2 gap-5">
                  <Input label={t("common.fullName")} placeholder={t("common.fullNamePlaceholder")} value={form.name} onChange={set("name")} required />
                  <Input label={t("common.phone")} type="tel" placeholder={t("common.phonePlaceholder")} value={form.phone} onChange={set("phone")} required />
                </div>
                <Input label={t("common.email")} type="email" placeholder="name@company.com" value={form.email} onChange={set("email")} />
                <Select
                  label={t("common.service")}
                  options={content.services.map((s) => s.title)}
                  value={form.service}
                  onChange={set("service")}
                  placeholder={t("common.servicePlaceholder")}
                />
                <Textarea
                  label={t("contact.form.notesLabel")}
                  rows={5}
                  placeholder={t("contact.form.notesPlaceholder")}
                  value={form.note}
                  onChange={set("note")}
                  hint={t("contact.form.notesHint")}
                />
                <div>
                  <Button size="lg" iconEnd="arrow-left" disabled={mutation.isPending} onClick={() => mutation.mutate(form)}>
                    {mutation.isPending ? t("common.sending") : t("contact.form.submit")}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-navy text-text-on-dark" style={{ padding: "clamp(28px,3vw,40px)" }}>
              <h3 className="font-display text-[26px] font-bold text-text-on-dark">{t("contact.officeTitle")}</h3>
              <div className="mt-[26px] flex flex-col gap-[22px]">
                {rows.map((r, i) => (
                  <div key={i} className="flex items-start gap-[14px]">
                    <span className="mt-[3px] flex shrink-0 text-green-400">
                      <Icon name={r.icon} size={19} />
                    </span>
                    <div>
                      <div className="text-xs tracking-[.1em] text-[rgba(168,183,201,.85)]">{r.label}</div>
                      <div className={`mt-1 text-[15px] leading-[1.7] text-text-on-dark ${i > 0 && i < 4 ? "num" : ""}`}>{r.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-[30px] flex gap-[10px]">
                <Button size="sm" variant="whatsapp" iconStart="message-circle">
                  {t("contact.whatsappButton")}
                </Button>
                <Button size="sm" variant="onDark" iconStart="phone">
                  {t("contact.callButton")}
                </Button>
              </div>
            </div>
            <div className="mt-[6px]">
              <Photo src={pictures.hero[0]} ratio="4/3" zoom label="موقع المكتب — طريق الملك فهد" />
            </div>
            <p className="small mt-[14px]">{t("contact.parkingNote")}</p>
          </div>
        </div>
      </section>

      <ClientWall />
    </main>
  );
}
