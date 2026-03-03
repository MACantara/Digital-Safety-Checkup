import { Schema, model, Document } from "mongoose";

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const CategoryBreakdownSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    checked: { type: Number, required: true },
    total: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { _id: false }
);

const SeverityCountSchema = new Schema(
  {
    checked: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false }
);

// ── Main schema ───────────────────────────────────────────────────────────────

export interface ISubmission extends Document {
  sessionId: string;
  score: number;
  totalChecked: number;
  totalItems: number;
  checkedIds: string[];
  categoryBreakdown: {
    id: string;
    title: string;
    checked: number;
    total: number;
    percentage: number;
  }[];
  severitySummary: {
    critical: { checked: number; total: number };
    high: { checked: number; total: number };
    medium: { checked: number; total: number };
    low: { checked: number; total: number };
  };
  userAgent?: string;
  submittedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  sessionId: { type: String, required: true, index: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  totalChecked: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  checkedIds: [{ type: String }],
  categoryBreakdown: [CategoryBreakdownSchema],
  severitySummary: {
    critical: { type: SeverityCountSchema },
    high: { type: SeverityCountSchema },
    medium: { type: SeverityCountSchema },
    low: { type: SeverityCountSchema },
  },
  userAgent: { type: String },
  submittedAt: { type: Date, default: () => new Date() },
});

export const Submission = model<ISubmission>("Submission", SubmissionSchema);
