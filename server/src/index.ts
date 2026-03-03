import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import submissionsRouter from "./routes/submissions";

const app = express();
const PORT = process.env.PORT ?? 3000;

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(
  cors({
    // Allow the Railway frontend domain and local dev.
    // Set ALLOWED_ORIGIN in Railway env vars to your frontend URL.
    origin: process.env.ALLOWED_ORIGIN ?? "*",
    methods: ["GET", "POST"],
  })
);
app.use(express.json({ limit: "50kb" }));

// ── Routes ────────────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok", ts: new Date() });
});

app.use("/api/submissions", submissionsRouter);

// ── Start ─────────────────────────────────────────────────────────────────────

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
