import { Router, Request, Response } from "express";
import { Submission } from "../models/Submission";

const router = Router();

// POST /api/submissions
// Upserts by sessionId so refreshing the results page doesn't create duplicates.
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      sessionId,
      score,
      totalChecked,
      totalItems,
      checkedIds,
      categoryBreakdown,
      severitySummary,
    } = req.body;

    if (!sessionId || typeof score !== "number") {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    await Submission.findOneAndUpdate(
      { sessionId },
      {
        sessionId,
        score,
        totalChecked,
        totalItems,
        checkedIds,
        categoryBreakdown,
        severitySummary,
        userAgent: req.headers["user-agent"],
        submittedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
