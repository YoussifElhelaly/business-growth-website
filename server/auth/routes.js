import { Router } from "express";
import bcrypt from "bcryptjs";
import { signSession, setSessionCookie, clearSessionCookie, readSession } from "./middleware.js";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword =
    typeof password === "string" && (await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || ""));

  if (!validUsername || !validPassword) {
    return res.status(401).json({ error: "invalid-credentials" });
  }

  const token = signSession(username);
  setSessionCookie(res, token);
  res.json({ ok: true, username });
});

authRouter.post("/logout", (req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

authRouter.get("/me", (req, res) => {
  const session = readSession(req);
  if (!session) return res.json({ authenticated: false });
  res.json({ authenticated: true, username: session.sub });
});
