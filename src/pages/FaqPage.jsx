import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../design-system/index.js";
import { useSiteContent } from "../api/hooks.js";
import { PageHead } from "../components/site/PageHead.jsx";
import { CTABand } from "../components/site/CTABand.jsx";
import { FaqAccordion } from "../components/site/FaqAccordion.jsx";

export function FaqPage() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();
  const [cat, setCat] = useState("all");
  const list = content.faqs.filter((f) => cat === "all" || f.category === cat);

  return (
    <main>
      <PageHead kicker={t("faq.pageHead.kicker")} title={t("faq.pageHead.title")} lead={t("faq.pageHead.lead")} image={pictures.pageHead.faq} />

      <section className="sec">
        <div className="wrap r-faq grid items-start gap-[clamp(36px,5vw,72px)]" style={{ gridTemplateColumns: "280px 1fr" }}>
          <aside className="sticky top-[130px]">
            <span className="eyebrow">{t("faq.categoriesTitle")}</span>
            <div className="mt-[18px] flex flex-col">
              {content.faqCats.map((c) => {
                const on = c.id === cat;
                return (
                  <button
                    key={c.id}
                    onClick={() => setCat(c.id)}
                    className="cursor-pointer rounded-md px-4 py-[13px] text-start text-[15px] transition-all duration-base"
                    style={{
                      fontWeight: on ? 600 : 400,
                      color: on ? "var(--navy)" : "var(--text-muted)",
                      background: on ? "var(--sand)" : "transparent",
                      borderInlineStart: `2px solid ${on ? "var(--copper)" : "var(--sand-deep)"}`,
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 rounded-lg bg-navy px-6 py-[26px] text-text-on-dark">
              <h4 className="font-display text-xl font-bold">{t("faq.askBox.title")}</h4>
              <p className="mt-[10px] text-sm leading-[1.8] text-text-on-dark-muted">{t("faq.askBox.lead")}</p>
              <div className="mt-[18px]">
                <Button size="sm" variant="accent" fullWidth to="/contact">
                  {t("faq.askBox.cta")}
                </Button>
              </div>
            </div>
          </aside>
          <div>
            <p className="small mb-5">{t("faq.resultCount", { count: list.length })}</p>
            <FaqAccordion items={list} />
          </div>
        </div>
      </section>

      <CTABand title={t("faq.cta.title")} lead={t("faq.cta.lead")} cta={t("faq.cta.cta")} />
    </main>
  );
}
