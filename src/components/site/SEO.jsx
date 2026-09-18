import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useSiteContent } from "../../api/hooks.js";

export function SEO({ title, description, image, article = false }) {
  const { t } = useTranslation();
  const { content } = useSiteContent();

  const siteName = content?.brand?.name || "Business Growth";
  const defaultDescription = content?.brand?.tagline || t("home.hero.lead", "Empowering businesses...");
  
  const seo = {
    title: title ? `${title} | ${siteName}` : siteName,
    description: description || defaultDescription,
    image: image || "/og-image.jpg", // Fallback to a default image in public folder if exists
    url: window.location.href,
  };

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
}
