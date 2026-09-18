import { SEO } from "../components/site/SEO.jsx";

import { useState } from "react";
import { Link } from "react-router-dom";
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
      <SEO title={t("blog.pageHead.title")} />

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
              <Link to={`/blog/${lead.id}`} className="r-split grid items-center gap-[clamp(32px,4vw,64px)] text-inherit" style={{ gridTemplateColumns: "1.25fr 1fr" }}>
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
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="r-g3 mt-[72px] grid grid-cols-3 gap-[26px]">
              {rest.map((a, i) => (
                <Reveal key={i} delay={i * 80} className="h-full">
                  <Link to={`/blog/${a.id}`} className="group flex h-full flex-col border border-border-subtle bg-parchment text-inherit transition-all duration-300 hover:-translate-y-[5px] hover:border-copper hover:shadow-[0_16px_34px_-20px_rgba(35,41,58,.4)]">
                    <Photo src={a.image} ratio="3/2" zoom label={a.cat} className="[filter:grayscale(.35)] transition-[filter] duration-[400ms] ease-out group-hover:grayscale-0" />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex gap-[14px] text-xs font-bold text-copper">
                        <span>{a.cat}</span>
                        <span className="font-normal text-text-muted">{a.date}</span>
                      </div>
                      <h4 className="mt-[10px] font-display text-[18.5px] font-bold leading-[1.5] text-text-strong transition-colors duration-300 group-hover:text-copper">{a.title}</h4>
                      <p className="mt-[10px] text-[14.5px] leading-[1.8] text-text-muted">{a.excerpt}</p>
                      <span className="mt-auto flex items-center gap-2 pt-2 text-sm font-bold text-copper transition-[gap] duration-300 group-hover:gap-[13px]">
                        {t("blog.readArticle")}
                        <Icon name="arrow-left" size={16} />
                      </span>
                    </div>
                  </Link>
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
