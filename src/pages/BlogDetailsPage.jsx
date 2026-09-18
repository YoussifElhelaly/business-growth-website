import { SEO } from "../components/site/SEO.jsx";

import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon, Reveal } from "../design-system/index.js";
import { useSiteContent } from "../api/hooks.js";
import { Photo } from "../components/site/Photo.jsx";
import { CTABand } from "../components/site/CTABand.jsx";

export function BlogDetailsPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { content } = useSiteContent();

  if (!content) return null;

  const article = content.articles.find((a) => a.id === id);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Mock content since articles.json only contains excerpts
  const mockParagraphs = [
    "يعتبر تأسيس الشركات من الخطوات المحورية في رحلة أي رائد أعمال، حيث يتطلب الأمر فهماً شاملاً للبيئة القانونية والتشريعية في المملكة العربية السعودية. تتفاوت التكاليف بناءً على نوع الشركة وحجم النشاط، ولكن من المهم عدم النظر فقط للرسوم الحكومية بل للالتزامات المستمرة.",
    "الكثير من المستثمرين يقعون في فخ التركيز على تكلفة التأسيس الأولية وتجاهل المصروفات التشغيلية التي تليها. على سبيل المثال، رسوم تجديد السجل التجاري، اشتراكات الغرفة التجارية، والتراخيص المتخصصة التي قد يحتاجها نشاطك للعمل بصورة قانونية مستدامة.",
    "لذلك، نحن في بزنس جروث ننصح دائماً بالبدء بدراسة قانونية ومالية وافية قبل اتخاذ أي خطوة. هذه المنهجية لا تحميك فقط من الغرامات المستقبلية، بل تضع أساساً متيناً لنمو أعمالك وتوسعها دون عوائق هيكلية.",
    "ختاماً، الاستثمار في الاستشارة الصحيحة في بداية الطريق يوفر عليك الكثير من الوقت والجهد والأموال في المستقبل، ويضمن لك انطلاقة واثقة في سوق مليء بالفرص الواعدة."
  ];

  return (
    <main>
      <SEO title={article.title} description={article.excerpt} image={article.image} article={true} />

      <section className="relative overflow-hidden bg-navy pt-[120px] pb-[80px]">
        <div className="absolute inset-0 opacity-20">
          <Photo src={article.image} fill />
          <div className="absolute inset-0 bg-navy-deep mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent" />
        
        <div className="wrap relative z-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[15px] font-semibold text-copper transition-colors hover:text-green-400 mb-8">
            <Icon name="arrow-right" size={18} />
            {t("nav.blog")}
          </Link>
          
          <div className="flex justify-center gap-4 text-[13px] font-bold tracking-wide text-copper mb-5">
            <span>{article.cat}</span>
            <span className="text-text-on-dark-muted font-normal">{article.date}</span>
            <span className="text-text-on-dark-muted font-normal">{article.readTime}</span>
          </div>
          
          <h1 className="d2 mx-auto max-w-[860px] text-text-on-dark">{article.title}</h1>
          <p className="lead mx-auto mt-6 max-w-[700px] text-text-on-dark-muted">{article.excerpt}</p>
        </div>
      </section>

      <section className="sec bg-parchment">
        <div className="wrap max-w-[800px] mx-auto">
          <Reveal className="mb-12">
            <Photo src={article.image} ratio="16/9" zoom label={article.title} />
          </Reveal>
          
          <div 
            className="prose prose-lg max-w-none text-text-body"
            dangerouslySetInnerHTML={{ __html: article.body || "" }}
          />
        </div>
      </section>

      <CTABand />
    </main>
  );
}
