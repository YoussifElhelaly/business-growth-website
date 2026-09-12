import { useTranslation } from "react-i18next";
import { useSiteContent } from "../../api/hooks.js";
import { BrandMark } from "../../design-system/index.js";

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="mb-[14px] font-display text-[15px] font-bold text-text-strong">{title}</h4>
      <ul className="flex list-none flex-col gap-[11px] p-0">
        {items.map((x, i) => (
          <li key={i} className="text-sm leading-[1.7] text-text-muted">
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  if (!content) return null;

  const companyLinks = t("footer.companyLinks", { returnObjects: true });
  const credits = t("footer.credits", { returnObjects: true });

  return (
    <footer className="sand-bg text-[14px] text-text-muted">
      <div
        className="wrap r-fcols grid grid-cols-[1.1fr_1fr_1fr_1fr] gap-10 border-b border-sand-deep"
        style={{ paddingBlock: "56px 38px" }}
      >
        <div>
          <div className="flex items-center gap-3">
            <BrandMark size={38} className="text-copper" />
            <div className="font-display text-[22px] font-bold text-text-strong">{content.brand.name}</div>
          </div>
          <p className="mt-[14px] max-w-[300px] text-sm leading-[1.85] text-text-muted">{content.brand.tagline}</p>
        </div>
        <FooterColumn title={t("footer.servicesTitle")} items={content.services.slice(0, 4).map((s) => s.title)} />
        <FooterColumn title={t("footer.companyTitle")} items={companyLinks} />
        <FooterColumn
          title={t("footer.contactTitle")}
          items={[content.contact.phone, content.contact.email, t("footer.shortAddress"), content.contact.hours]}
        />
      </div>
      <div className="wrap flex flex-wrap gap-x-8 gap-y-2 text-[13px]" style={{ paddingBlock: "20px 0" }}>
        {credits.map((c, i) => (
          <div key={i}>
            {c.label} <b className="num font-display font-bold text-text-strong">{c.value}</b>
          </div>
        ))}
      </div>
      <div className="wrap mt-6 flex flex-wrap justify-between gap-4 border-t border-sand-deep py-[22px] text-[13px] text-text-subtle">
        <span>
          © 2026 {content.brand.name} — {t("footer.rights")}
        </span>
        <span className="flex gap-2">
          <a href="#" className="border-b border-border-subtle text-text-subtle">
            {t("footer.privacy")}
          </a>
          ·
          <a href="#" className="border-b border-border-subtle text-text-subtle">
            {t("footer.terms")}
          </a>
        </span>
      </div>
    </footer>
  );
}
