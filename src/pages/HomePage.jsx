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
import { Gallery } from "../components/site/Gallery.jsx";
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
          className="r-split mt-11 grid items-stretch overflow-hidden rounded-xl shadow-[0_30px_70px_-40px_rgba(8,24,38,.45)]"
          style={{ gridTemplateColumns: ".85fr 1.15fr" }}
        >
          <div className="bg-navy text-text-on-dark" style={{ padding: "clamp(30px,3vw,42px)" }}>
            <h3 className="font-display text-2xl font-bold text-text-on-dark">{t("home.contactSection.infoTitle")}</h3>
            <div className="mt-7 flex flex-col gap-[22px]">
              {rows.map((r, i) => (
                <div key={i} className="flex items-start gap-[14px]">
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-md bg-[rgba(37,199,122,.14)] text-green">
                    <Icon name={r.icon} size={18} />
                  </span>
                  <div>
                    <div className="text-xs tracking-[.08em] text-[rgba(166,191,211,.9)]">{r.label}</div>
                    <div className={`mt-[5px] text-[15px] leading-[1.7] text-text-on-dark ${i < 2 ? "num" : ""}`}>{r.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 overflow-hidden rounded-md border border-white/[.16]">
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
              <div className="mt-7 rounded-md border-t-2 border-green bg-sand px-6 py-[26px]">
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


function HomeServiceCard({ s, i, feature }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Reveal delay={i * 70} className={feature ? "svc-feature" : ""}>
      <div
        className="group flex h-full flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(8,24,38,0.12)]"
        style={{
          padding: feature ? "40px 38px" : "32px 30px",
          background: feature ? "var(--navy)" : "var(--parchment)",
          border: feature ? "1px solid var(--navy)" : "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <span
          className="flex shrink-0 items-center justify-center self-start transition-transform duration-500 group-hover:scale-110"
          style={{
            width: feature ? 54 : 52,
            height: feature ? 54 : 52,
            background: feature ? "var(--green)" : "var(--navy)",
            color: feature ? "var(--navy)" : "var(--green)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <Icon name={s.icon} size={feature ? 26 : 24} />
        </span>
        <h3
          className="font-display font-bold leading-[1.45]"
          style={{ marginTop: feature ? 26 : 22, fontSize: feature ? 26 : 20, color: feature ? "var(--text-on-dark)" : "var(--text-strong)" }}
        >
          {s.title}
        </h3>
        <p className="mt-3 leading-[1.85]" style={{ fontSize: feature ? 15 : 14, color: feature ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}>
          {s.description}
        </p>
        {feature && (
          <button
            onClick={() => navigate("/services")}
            className="mt-auto flex items-center gap-[10px] pt-7 text-[15px] font-bold text-green transition-transform group-hover:gap-3"
          >
            {t("common.requestService")} <Icon name="arrow-left" size={17} />
          </button>
        )}
      </div>
    </Reveal>
  );
}

function HomeFaq() {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  const faqs = content.faqs.slice(0, 5);

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
  const feat = content.testimonials.find((tm) => tm.featured) || content.testimonials[0];

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
            {content.whyStats.map((st, i) => (
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

      <section className="sec">
        <div className="wrap r-split grid items-center gap-[clamp(40px,6vw,96px)]" style={{ gridTemplateColumns: "1fr 1.05fr" }}>
          <div className="relative pb-[74px] ps-16">
            <Photo src={pictures.about[0]} ratio="4/5" zoom label="مكتبنا" />
            <div className="absolute bottom-0 start-0 w-[58%] border-8 border-parchment">
              <Photo src={pictures.about[1]} ratio="4/3" zoom label="اجتماع مع عميل" />
            </div>
            <div className="absolute top-9 end-[-1px] h-[110px] w-[2px] bg-copper" />
          </div>
          <div>
            <SectionHead kicker={t("home.who.kicker")} title={t("home.who.title")} lead={t("home.who.lead")} />
            <div className="r-g2 mt-9 grid grid-cols-2" style={{ gap: "28px 32px" }}>
              {content.advantages.map((a, i) => (
                <div key={i} className="border-t border-sand-deep pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-green">
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
      </section>

      <section className="sec navy-bg">
        <div className="wrap r-split grid items-center gap-[clamp(40px,6vw,80px)]" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="r-g2s grid grid-cols-2 gap-px bg-white/10">
            {content.whyStats.map((s, i) => (
              <div key={i} className="bg-navy text-center" style={{ padding: "46px 34px", borderRadius: "var(--radius-md)" }}>
                <div className="num font-display text-[40px] font-bold leading-[1.1] text-green">
                  <AnimatedStat value={s.value} />
                </div>
                <p className="mt-3 text-sm text-text-on-dark-muted">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="on-dark">
            <span className="eyebrow on-dark">{t("home.why.kicker")}</span>
            <h2 className="h2 mt-[18px]">{t("home.why.title")}</h2>
            <p className="lead mt-[14px]">{t("home.why.lead")}</p>
            <div className="mt-9 flex flex-col">
              {content.whyPoints.map((p, i) => (
                <Reveal key={i} delay={i * 90} className={`flex items-start gap-4 py-6 ${i ? "border-t border-white/[.14]" : ""}`}>
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[rgba(37,199,122,.16)] text-green">
                    <Icon name="check" size={16} />
                  </span>
                  <div>
                    <h4 className="h4 text-text-on-dark">{p.title}</h4>
                    <p className="mt-2 text-sm leading-[1.85] text-text-on-dark-muted">{p.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-parchment py-[70px]">
        <div className="wrap" style={{ paddingBlock: "0 56px" }}>
          <SectionHead kicker={t("home.services.kicker")} title={t("home.services.title")} lead={t("home.services.lead")} max={640} />
        </div>
        <div className="wrap svc-grid pb-2">
          <HomeServiceCard s={content.services[0]} i={0} feature />
          {content.services.slice(1, 5).map((s, i) => (
            <HomeServiceCard key={i} s={s} i={i + 1} />
          ))}
        </div>
      </section>



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

      <Gallery images={pictures.gallery} />

      <section className="sand-bg" style={{ paddingBlock: "96px" }}>
        <div className="wrap r-split grid items-center gap-[clamp(40px,6vw,88px)]" style={{ gridTemplateColumns: "1.3fr 1fr" }}>
          <div>
            <span className="block font-display text-[88px] leading-[.6] text-copper">”</span>
            <blockquote className="d2 mt-[18px] text-navy" style={{ fontSize: "clamp(26px,2.4vw,38px)", lineHeight: 1.5 }}>
              {feat.quote}
            </blockquote>
            <div className="mt-7 flex items-center gap-[14px]">
              <span className="h-px w-[38px] bg-copper" />
              <div>
                <div className="font-semibold text-text-strong">{feat.name}</div>
                <div className="text-sm text-text-muted">
                  {feat.role} · {feat.company}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {content.testimonials
              .filter((tm) => !tm.featured)
              .map((tm, i) => (
                <div key={i} className="rounded-lg border-t-2 border-copper bg-parchment px-[30px] py-7">
                  <p className="text-[15px] leading-[1.9] text-text-body">{tm.quote}</p>
                  <div className="mt-[14px] text-[13px] text-text-subtle">
                    {tm.name} — {tm.company}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <ClientWall />

      <section className="sec">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-10">
            <SectionHead kicker={t("home.articles.kicker")} title={t("home.articles.title")} max={520} />
            <Button variant="secondary" size="sm" iconEnd="arrow-left" to="/blog">
              {t("home.articles.cta")}
            </Button>
          </div>
          <div className="r-g3 mt-12 grid grid-cols-3 gap-8">
            {content.articles.slice(0, 3).map((a, i) => (
              <Reveal key={i} delay={i * 90}>
                <Link to="/blog" className="block text-inherit">
                  <Photo src={a.image} ratio="3/2" zoom label={a.cat} />
                  <div className="mt-[18px] flex gap-[14px] text-xs font-semibold tracking-[.08em] text-copper-dark">
                    <span>{a.cat}</span>
                    <span className="font-normal text-text-subtle">{a.date}</span>
                    <span className="font-normal text-text-subtle">{a.readTime}</span>
                  </div>
                  <h4 className="mt-[10px] font-display text-[22px] leading-[1.4]">{a.title}</h4>
                  <p className="mt-[10px] text-sm leading-[1.8] text-text-muted">{a.excerpt}</p>
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
