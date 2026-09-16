import jwt from "jsonwebtoken";

const COOKIE_NAME = process.env.COOKIE_NAME || "bg_admin_session";
const JWT_SECRET = process.env.JWT_SECRET;

export function signSession(username) {
  return jwt.sign({ sub: username, role: "admin" }, JWT_SECRET, { expiresIn: "12h" });
}

export function readSession(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 12 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
}

export function requireAuth(req, res, next) {
  const session = readSession(req);
  if (!session) return res.status(401).json({ error: "unauthorized" });
  req.admin = { username: session.sub };
  next();
}
