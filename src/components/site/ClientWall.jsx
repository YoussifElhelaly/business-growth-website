import { useTranslation } from "react-i18next";
import { Icon, Marquee } from "../../design-system/index.js";
import { useSiteContent } from "../../api/hooks.js";
import { SectionHead } from "./SectionHead.jsx";

export function ClientWall() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  if (!content) return null;

  return (
    <section className="navy-bg sec-tight">
      <div className="wrap">
        <div className="r-stack flex flex-wrap items-end justify-between gap-10">
          <SectionHead kicker={t("home.clientWall.kicker")} title={t("home.clientWall.title")} onDark max={520} />
          <div className="text-start">
            <div className="flex items-baseline gap-2">
              <span className="num font-display text-[56px] font-bold leading-none text-green-400">4.7</span>
              <span className="text-sm text-text-on-dark-muted">{t("home.clientWall.ratingSuffix")}</span>
            </div>
            <div className="mt-2 flex gap-1 text-copper">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" size={16} />
              ))}
            </div>
          </div>
        </div>
        <div className="r-g5 mt-11 grid grid-cols-5 gap-px bg-white/10">
          {content.clients.map((c, i) => (
            <div key={i} className="plate">
              {c}
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Marquee items={content.sectors.map((s) => s.label)} onDark speed={34} />
        </div>
      </div>
    </section>
  );
}
