import { contentAr } from "../data/content.ar.js";
import { contentEn } from "../data/content.en.js";
import { PIC } from "../data/pictures.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const contentByLang = { ar: contentAr, en: contentEn };

/**
 * Simulates fetching the site's content from a backend API.
 * Swap this out for a real `fetch("/api/site?lang=...")` call once a
 * backend exists — the shape returned here is what the app already expects.
 */
export async function fetchSiteContent(lang) {
  await delay(650);
  const content = contentByLang[lang] || contentByLang.ar;
  return { ...content, pictures: PIC };
}

/**
 * Simulates submitting a consultation request to a backend API.
 */
export async function submitConsultationRequest(payload) {
  await delay(900);
  if (!payload?.name || !payload?.phone) {
    throw new Error("missing-required-fields");
  }
  return { ok: true, receivedAt: new Date().toISOString() };
}
