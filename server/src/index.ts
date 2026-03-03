import "dotenv/config";
import path from "path";
import express from "express";
import { connectDB } from "./db";
import submissionsRouter from "./routes/submissions";

const app = express();
const PORT = process.env.PORT ?? 3000;

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(express.json({ limit: "50kb" }));

// ── API routes ────────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date() });
});

app.use("/api/submissions", submissionsRouter);

// ── Static frontend (production) ──────────────────────────────────────────────
// In the Docker container, Express serves the Vite build from ./public.
// In local dev, Vite's dev server handles the frontend separately.
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "..", "public");
  app.use(express.static(staticPath));
  // SPA fallback — must come after API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

// ── Start ─────────────────────────────────────────────────────────────────────

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
