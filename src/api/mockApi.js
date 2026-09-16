import { PIC } from "../data/pictures.js";
import { RESOURCES } from "../../shared/resources.js";
import { projectRecord } from "../../shared/projectRecord.js";
import { API_BASE_URL } from "./config.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchResource(key) {
  const res = await fetch(`${API_BASE_URL}/api/${key}`);
  return res.json();
}

/**
 * Fetches every content section — all managed through the admin dashboard —
 * from the local API server, and reshapes each into the flat, single-language
 * object the page components expect.
 */
export async function fetchSiteContent(lang) {
  const [resourceEntries] = await Promise.all([
    Promise.all(
      RESOURCES.map(async (resource) => {
        const raw = await fetchResource(resource.key);
        if (resource.mode === "singleton") {
          return [resource.key, projectRecord(raw, resource.fields, lang)];
        }
        const projected = raw.map((record) => projectRecord(record, resource.fields, lang));
        return [resource.key, resource.simpleList ? projected.map((r) => r.value) : projected];
      })
    ),
    delay(150),
  ]);

  const rawServices = await fetchResource("services");
  const services = rawServices.map((s) => ({
    id: s.id,
    icon: s.icon,
    image: s.image,
    title: s.title[lang] ?? s.title.ar,
    tag: s.tag[lang] ?? s.tag.ar,
    description: s.description[lang] ?? s.description.ar,
    items: s.items[lang] ?? s.items.ar,
    outcome: s.outcome[lang] ?? s.outcome.ar,
  }));

  return { ...Object.fromEntries(resourceEntries), services, pictures: PIC };
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
