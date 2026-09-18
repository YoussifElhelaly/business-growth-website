import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./auth/routes.js";
import { servicesRouter } from "./routes/services.routes.js";
import { uploadRouter } from "./routes/upload.routes.js";
import { consultationsPublicRouter } from "./routes/consultations.routes.js";
import { RESOURCES } from "../shared/resources.js";
import { createResourceStore } from "./generic/genericStore.js";
import { createCollectionRouter, createSingletonRouter } from "./generic/genericRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const requiredEnv = ["ADMIN_USERNAME", "ADMIN_PASSWORD_HASH", "JWT_SECRET"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required .env keys: ${missing.join(", ")}. See .env.example.`);
  process.exit(1);
}

const extraOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
if (process.env.NODE_ENV !== "production") {
  extraOrigins.push("http://localhost:5173");
  extraOrigins.push("http://127.0.0.1:5173");
}
const allowedOriginPatterns = [
  /^https?:\/\/([a-z0-9-]+\.)*vercel\.app$/,
  /^https?:\/\/([a-z0-9-]+\.)*trycloudflare\.com$/,
  /^https?:\/\/([a-z0-9-]+\.)*loca\.lt$/,
  ...extraOrigins
];
const isAllowedOrigin = (origin) =>
  allowedOriginPatterns.some((p) => (p instanceof RegExp ? p.test(origin) : p === origin));

const app = express();
app.use(
  cors({
    origin(origin, callback) {
      // Allow any origin for now to prevent 500 errors
      callback(null, origin || true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", authRouter);
app.use("/api/services", servicesRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/consultations", consultationsPublicRouter);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

for (const resource of RESOURCES) {
  const store = createResourceStore(resource);
  const router =
    resource.mode === "collection"
      ? createCollectionRouter(store, resource.fields)
      : createSingletonRouter(store, resource.fields);
  app.use(`/api/${resource.key}`, router);
}

const port = Number(process.env.API_PORT) || 4001;

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(distPath, "index.html"));
    }
  });
}

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
