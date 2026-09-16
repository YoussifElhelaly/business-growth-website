import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { authRouter } from "./auth/routes.js";
import { servicesRouter } from "./routes/services.routes.js";
import { RESOURCES } from "../shared/resources.js";
import { createResourceStore } from "./generic/genericStore.js";
import { createCollectionRouter, createSingletonRouter } from "./generic/genericRouter.js";

const requiredEnv = ["ADMIN_USERNAME", "ADMIN_PASSWORD_HASH", "JWT_SECRET"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required .env keys: ${missing.join(", ")}. See .env.example.`);
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", authRouter);
app.use("/api/services", servicesRouter);

for (const resource of RESOURCES) {
  const store = createResourceStore(resource);
  const router =
    resource.mode === "collection"
      ? createCollectionRouter(store, resource.fields)
      : createSingletonRouter(store, resource.fields);
  app.use(`/api/${resource.key}`, router);
}

const port = Number(process.env.API_PORT) || 4001;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
