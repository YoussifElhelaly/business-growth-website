import { useTranslation } from "react-i18next";
import { Icon } from "../../design-system/index.js";
import { useSiteContent } from "../../api/hooks.js";

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="mb-[18px] font-display text-lg font-bold text-text-on-dark">{title}</h4>
      <ul className="flex list-none flex-col gap-[11px]">
        {items.map((x, i) => (
          <li key={i} className="text-sm leading-[1.7] text-text-on-dark-muted">
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

  return (
    <footer className="navy-bg">
      <div className="wrap r-fcols grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-14" style={{ paddingBlock: "76px 0" }}>
        <div>
          <div className="font-display text-[26px] font-bold text-text-on-dark">{content.brand.name}</div>
          <p className="mt-[14px] max-w-[320px] text-sm leading-[1.85] text-text-on-dark-muted">
            {content.brand.tagline}
          </p>
          <div className="mt-[22px] flex gap-[10px]">
            {["linkedin", "twitter", "instagram", "youtube"].map((n) => (
              <a
                key={n}
                href="#"
                aria-label={n}
                className="flex h-[38px] w-[38px] items-center justify-center border border-white/20 text-text-on-dark-muted"
              >
                <Icon name={n} size={16} />
              </a>
            ))}
          </div>
        </div>
        <FooterColumn title={t("footer.servicesTitle")} items={content.services.slice(0, 5).map((s) => s.title)} />
        <FooterColumn title={t("footer.companyTitle")} items={companyLinks} />
        <FooterColumn
          title={t("footer.contactTitle")}
          items={[content.contact.address, content.contact.phone, content.contact.email, content.contact.hours]}
        />
      </div>
      <div
        className="wrap mt-[60px] flex flex-wrap justify-between gap-5 border-t border-white/[.14] py-[22px] text-[13px] text-[rgba(168,183,201,.8)]"
      >
        <span>© 2026 {content.brand.name}. {t("footer.rights")}</span>
        <span>{t("footer.crLine")}</span>
      </div>
    </footer>
  );
}
