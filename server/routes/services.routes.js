import { Router } from "express";
import { servicesStore } from "../store/servicesStore.js";
import { slugify, uniqueSlug } from "../utils/slugify.js";
import { requireAuth } from "../auth/middleware.js";

export const servicesRouter = Router();

function emptyLang() {
  return { ar: "", en: "" };
}

function validateService(body) {
  const errors = {};
  if (!body?.title?.ar?.trim()) errors.titleAr = "required";
  if (!body?.title?.en?.trim()) errors.titleEn = "required";
  if (!body?.description?.ar?.trim()) errors.descriptionAr = "required";
  if (!body?.description?.en?.trim()) errors.descriptionEn = "required";
  const itemsAr = (body?.items?.ar || []).filter((s) => s?.trim());
  const itemsEn = (body?.items?.en || []).filter((s) => s?.trim());
  if (itemsAr.length === 0) errors.itemsAr = "at-least-one";
  if (itemsEn.length === 0) errors.itemsEn = "at-least-one";
  return { errors, itemsAr, itemsEn };
}

function toServiceRecord(id, body, { itemsAr, itemsEn }) {
  return {
    id,
    icon: body.icon || "building",
    image: body.image || "",
    title: { ar: body.title.ar.trim(), en: body.title.en.trim() },
    tag: { ar: body.tag?.ar?.trim() || "", en: body.tag?.en?.trim() || "" },
    description: { ar: body.description.ar.trim(), en: body.description.en.trim() },
    items: { ar: itemsAr, en: itemsEn },
    outcome: { ar: body.outcome?.ar?.trim() || "", en: body.outcome?.en?.trim() || "" },
  };
}

servicesRouter.get("/", async (req, res) => {
  const services = await servicesStore.read();
  res.json(services);
});

servicesRouter.post("/", requireAuth, async (req, res) => {
  const { errors, itemsAr, itemsEn } = validateService(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const services = await servicesStore.read();
  const base = slugify(req.body.title.en) || "service";
  const id = uniqueSlug(base, services.map((s) => s.id));
  const record = toServiceRecord(id, { ...req.body, tag: req.body.tag || emptyLang(), outcome: req.body.outcome || emptyLang() }, { itemsAr, itemsEn });

  services.push(record);
  await servicesStore.write(services);
  res.status(201).json(record);
});

// Registered before "/:id" so it isn't swallowed by the param route.
servicesRouter.put("/order", requireAuth, async (req, res) => {
  const { order } = req.body || {};
  if (!Array.isArray(order)) return res.status(400).json({ error: "order-must-be-array" });

  const services = await servicesStore.read();
  const byId = new Map(services.map((s) => [s.id, s]));
  if (order.length !== services.length || !order.every((id) => byId.has(id))) {
    return res.status(400).json({ error: "order-mismatch" });
  }

  const reordered = order.map((id) => byId.get(id));
  await servicesStore.write(reordered);
  res.json(reordered);
});

servicesRouter.put("/:id", requireAuth, async (req, res) => {
  const services = await servicesStore.read();
  const index = services.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "not-found" });

  const { errors, itemsAr, itemsEn } = validateService(req.body);
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const record = toServiceRecord(services[index].id, req.body, { itemsAr, itemsEn });
  services[index] = record;
  await servicesStore.write(services);
  res.json(record);
});

servicesRouter.delete("/:id", requireAuth, async (req, res) => {
  const services = await servicesStore.read();
  const index = services.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "not-found" });

  services.splice(index, 1);
  await servicesStore.write(services);
  res.json({ ok: true });
});
