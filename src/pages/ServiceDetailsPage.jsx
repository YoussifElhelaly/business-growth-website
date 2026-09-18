import { SEO } from "../components/site/SEO.jsx";

import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Icon, Button, Reveal } from "../design-system/index.js";
import { useSiteContent } from "../api/hooks.js";
import { openRequestDialog } from "../app/uiSlice.js";
import { Photo } from "../components/site/Photo.jsx";
import { CTABand } from "../components/site/CTABand.jsx";
import { SectionHead } from "../components/site/SectionHead.jsx";

export function ServiceDetailsPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { content } = useSiteContent();

  if (!content) return null;

  const service = content.services.find((s) => s.id === id);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <main>
      <SEO title={service.title} description={service.tag} image={service.image} />

      {/* Service Hero */}
      <section className="relative overflow-hidden bg-navy pt-[120px] pb-[80px]">
        <div className="absolute inset-0 opacity-15">
          <Photo src={service.image} fill />
          <div className="absolute inset-0 bg-navy-deep mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
        
        <div className="wrap relative z-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-[15px] font-semibold text-copper transition-colors hover:text-green-400 mb-8">
            <Icon name="arrow-right" size={18} />
            {t("nav.services")}
          </Link>
          
          <div className="r-split grid items-center gap-10" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <div className="flex items-center gap-[14px] mb-6">
                <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center bg-white/10 text-copper">
                  <Icon name={service.icon} size={22} />
                </span>
                <span className="text-[13px] font-bold tracking-[.14em] text-copper uppercase">{service.tag}</span>
              </div>
              
              <h1 className="d2 text-text-on-dark">{service.title}</h1>
              <div className="lead mt-6 max-w-[540px] text-text-on-dark-muted" dangerouslySetInnerHTML={{ __html: service.description }} />
              
              <div className="mt-10">
                <Button size="lg" iconEnd="arrow-left" onClick={() => dispatch(openRequestDialog(service.title))}>
                  {t("common.requestService")}
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
               <Photo src={service.image} ratio="4/3" zoom label={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="sec bg-parchment">
        <div className="wrap r-split grid gap-[clamp(40px,6vw,96px)]" style={{ gridTemplateColumns: "1.1fr .9fr" }}>
          
          {/* Main Features */}
          <div>
            <SectionHead kicker={t("services.details.featuresKicker", "ما يتضمنه الدعم")} title={t("services.details.featuresTitle", "مجالات التركيز والمخرجات")} />
            <ul className="mt-10 flex flex-col gap-6">
              {service.items.map((it, n) => (
                <Reveal key={n} delay={n * 50}>
                  <li className="flex items-start gap-[14px] bg-sand px-6 py-5 border-l-2 border-copper">
                    <span className="mt-[2px] shrink-0 text-copper">
                      <Icon name="check" size={18} />
                    </span>
                    <span className="text-[16px] leading-[1.8] text-text-strong">{it}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          
          {/* Outcome & Impact */}
          <div>
            <div className="bg-navy p-10 text-text-on-dark">
              <span className="flex text-green-400 mb-6">
                <Icon name="target" size={32} />
              </span>
              <h3 className="font-display text-[24px] font-bold mb-4">{t("services.details.outcomeTitle", "النتيجة والأثر المتوقع")}</h3>
              <div className="text-[16px] leading-[1.9] text-text-on-dark-muted prose prose-invert" dangerouslySetInnerHTML={{ __html: service.outcome }} />
            </div>
            
            <div className="mt-8 border border-border-subtle p-8 bg-sand-deep">
              <h4 className="font-display text-[18px] font-bold mb-3">{t("services.details.needHelp", "تحتاج مساعدة في اختيار الخدمة؟")}</h4>
              <p className="text-sm leading-[1.8] text-text-muted mb-6">
                {t("services.details.helpText", "فريقنا مستعد لدراسة احتياجاتك وتقديم الاستشارة المناسبة لبدء مشروعك بثقة.")}
              </p>
              <Button variant="secondary" size="sm" iconStart="phone" to="/contact">
                {t("contact.callButton")}
              </Button>
            </div>
          </div>

        </div>
      </section>

      <CTABand />
    </main>
  );
}
