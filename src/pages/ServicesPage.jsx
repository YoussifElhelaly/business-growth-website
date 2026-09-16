import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Icon, Button, Reveal } from "../design-system/index.js";
import { useSiteContent } from "../api/hooks.js";
import { openRequestDialog } from "../app/uiSlice.js";
import { Photo } from "../components/site/Photo.jsx";
import { PageHead } from "../components/site/PageHead.jsx";
import { SectionHead } from "../components/site/SectionHead.jsx";
import { CTABand } from "../components/site/CTABand.jsx";

function ServiceRow({ s, i }) {
  const { t } = useTranslation();
  const flip = i % 2 === 1;
  return (
    <Reveal>
      <div className="r-srow grid items-stretch" style={{ gridTemplateColumns: "1fr 1fr", background: i % 2 ? "var(--sand)" : "var(--parchment)" }}>
        <div className="relative min-h-[400px]" style={{ order: flip ? 2 : 1 }}>
          <Photo src={s.image} fill zoom label={s.title} />
          <span className="absolute start-0 top-0 bg-navy px-[22px] py-3 font-display text-[26px] font-bold leading-none text-green">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-col justify-center" style={{ order: flip ? 1 : 2, padding: "64px clamp(32px,5vw,88px)" }}>
          <div className="flex items-center gap-[14px]">
            <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center bg-navy text-green">
              <Icon name={s.icon} size={22} />
            </span>
            <span className="text-xs font-bold tracking-[.14em] text-green-deep">{t("services.row.badge")}</span>
          </div>
          <h3 className="h3 mt-[14px]">{s.title}</h3>
          <p className="mt-[14px] max-w-[440px] text-base leading-[1.9] text-text-muted">{s.description}</p>
          <ul className="r-g2s mt-6 grid list-none grid-cols-2" style={{ gap: "10px 20px" }}>
            {s.items.map((it, n) => (
              <li key={n} className="flex items-start gap-[9px] text-sm text-text-body">
                <span className="mt-1 shrink-0 text-green-deep">
                  <Icon name="check" size={15} />
                </span>
                {it}
              </li>
            ))}
          </ul>
          <div className="mt-[30px]">
            <Button variant="secondary" size="sm" iconEnd="arrow-left" to="/contact">
              {t("common.requestService")}
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function ServicesPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, pictures } = useSiteContent();

  return (
    <main>
      <PageHead
        kicker={t("services.pageHead.kicker")}
        title={t("services.pageHead.title")}
        lead={t("services.pageHead.lead")}
        image={pictures.pageHead.services}
      />

      <section className="sec-tight">
        <div className="wrap r-g6 grid grid-cols-6 gap-px bg-sand-deep">
          {content.services.map((s, i) => (
            <button
              key={i}
              onClick={() => dispatch(openRequestDialog(s.title))}
              className="cursor-pointer bg-parchment px-[18px] py-[26px] text-start transition-colors duration-base hover:bg-sand"
            >
              <span className="flex h-11 w-11 items-center justify-center bg-navy text-green">
                <Icon name={s.icon} size={21} />
              </span>
              <span className="mt-[14px] block text-[15px] font-semibold leading-[1.5] text-text-strong">{s.title}</span>
            </button>
          ))}
        </div>
      </section>

      {content.services.map((s, i) => (
        <ServiceRow key={i} s={s} i={i} />
      ))}

      <section className="navy-bg sec">
        <div className="wrap">
          <SectionHead kicker={t("services.sectors.kicker")} title={t("services.sectors.title")} onDark max={540} />
          <div className="r-g6 mt-12 grid grid-cols-6 gap-px bg-white/10">
            {content.sectors.map((x, i) => (
              <div key={i} className="flex flex-col gap-[14px] bg-navy px-[22px] py-[30px]">
                <span className="flex text-green-400">
                  <Icon name={x.icon} size={24} />
                </span>
                <span className="text-[15px] font-medium text-text-on-dark">{x.label}</span>
              </div>
            ))}
          </div>
          <div className="r-g4 mt-14 grid grid-cols-4 gap-8">
            {content.steps.map((st, i) => (
              <div key={i} className="border-t border-white/20 pt-5">
                <span className="num font-display text-[30px] font-bold text-copper">{st.number}</span>
                <h4 className="h4 mt-[10px] text-text-on-dark">{st.title}</h4>
                <p className="mt-2 text-sm leading-[1.8] text-text-on-dark-muted">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap r-split grid items-center gap-[clamp(40px,6vw,88px)]" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Photo src={content.officeCaptions[2]?.image} ratio="4/3" zoom label="اجتماع عمل" />
          <div>
            <SectionHead kicker={t("services.fees.kicker")} title={t("services.fees.title")} />
            <ul className="mt-7 flex list-none flex-col gap-[18px]">
              {t("services.fees.points", { returnObjects: true }).map((pt, i) => (
                <li key={i} className="flex gap-3 text-base leading-[1.85] text-text-body">
                  <span className="mt-[6px] shrink-0 text-copper">
                    <Icon name="check" size={17} />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button iconEnd="arrow-left" onClick={() => navigate("/contact")}>
                {t("services.fees.cta")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </main>
  );
}
