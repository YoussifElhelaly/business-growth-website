import { useTranslation } from "react-i18next";
import { Icon, Button, Reveal } from "../design-system/index.js";
import { useSiteContent } from "../api/hooks.js";
import { Photo } from "../components/site/Photo.jsx";
import { PageHead } from "../components/site/PageHead.jsx";
import { SectionHead } from "../components/site/SectionHead.jsx";
import { StatStrip } from "../components/site/StatStrip.jsx";
import { ClientWall } from "../components/site/ClientWall.jsx";
import { Gallery } from "../components/site/Gallery.jsx";
import { CTABand } from "../components/site/CTABand.jsx";

export function AboutPage() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();

  return (
    <main>
      <PageHead
        kicker={t("about.pageHead.kicker")}
        title={t("about.pageHead.title")}
        lead={t("about.pageHead.lead")}
        image={pictures.pageHead.about}
      />

      <section className="sec">
        <div className="wrap r-split grid items-center gap-[clamp(40px,6vw,96px)]" style={{ gridTemplateColumns: "1.05fr 1fr" }}>
          <div>
            <SectionHead kicker={t("about.story.kicker")} title={t("about.story.title")} lead={t("about.story.lead")} />
            <p className="mt-[22px] text-base leading-[1.9] text-text-muted">{t("about.story.paragraph")}</p>
            <div className="mt-[34px] flex flex-wrap gap-[14px]">
              <Button iconEnd="arrow-left" to="/contact">
                {t("about.story.ctaPrimary")}
              </Button>
              <Button variant="secondary" to="/services">
                {t("about.story.ctaSecondary")}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Photo src={pictures.about[1]} ratio="4/3" zoom label="اجتماع" />
            <div className="r-g2 mt-[6px] grid grid-cols-2 gap-[6px]">
              <Photo src={content.officeCaptions[1]?.image} ratio="1/1" zoom label="المكتب" />
              <Photo src={content.officeCaptions[4]?.image} ratio="1/1" zoom label="الفريق" />
            </div>
          </div>
        </div>
      </section>

      <StatStrip items={content.stats} overlap={false} />

      <section className="sec">
        <div className="wrap">
          <SectionHead kicker={t("about.values.kicker")} title={t("about.values.title")} max={520} />
          <div className="r-g4 mt-12 grid grid-cols-4 gap-px bg-sand-deep">
            {content.values.map((v, i) => (
              <Reveal key={i} delay={i * 90} className="bg-parchment px-[30px] py-9">
                <span className="flex h-[50px] w-[50px] items-center justify-center bg-navy text-green">
                  <Icon name={v.icon} size={24} />
                </span>
                <h4 className="mt-[18px] font-display text-[22px] font-bold text-text-strong">{v.title}</h4>
                <p className="mt-2 text-sm leading-[1.8] text-text-muted">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sand-bg" style={{ paddingBlock: 96 }}>
        <div className="wrap">
          <SectionHead kicker={t("about.team.kicker")} title={t("about.team.title")} lead={t("about.team.lead")} max={600} />
          <div className="r-g4 mt-[52px] grid grid-cols-4 gap-[26px]">
            {content.team.map((m, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="relative">
                  <Photo src={m.photo} ratio="3/4" zoom label={m.name} />
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-copper" />
                </div>
                <h4 className="mt-[18px] font-display text-[21px] font-bold text-text-strong">{m.name}</h4>
                <p className="mt-1 text-sm font-semibold text-copper-dark">{m.role}</p>
                <p className="mt-[6px] text-[13px] leading-[1.7] text-text-subtle">{m.credentials}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClientWall />
      <Gallery items={content.officeCaptions} />
      <CTABand />
    </main>
  );
}
