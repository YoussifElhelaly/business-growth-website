import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, Button, Reveal } from "../design-system/index.js";
import { useSiteContent } from "../api/hooks.js";
import { Photo } from "../components/site/Photo.jsx";
import { PageHead } from "../components/site/PageHead.jsx";
import { SectionHead } from "../components/site/SectionHead.jsx";
import { CTABand } from "../components/site/CTABand.jsx";

export function BlogPage() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();
  const [cat, setCat] = useState("all");
  const all = content.articles.filter((a) => cat === "all" || a.category === cat);
  const [lead, ...rest] = all;

  return (
    <main>
      <PageHead kicker={t("blog.pageHead.kicker")} title={t("blog.pageHead.title")} lead={t("blog.pageHead.lead")} image={pictures.pageHead.blog} />

      <section className="sec-tight">
        <div className="wrap">
          <div className="flex flex-wrap gap-2 border-b border-sand-deep pb-[2px]">
            {content.blogCats.map((c) => {
              const on = c.id === cat;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className="relative cursor-pointer px-[18px] py-3 text-[15px] transition-colors duration-base"
                  style={{ fontWeight: on ? 600 : 400, color: on ? "var(--navy)" : "var(--text-muted)" }}
                >
                  {c.label}
                  <span
                    className="absolute inset-x-0 -bottom-[2px] h-[2px] origin-right bg-copper transition-transform duration-base ease-standard"
                    style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </button>
              );
            })}
          </div>

          {lead && (
            <Reveal className="mt-12">
              <a href="#" onClick={(e) => e.preventDefault()} className="r-split grid items-center gap-[clamp(32px,4vw,64px)] text-inherit" style={{ gridTemplateColumns: "1.25fr 1fr" }}>
                <Photo src={lead.image} ratio="16/10" zoom label={lead.cat} />
                <div>
                  <div className="flex gap-[14px] text-xs font-semibold tracking-[.08em] text-copper-dark">
                    <span>{lead.cat}</span>
                    <span className="font-normal text-text-subtle">{lead.date}</span>
                    <span className="font-normal text-text-subtle">{lead.readTime}</span>
                  </div>
                  <h3 className="h3 mt-[14px] text-[34px]">{lead.title}</h3>
                  <p className="mt-[14px] text-base leading-[1.9] text-text-muted">{lead.excerpt}</p>
                  <div className="mt-[26px] inline-flex items-center gap-[9px] text-sm font-semibold text-navy">
                    {t("blog.readArticle")}
                    <Icon name="arrow-left" size={17} />
                  </div>
                </div>
              </a>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="r-g3 mt-[72px] grid grid-cols-3 gap-8">
              {rest.map((a, i) => (
                <Reveal key={i} delay={i * 80}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="block text-inherit">
                    <Photo src={a.image} ratio="3/2" zoom label={a.cat} />
                    <div className="mt-[18px] flex gap-[14px] text-xs font-semibold tracking-[.08em] text-copper-dark">
                      <span>{a.cat}</span>
                      <span className="font-normal text-text-subtle">{a.date}</span>
                    </div>
                    <h4 className="mt-[10px] font-display text-[22px] font-bold leading-[1.4] text-text-strong">{a.title}</h4>
                    <p className="mt-[10px] text-sm leading-[1.8] text-text-muted">{a.excerpt}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sand-bg" style={{ paddingBlock: 80 }}>
        <div className="wrap flex flex-wrap items-center justify-between gap-10">
          <SectionHead kicker={t("blog.newsletter.kicker")} title={t("blog.newsletter.title")} max={520} />
          <Button variant="accent" size="lg" iconEnd="arrow-left" to="/contact">
            {t("blog.newsletter.cta")}
          </Button>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
