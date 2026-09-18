import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth } from "../auth/middleware.js";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "..", "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("not-an-image"));
    }
  }
});

export const uploadRouter = Router();

uploadRouter.post("/", requireAuth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "no-file" });
  }
  // Return the public URL to access the image
  const imageUrl = `/api/uploads/${req.file.filename}`;
  res.status(201).json({ url: imageUrl });
});
