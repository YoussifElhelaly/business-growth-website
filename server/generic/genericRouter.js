import { Router } from "express";
import crypto from "crypto";
import { requireAuth } from "../auth/middleware.js";
import { buildRecord, validateRecord } from "./recordShape.js";

export function createCollectionRouter(store, fields) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await store.read());
  });

  router.post("/", requireAuth, async (req, res) => {
    const errors = validateRecord(fields, req.body);
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const items = await store.read();
    const record = buildRecord(crypto.randomUUID(), req.body, fields);
    items.push(record);
    await store.write(items);
    res.status(201).json(record);
  });

  // Registered before "/:id" so it isn't swallowed by the param route.
  router.put("/order", requireAuth, async (req, res) => {
    const { order } = req.body || {};
    if (!Array.isArray(order)) return res.status(400).json({ error: "order-must-be-array" });

    const items = await store.read();
    const byId = new Map(items.map((it) => [it.id, it]));
    if (order.length !== items.length || !order.every((id) => byId.has(id))) {
      return res.status(400).json({ error: "order-mismatch" });
    }

    const reordered = order.map((id) => byId.get(id));
    await store.write(reordered);
    res.json(reordered);
  });

  router.put("/:id", requireAuth, async (req, res) => {
    const items = await store.read();
    const index = items.findIndex((it) => it.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "not-found" });

    const errors = validateRecord(fields, req.body);
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const record = buildRecord(items[index].id, req.body, fields);
    items[index] = record;
    await store.write(items);
    res.json(record);
  });

  router.delete("/:id", requireAuth, async (req, res) => {
    const items = await store.read();
    const index = items.findIndex((it) => it.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: "not-found" });

    items.splice(index, 1);
    await store.write(items);
    res.json({ ok: true });
  });

  return router;
}

export function createSingletonRouter(store, fields) {
  const router = Router();

  router.get("/", async (req, res) => {
    res.json(await store.read());
  });

  router.put("/", requireAuth, async (req, res) => {
    const errors = validateRecord(fields, req.body);
    if (Object.keys(errors).length) return res.status(400).json({ errors });

    const record = buildRecord(undefined, req.body, fields);
    await store.write(record);
    res.json(record);
  });

  return router;
}
