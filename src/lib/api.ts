// API calls are same-origin — Express serves both the frontend and the API.

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CategoryBreakdown {
  id: string;
  title: string;
  checked: number;
  total: number;
  percentage: number;
}

export interface SeverityCount {
  checked: number;
  total: number;
}

export interface SubmissionPayload {
  sessionId: string;
  score: number;
  totalChecked: number;
  totalItems: number;
  checkedIds: string[];
  categoryBreakdown: CategoryBreakdown[];
  severitySummary: {
    critical: SeverityCount;
    high: SeverityCount;
    medium: SeverityCount;
    low: SeverityCount;
  };
}

// ── Session ID ────────────────────────────────────────────────────────────────

export function getSessionId(): string {
  const KEY = "dsc-session-id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

// ── API call ──────────────────────────────────────────────────────────────────

/** Fire-and-forget — never throws, never blocks the UI. */
export async function submitResults(payload: SubmissionPayload): Promise<void> {
  try {
    await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Analytics submission is best-effort; silently ignore errors.
  }
}
