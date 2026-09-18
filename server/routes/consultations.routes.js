import { Router } from "express";
import crypto from "crypto";
import { createResourceStore } from "../generic/genericStore.js";
import { RESOURCES } from "../../shared/resources.js";
import { buildRecord, validateRecord } from "../generic/recordShape.js";

export const consultationsPublicRouter = Router();

// Store instance for consultations
const resourceDef = RESOURCES.find(r => r.key === "consultations");
const store = createResourceStore(resourceDef);

consultationsPublicRouter.post("/", async (req, res) => {
  const fields = resourceDef.fields;
  
  // Add server-side date to the request body
  req.body.date = new Date().toLocaleString("ar-EG");
  
  const errors = validateRecord(fields, req.body);
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const items = await store.read();
  const record = buildRecord(crypto.randomUUID(), req.body, fields);
  items.push(record);
  await store.write(items);
  res.status(201).json(record);
});
