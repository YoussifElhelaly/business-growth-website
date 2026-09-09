import { useTranslation } from "react-i18next";
import { Button } from "../../design-system/index.js";
import { useSiteContent } from "../../api/hooks.js";
import { Photo } from "./Photo.jsx";

export function CTABand({ title, lead, cta }) {
  const { t } = useTranslation();
  const { pictures } = useSiteContent();

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <Photo src={pictures?.cta} fill label="صورة" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to left,rgba(8,24,38,.94),rgba(8,24,38,.7))" }}
      />
      <div className="wrap on-dark relative flex flex-wrap items-center justify-between gap-12" style={{ paddingBlock: 96 }}>
        <div className="max-w-[600px]">
          <h2 className="d2 text-text-on-dark">{title || t("home.cta.title")}</h2>
          <p className="lead mt-4">{lead || t("home.cta.lead")}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Button size="lg" variant="accent" iconEnd="arrow-left" to="/contact">
            {cta || t("home.cta.cta")}
          </Button>
          <Button size="lg" variant="whatsapp" iconStart="message-circle">
            {t("home.cta.whatsapp")}
          </Button>
        </div>
      </div>
    </section>
  );
}
