import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TypeAnimation } from "react-type-animation";
import { Icon, Button, Input, Select, Textarea, Reveal, CountUp } from "../design-system/index.js";
import { useSiteContent, useSubmitConsultationRequest } from "../api/hooks.js";
import { Photo } from "../components/site/Photo.jsx";
import { HeroStage } from "../components/site/HeroStage.jsx";
import { SectionHead } from "../components/site/SectionHead.jsx";
import { ClientWall } from "../components/site/ClientWall.jsx";
import { CTABand } from "../components/site/CTABand.jsx";
import { FaqAccordion } from "../components/site/FaqAccordion.jsx";

function HomeContact() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", note: "" });
  const mutation = useSubmitConsultationRequest();
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const rows = [
    { icon: "phone", label: t("home.contactSection.rows.call"), value: content.contact.phone },
    { icon: "mail", label: t("home.contactSection.rows.email"), value: content.contact.email },
    { icon: "map-pin", label: t("home.contactSection.rows.location"), value: content.contact.address },
    { icon: "clock", label: t("home.contactSection.rows.hours"), value: content.contact.hours },
  ];

  return (
    <section className="sec bg-sand">
      <div className="wrap">
        <span className="eyebrow">{t("home.contactSection.kicker")}</span>
        <h2 className="h2 mt-4">{t("home.contactSection.title")}</h2>
        <div
          className="r-split mt-11 grid items-stretch overflow-hidden shadow-[0_30px_70px_-40px_rgba(23,28,40,.45)]"
          style={{ gridTemplateColumns: ".85fr 1.15fr" }}
        >
          <div
            className="text-text-on-dark"
            style={{ padding: "clamp(30px,3vw,42px)", background: "linear-gradient(215deg, var(--signup-2) 0%, var(--signup) 55%, #5e2d12 100%)" }}
          >
            <h3 className="font-display text-2xl font-bold text-text-on-dark">{t("home.contactSection.infoTitle")}</h3>
            <div className="mt-7 flex flex-col gap-[22px]">
              {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-[14px]">
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center bg-[rgba(255,217,168,.18)] text-[#ffd9a8]">
                    <Icon name={r.icon} size={18} />
                  </span>
                  <div>
                    <div className="text-xs tracking-[.08em] text-[rgba(240,221,204,.9)]">{r.label}</div>
                    <div className={`mt-[5px] text-[15px] leading-[1.7] text-text-on-dark ${i < 2 ? "num" : ""}`}>{r.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border border-white/25 bg-white/10 px-6 py-5 text-[15px] leading-[1.8] text-white">
              <b className="mb-1 block font-bold text-[#ffd9a8]">{t("home.contactSection.askTitle")}</b>
              {t("home.contactSection.askBody")}
            </div>
            <div className="mt-6 overflow-hidden border border-white/[.16]">
              <iframe
                title="موقع المكتب"
                loading="lazy"
                className="block h-[180px] w-full border-0"
                src="https://www.google.com/maps?q=King+Fahd+Road+Al+Olaya+Riyadh&hl=ar&output=embed"
              />
            </div>
            <div className="mt-6 flex gap-[10px]">
              {["instagram", "linkedin", "twitter"].map((n) => (
                <a
                  key={n}
                  href="#"
                  aria-label={n}
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-pill border border-white/20 text-text-on-dark-muted"
                >
                  <Icon name={n} size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="bg-parchment" style={{ padding: "clamp(30px,3vw,44px)" }}>
            <h3 className="font-display text-2xl font-bold text-text-strong">{t("home.contactSection.formTitle")}</h3>
            <p className="mt-[10px] text-[15px] leading-[1.8] text-text-muted">{t("home.contactSection.formLead")}</p>
            {mutation.isSuccess ? (
              <div className="mt-7 border-t-2 border-green bg-sand px-6 py-[26px]">
                <h4 className="h4">{t("common.requestReceivedTitle")}</h4>
                <p className="mt-2 text-[15px] leading-[1.85] text-text-muted">{t("common.requestReceivedBody")}</p>
                <div className="mt-[18px]">
                  <Button size="sm" variant="secondary" onClick={() => mutation.reset()}>
                    {t("common.sendAnotherRequest")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-[26px] flex flex-col gap-[18px]">
                <div className="r-g2 grid grid-cols-2 gap-[18px]">
                  <Input label={t("common.fullName")} placeholder={t("common.fullNamePlaceholder")} value={form.name} onChange={set("name")} required />
                  <Input label={t("common.phone")} type="tel" placeholder={t("common.phonePlaceholder")} value={form.phone} onChange={set("phone")} required />
                </div>
                <div className="r-g2 grid grid-cols-2 gap-[18px]">
                  <Input label={t("common.email")} type="email" placeholder={t("common.emailPlaceholder")} value={form.email} onChange={set("email")} />
                  <Select
                    label={t("common.service")}
                    options={content.services.map((s) => s.title)}
                    value={form.service}
                    onChange={set("service")}
                    placeholder={t("common.servicePlaceholder")}
                  />
                </div>
                <Textarea label={t("common.notes")} rows={4} placeholder={t("common.notesPlaceholder")} value={form.note} onChange={set("note")} />
                <Button size="lg" variant="accent" fullWidth disabled={mutation.isPending} onClick={() => mutation.mutate(form)}>
                  {mutation.isPending ? t("common.sending") : t("home.contactSection.submit")}
                </Button>
                <p className="small text-center">{t("home.contactSection.disclaimer")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ value }) {
  const match = String(value).match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return value;
  const [, prefix, numStr, suffix] = match;
  return (
    <>
      {prefix}
      <CountUp to={parseInt(numStr, 10)} duration={2} />
      {suffix}
    </>
  );
}

function HomePillars() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  return (
    <section className="relative z-[6] -mt-14">
      <div className="wrap">
        <span className="sr-only">{t("home.pillars.title")}</span>
        <div className="r-g3 grid grid-cols-3 gap-[26px]">
          {content.pillars.map((p, i) => (
            <Reveal key={i} delay={i * 90} className="bg-navy text-text-on-dark" style={{ padding: "40px 34px 36px" }}>
              <span className="flex h-[56px] w-[56px] items-center justify-center border border-white/15 bg-white/10 text-green">
                <Icon name={p.icon} size={25} />
              </span>
              <h3 className="mt-[22px] font-display text-lg font-bold text-text-on-dark">{p.title}</h3>
              <p className="mt-[10px] text-sm leading-[1.8] text-text-on-dark-muted">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeClientLogos() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  return (
    <section className="border-b border-border-subtle bg-parchment" style={{ paddingBlock: 52 }}>
      <div className="wrap">
        <p className="mb-8 text-center text-sm font-normal tracking-[.02em] text-text-muted">{t("home.logos.lead")}</p>
        <div className="r-g5 grid grid-cols-5 gap-px border border-border-subtle bg-border-subtle">
          {content.clients.slice(0, 5).map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-center bg-parchment px-4 py-4 text-center font-display text-[15px] font-bold text-text-subtle opacity-60 grayscale transition-[opacity,filter,color] duration-[350ms] ease-out hover:text-text-strong hover:opacity-100 hover:grayscale-0"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeAudience() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead kicker={t("home.audience.kicker")} title={t("home.audience.title")} lead={t("home.audience.lead")} max={680} />
        <div className="r-g4 mt-12 grid grid-cols-4 gap-6">
          {content.audience.map((a, i) => (
            <Reveal key={i} delay={i * 80} className="h-full">
              <div className="group h-full overflow-hidden border border-border-subtle bg-parchment transition-all duration-300 hover:-translate-y-[5px] hover:border-copper hover:shadow-[0_14px_30px_-18px_rgba(35,41,58,.42)]">
                <Photo
                  src={pictures.audience[i]}
                  ratio="4/3"
                  label={a.title}
                  className="[filter:grayscale(.42)_contrast(1.04)] transition-[transform,filter] duration-500 ease-[cubic-bezier(.2,.7,.3,1)] group-hover:scale-[1.07] group-hover:[filter:grayscale(.12)_contrast(1.05)]"
                />
                <div className="px-6 py-7">
                  <span className="flex h-11 w-11 items-center justify-center border border-border-subtle text-copper transition-colors duration-300 group-hover:border-copper">
                    <Icon name={a.icon} size={20} />
                  </span>
                  <h3 className="mt-[14px] font-display text-[17px] font-bold text-text-strong">{a.title}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-text-muted">{a.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeRisk() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();
  return (
    <section className="sec relative overflow-hidden" style={{ background: "var(--navy-deep)" }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${pictures.risk})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.14,
        }}
      />
      <div className="wrap on-dark relative z-[2]">
        <SectionHead kicker={t("home.risk.kicker")} title={t("home.risk.title")} lead={t("home.risk.lead")} onDark max={640} />
        <div className="r-g4 mt-14 grid grid-cols-4 gap-px bg-white/10">
          {content.risk.items.map((r, i) => (
            <Reveal key={i} delay={i * 55} className="px-7 py-8" style={{ background: "var(--navy-deep)" }}>
              <h4 className="font-display text-base font-bold text-text-on-dark">{r.title}</h4>
              <p className="mt-2 text-sm leading-[1.75] text-text-on-dark-muted">{r.description}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-11 border-s-[3px] border-green ps-6 text-lg font-medium text-text-on-dark">{content.risk.note}</div>
      </div>
    </section>
  );
}

function HomeJourney() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  return (
    <section className="sand-bg" style={{ paddingBlock: "96px" }}>
      <div className="wrap">
        <SectionHead kicker={t("home.journey.kicker")} title={t("home.journey.title")} lead={t("home.journey.lead")} align="center" max={560} className="mx-auto" />
        <div className="r-g6 relative mt-16 grid grid-cols-6 gap-6 text-center">
          <div className="absolute inset-x-[8%] top-[17px] hidden h-px bg-sand-deep md:block" />
          {content.journey.map((j, i) => {
            const last = i === content.journey.length - 1;
            return (
              <Reveal key={i} delay={i * 70} className="relative">
                <div
                  className="relative z-[2] mx-auto flex h-[34px] w-[34px] items-center justify-center border font-display text-[13px] font-bold"
                  style={{
                    background: last ? "var(--navy)" : "var(--parchment)",
                    borderColor: last ? "var(--navy)" : "var(--sand-deep)",
                    color: last ? "#fff" : "var(--text-strong)",
                  }}
                >
                  {i + 1}
                </div>
                <b className="mt-4 block font-display text-[15.5px] font-bold text-text-strong">{j.title}</b>
                <span className="mt-1 block text-[13px] leading-[1.6] text-text-muted">{j.description}</span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HomeServiceCard({ s, i }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Reveal delay={i * 70}>
      <div className="group flex h-full flex-col border border-border-subtle bg-parchment transition-all duration-500 hover:-translate-y-1 hover:border-copper hover:shadow-[0_20px_40px_-18px_rgba(35,41,58,.25)]">
        <div className="relative">
          <Photo src={s.image} ratio="4/3" zoom label={s.title} />
          <span
            className="absolute inset-x-0 bottom-0 px-6 pb-4 pt-12 font-display text-lg font-bold leading-[1.3] text-white"
            style={{ background: "linear-gradient(0deg, rgba(23,28,40,.86), transparent)" }}
          >
            {s.title}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="flex shrink-0 text-copper">
              <Icon name={s.icon} size={20} />
            </span>
            <span className="text-[13px] font-semibold leading-[1.5] text-text-muted">{s.tag}</span>
          </div>
          <ul className="mt-4 flex flex-col gap-[9px]">
            {s.items.map((it, n) => (
              <li key={n} className="flex items-start gap-2 border-b border-border-subtle pb-[9px] text-sm text-text-body last:border-0 last:pb-0">
                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 bg-copper" />
                {it}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border-subtle pt-4 text-[13.5px] italic leading-[1.75] text-text-muted">{s.outcome}</p>
          <button
            onClick={() => navigate("/services")}
            className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-copper-dark transition-[gap] duration-300 group-hover:gap-3"
          >
            {t("home.services.detailsCta")} <Icon name="arrow-left" size={16} />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

function HomeSegs() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead kicker={t("home.segs.kicker")} title={t("home.segs.title")} max={560} />
        <div className="r-g3 mt-12 grid grid-cols-3 gap-6">
          {content.segs.map((s, i) => (
            <Reveal key={i} delay={i * 90} className="relative flex min-h-[400px] items-end overflow-hidden">
              <Photo src={pictures.segs[i]} fill zoom />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(23,28,40,.95) 8%, rgba(23,28,40,.35) 100%)" }} />
              <div className="relative z-[2] px-7 py-8 text-text-on-dark">
                <h3 className="font-display text-xl font-bold text-text-on-dark">{s.title}</h3>
                <div className="mt-[10px] text-sm font-semibold text-green">{s.subtitle}</div>
                <p className="mt-3 text-[14.5px] leading-[1.8] text-text-on-dark-muted">{s.description}</p>
                <Link to="/contact" className="mt-4 inline-flex border-b border-green pb-[3px] text-sm font-bold text-white">
                  {s.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeOffice() {
  const { t } = useTranslation();
  const { pictures } = useSiteContent();
  const labels = t("home.gallery.labels", { returnObjects: true });
  const items = [
    { photo: pictures.gallery[0], caption: labels[0], span: 2, height: 340 },
    { photo: pictures.gallery[1], caption: labels[1], span: 1, height: 240 },
    { photo: pictures.gallery[2], caption: labels[2], span: 1, height: 240 },
    { photo: pictures.gallery[3], caption: labels[3], span: 2, height: 340 },
  ];
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead kicker={t("home.gallery.kicker")} title={t("home.gallery.title")} lead={t("home.gallery.lead")} max={620} />
        <div className="r-g4 mt-12 grid grid-cols-4 gap-6">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 90} style={{ gridColumn: `span ${it.span}` }}>
              <div className="group relative overflow-hidden transition-shadow duration-500 hover:shadow-[0_24px_50px_-20px_rgba(35,41,58,.35)]">
                <Photo
                  src={it.photo}
                  label={it.caption}
                  style={{ height: it.height }}
                  className="[filter:grayscale(.35)_contrast(1.02)] transition-[transform,filter] duration-[650ms] ease-[cubic-bezier(.2,.7,.3,1)] group-hover:scale-[1.06] group-hover:[filter:grayscale(0)_contrast(1.04)]"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 p-5"
                  style={{ background: "linear-gradient(0deg, rgba(23,28,40,.8) 0%, rgba(23,28,40,0) 100%)" }}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-copper font-display text-[12px] font-bold text-white transition-transform duration-500 ease-out group-hover:scale-110">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[16px] font-bold text-white">{it.caption}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeFaq() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  const faqs = content.faqs.slice(0, 8);

  return (
    <section className="sec bg-sand">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <SectionHead kicker={t("home.faq.kicker")} title={t("home.faq.title")} max={520} />
          <Button variant="secondary" size="sm" iconEnd="arrow-left" to="/faq">
            {t("home.faq.cta")}
          </Button>
        </div>
        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const { t } = useTranslation();
  const { content, pictures } = useSiteContent();

  return (
    <main>
      <HeroStage images={pictures.hero}>
        <div className="max-w-[760px]">
          <span className="eyebrow on-dark">{t("home.hero.kicker")}</span>
          <h1 className="d1 mt-5 text-text-on-dark min-h-[140px]">
            <TypeAnimation
              sequence={[
                `${t("home.hero.titleLine1")}\n${t("home.hero.titleLine2")}`,
                1000,
              ]}
              wrapper="div"
              speed={50}
              className="text-[60px] leading-[1.1] whitespace-pre-line"
              repeat={0}
            />
          </h1>
          <p className="lead mt-[22px] max-w-[560px] text-white/[.86]">{t("home.hero.lead")}</p>
          <div className="mt-[34px] flex flex-wrap gap-[14px]">
            <Button size="lg" variant="accent" iconEnd="arrow-left" to="/contact" className="h-[57px] gap-[10px] border-0 leading-none">
              {t("home.hero.ctaPrimary")}
            </Button>
            <Button size="lg" variant="onDark" to="/services">
              {t("home.hero.ctaSecondary")}
            </Button>
          </div>
          <div className="chipline mt-[30px]">
            {content.promise.map((p, i) => (
              <span key={i}>
                <span className="flex text-copper">
                  <Icon name="check-circle" size={16} />
                </span>
                {p}
              </span>
            ))}
          </div>
          <div className="hero-stats mt-[19px] border-t border-white/20 pt-7">
            {content.heroStats.map((st, i) => (
              <div key={i}>
                <div className="num font-display text-[36px] font-bold leading-[1.1] text-green">
                  <AnimatedStat value={st.value} />
                </div>
                <p className="mt-[6px] text-[13px] text-white/70">{st.label}</p>
              </div>
            ))}
          </div>
        </div>
      </HeroStage>

      <HomePillars />

      <HomeClientLogos />

      <HomeAudience />

      <HomeRisk />

      <HomeJourney />

      <section className="bg-parchment py-[70px]">
        <div className="wrap" style={{ paddingBlock: "0 56px" }}>
          <SectionHead kicker={t("home.services.kicker")} title={t("home.services.title")} lead={t("home.services.lead")} align="center" max={640} className="mx-auto" />
        </div>
        <div className="wrap r-g3 grid grid-cols-3 gap-6 pb-2">
          {content.services.map((s, i) => (
            <HomeServiceCard key={i} s={s} i={i} />
          ))}
        </div>
      </section>

      <section className="sec sand-bg">
        <div className="wrap">
          <SectionHead kicker={t("home.why.kicker")} title={t("home.why.title")} lead={t("home.why.lead")} max={640} />
          <div className="r-g3 mt-14 grid grid-cols-3 gap-px border border-sand-deep bg-sand-deep">
            {content.whyPoints.map((p, i) => (
              <Reveal key={i} delay={i * 70} className="h-full">
                <div className="group relative h-full bg-sand px-[30px] py-[34px] transition-colors duration-300 hover:bg-parchment">
                  <span className="absolute inset-y-0 end-0 w-[3px] origin-top scale-y-0 bg-copper transition-transform duration-300 ease-out group-hover:scale-y-100" />
                  <h3 className="font-display text-[17.5px] font-bold text-text-strong">{p.title}</h3>
                  <p className="mt-[9px] text-[14.5px] leading-[1.8] text-text-muted">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="sec">
        <div className="wrap r-split grid items-center gap-[clamp(40px,6vw,96px)]" style={{ gridTemplateColumns: "1fr 1.05fr" }}>
          <div className="relative pb-[74px] ps-16">
            <Photo src={pictures.about[0]} ratio="4/5" zoom label="مكتبنا" />
            <div className="absolute bottom-0 start-0 w-[58%] border-8 border-parchment">
              <Photo src={pictures.about[1]} ratio="4/3" zoom label="اجتماع مع عميل" />
            </div>
            <div className="absolute top-9 end-[-1px] h-[110px] w-[2px] bg-copper" />
          </div>
          <div>
            <SectionHead kicker={t("home.who.kicker")} title={t("home.who.title")} />
            <div className="mt-[18px] flex flex-col gap-4">
              {content.about.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-[1.9] text-text-muted">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-1 border-s-[3px] border-copper ps-[18px] text-base font-bold leading-[1.8] text-text-strong">{content.about.closing}</p>
            <div className="r-g2 mt-9 grid grid-cols-2" style={{ gap: "28px 32px" }}>
              {content.advantages.map((a, i) => (
                <div key={i} className="border-t border-sand-deep pt-5">
                  <span className="flex h-11 w-11 items-center justify-center bg-navy text-green">
                    <Icon name={a.icon} size={21} />
                  </span>
                  <h4 className="h4 mt-3">{a.title}</h4>
                  <p className="mt-[6px] text-sm leading-[1.8] text-text-muted">{a.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-9">
              <Button iconEnd="arrow-left" to="/about">
                {t("home.who.cta")}
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      <HomeSegs />

      <section className="navy-bg sec">
        <div className="wrap">
          <SectionHead kicker={t("home.process.kicker")} title={t("home.process.title")} onDark max={560} />
          <div className="r-g4 relative mt-14 grid grid-cols-4 gap-px">
            <div className="absolute inset-x-0 top-[22px] h-px bg-white/[.18]" />
            {content.steps.map((st, i) => (
              <Reveal key={i} delay={i * 110} className="relative pe-7">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full font-display text-[17px] font-bold"
                  style={{
                    background: i === 0 ? "var(--copper)" : "var(--navy)",
                    border: `1px solid ${i === 0 ? "var(--copper)" : "rgba(255,255,255,.28)"}`,
                    color: i === 0 ? "var(--navy-deep)" : "var(--green-400)",
                  }}
                >
                  <span className="num">{st.number}</span>
                </div>
                <h4 className="h4 mt-[22px] text-text-on-dark">{st.title}</h4>
                <p className="mt-2 text-sm leading-[1.8] text-text-on-dark-muted">{st.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <SectionHead kicker={t("home.team.kicker")} title={t("home.team.title")} max={480} />
            <Button variant="secondary" size="sm" iconEnd="arrow-left" to="/about">
              {t("home.team.cta")}
            </Button>
          </div>
          <div className="r-g4 mt-12 grid grid-cols-4 gap-[26px]">
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

      <HomeOffice />

      <section className="sec navy-bg" style={{ textAlign: "center" }}>
        <div className="wrap on-dark">
          <SectionHead kicker={t("home.cases.kicker")} title={t("home.cases.title")} lead={t("home.cases.lead")} align="center" max={620} className="mx-auto" onDark />
          <div className="r-g3 mt-11 grid grid-cols-3 gap-[26px] text-start">
            {content.cases.map((c, i) => (
              <Reveal key={i} delay={i * 90} className="h-full">
                <div className="group flex h-full flex-col border border-border-subtle bg-parchment transition-all duration-300 hover:-translate-y-[5px] hover:border-copper hover:shadow-[0_16px_34px_-20px_rgba(35,41,58,.45)]">
                  <div className="relative bg-navy px-6 py-[22px]">
                    <span className="absolute inset-x-0 top-0 h-[3px] bg-green" />
                    <div className="text-[17px] font-bold leading-[1.5] text-text-on-dark">{c.who}</div>
                    <div className="mt-[5px] text-[13.5px] font-medium text-green">{c.sector}</div>
                  </div>
                  <div className="flex flex-1 flex-col gap-[15px] p-6">
                    <div>
                      <span className="mb-1 block text-[12.5px] font-bold text-copper">{t("home.cases.challengeLabel")}</span>
                      <p className="text-[14.5px] leading-[1.75] text-text-body">{c.challenge}</p>
                    </div>
                    <div>
                      <span className="mb-1 block text-[12.5px] font-bold text-copper">{t("home.cases.solutionLabel")}</span>
                      <p className="text-[14.5px] leading-[1.75] text-text-body">{c.solution}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
                      <div className="text-[14.5px] font-bold leading-[1.5] text-text-strong">{c.result}</div>
                      <div className="num whitespace-nowrap text-end font-display text-2xl font-extrabold leading-none text-copper">
                        {c.duration}
                        <small className="mt-[2px] block text-center text-xs font-normal text-text-muted">{t("home.cases.durationUnit")}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--surface-brand-soft)" }}>
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <SectionHead kicker={t("home.articles.kicker")} title={t("home.articles.title")} lead={t("home.articles.lead")} max={560} />
            <Button variant="secondary" size="sm" iconEnd="arrow-left" to="/blog">
              {t("home.articles.cta")}
            </Button>
          </div>
          <div className="r-g3 mt-12 grid grid-cols-3 gap-[26px]">
            {content.articles.slice(0, 3).map((a, i) => (
              <Reveal key={i} delay={i * 90} className="h-full">
                <Link
                  to="/blog"
                  className="group flex h-full flex-col border border-border-subtle bg-parchment text-inherit transition-all duration-300 hover:-translate-y-[5px] hover:border-copper hover:shadow-[0_16px_34px_-20px_rgba(35,41,58,.4)]"
                >
                  <Photo
                    src={a.image}
                    ratio="3/2"
                    label={a.cat}
                    className="[filter:grayscale(.35)] transition-[filter] duration-[400ms] ease-out group-hover:grayscale-0"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex gap-[14px] text-xs font-bold text-copper">
                      <span>{a.cat}</span>
                      <span className="font-normal text-text-muted">{a.date}</span>
                      <span className="font-normal text-text-muted">{a.readTime}</span>
                    </div>
                    <h4 className="mt-[10px] font-display text-[18.5px] font-bold leading-[1.5] text-text-strong transition-colors duration-300 group-hover:text-copper">
                      {a.title}
                    </h4>
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
        </div>
      </section>

      <HomeFaq />

      <HomeContact />
      <CTABand />
    </main>
  );
}
