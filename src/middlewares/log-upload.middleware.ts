import multer from 'multer';
import type { Request, Response, NextFunction } from "express";

const upload = multer({
  storage: multer.memoryStorage(), // keep file in memory (simple for MVP)
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    // allow only .log files
    if (!file.originalname.toLowerCase().endsWith(".log")) {
      return cb(new Error("Only .log files are allowed"));
    }
    cb(null, true);
  },
});

// Optional: clean/normalize log text into your rawData style
function normalizeLogText(text: string) {
  return text
    .replace(/\r\n/g, "\n")        // windows -> unix
    .split("\n")
    .map((line) => line.trim())    // remove leading spaces
    .filter(Boolean)               // remove empty lines
    .join("\n");                   // back to single string
}

export const logUploadMiddleware = [
  upload.single("log"),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ message: "No .log file uploaded (field name: log)" });
    }

    const text = req.file.buffer.toString("utf8");
    const rawData = normalizeLogText(text);

    // attach for next handler (LangGraph/agent)
    (req as any).rawData = rawData;

    next();
  },
];