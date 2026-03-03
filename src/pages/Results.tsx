import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, Trophy } from "lucide-react";
import type { ChecklistItem } from "../data/checklistData";
import {
  categories,
  calculateScore,
  severityWeight,
} from "../data/checklistData";
import ScoreGauge from "../components/ScoreGauge";
import { getSessionId, submitResults } from "../lib/api";

interface ResultsProps {
  checkedIds: Set<string>;
  onReset: () => void;
}

interface MissedItem extends ChecklistItem {
  categoryTitle: string;
  categoryIcon: LucideIcon;
}

function getMissedItems(checkedIds: Set<string>): MissedItem[] {
  const missed = [];
  for (const cat of categories) {
    for (const item of cat.items) {
      if (!checkedIds.has(item.id)) {
        missed.push({ ...item, categoryTitle: cat.title, categoryIcon: cat.icon });
      }
    }
  }
  return missed.sort(
    (a, b) => severityWeight[b.severity] - severityWeight[a.severity]
  );
}

const severityBadge = {
  critical: { bg: "#fef2f2", color: "#b91c1c", border: "#fca5a5", label: "Critical" },
  high: { bg: "#fff7ed", color: "#c2410c", border: "#fdba74", label: "High" },
  medium: { bg: "#fffbeb", color: "#b45309", border: "#fcd34d", label: "Medium" },
  low: { bg: "#f7fee7", color: "#4d7c0f", border: "#bef264", label: "Low" },
};

export default function Results({ checkedIds, onReset }: ResultsProps) {
  const navigate = useNavigate();
  const score = calculateScore(checkedIds);
  const missed = getMissedItems(checkedIds);

  const totalCount = categories.reduce((s, c) => s + c.items.length, 0);
  const doneCount = checkedIds.size;

  // ── Submit results to analytics API (once per mount, non-blocking) ──────────
  const submitted = useRef(false);
  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;

    const categoryBreakdown = categories.map((cat) => {
      const checked = cat.items.filter((i) => checkedIds.has(i.id)).length;
      return {
        id: cat.id,
        title: cat.title,
        checked,
        total: cat.items.length,
        percentage: Math.round((checked / cat.items.length) * 100),
      };
    });

    const severitySummary = {
      critical: { checked: 0, total: 0 },
      high: { checked: 0, total: 0 },
      medium: { checked: 0, total: 0 },
      low: { checked: 0, total: 0 },
    };
    for (const cat of categories) {
      for (const item of cat.items) {
        const sev = item.severity as keyof typeof severitySummary;
        severitySummary[sev].total++;
        if (checkedIds.has(item.id)) severitySummary[sev].checked++;
      }
    }

    void submitResults({
      sessionId: getSessionId(),
      score,
      totalChecked: checkedIds.size,
      totalItems: totalCount,
      checkedIds: [...checkedIds],
      categoryBreakdown,
      severitySummary,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="max-w-[820px] mx-auto px-6 pt-10 pb-20 flex flex-col gap-12">
      {/* Score hero */}
      <section className="flex gap-10 items-center bg-white border border-slate-200 rounded-[1.25rem] p-10 max-md:flex-col max-md:gap-6 max-md:p-6">
        <div className="shrink-0">
          <ScoreGauge score={score} large />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-[1.6rem] font-extrabold text-slate-900 mb-[0.625rem] tracking-[-0.02em]">
            Your Digital Safety Score
          </h1>
          <p className="text-slate-600 text-[0.95rem] leading-relaxed mb-5">
            You completed <strong className="text-slate-800">{doneCount}</strong> of{" "}
            <strong className="text-slate-800">{totalCount}</strong> safety checks.{" "}
            {missed.length === 0
              ? "Outstanding — you've done everything!"
              : `You have ${missed.length} item${missed.length !== 1 ? "s" : ""} remaining.`}
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/checklist")}
            >
              <><ArrowLeft size={15} className="inline-block mr-1" /> Back to Checklist</>
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                onReset();
                navigate("/");
              }}
            >
              Start Over
            </button>
          </div>
        </div>
      </section>

      {/* Category breakdown */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-500">
          Category Breakdown
        </h2>
        <div className="flex flex-col gap-[0.875rem]">
          {categories.map((cat) => {
            const done = cat.items.filter((i) => checkedIds.has(i.id)).length;
            const total = cat.items.length;
            const pct = Math.round((done / total) * 100);
            const CatIcon = cat.icon;
            return (
              <div key={cat.id} className="bg-white border border-slate-200 rounded-xl px-[1.125rem] py-4">
                <div className="flex items-center gap-[0.6rem] mb-[0.6rem]">
                  <CatIcon size={16} className="shrink-0 text-slate-500" />
                  <span className="flex-1 text-[0.875rem] font-semibold text-slate-700">{cat.title}</span>
                  <span
                    className={`text-[0.8rem] font-bold tabular-nums ${pct === 100 ? "text-green-700" : "text-slate-500"}`}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="h-[5px] bg-slate-100 rounded-full overflow-hidden mb-[0.4rem]">
                  <div
                    className="h-full rounded-full transition-[width] duration-500"
                    style={{
                      width: `${pct}%`,
                      background: pct === 100 ? "#16a34a" : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    }}
                  />
                </div>
                <div className="text-[0.72rem] text-slate-500 tabular-nums">
                  {done}/{total} complete
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action plan */}
      {missed.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-500">
            Your Action Plan
          </h2>
          <p className="text-slate-600 text-[0.875rem] leading-relaxed">
            Prioritized by severity — tackle{" "}
            <span style={{ color: "#b91c1c" }}>Critical</span> and{" "}
            <span style={{ color: "#c2410c" }}>High</span> items first.
          </p>
          <div className="flex flex-col gap-4">
            {missed.map((item) => {
              const sev = severityBadge[item.severity];
              const ItemCatIcon = item.categoryIcon;
              return (
                <div key={item.id} className="bg-white border border-slate-200 rounded-[0.875rem] p-5">
                  <div className="flex items-center justify-between gap-3 mb-[0.625rem]">
                    <span className="text-[0.75rem] text-slate-500">
                      <ItemCatIcon size={13} className="inline-block mr-1" />{item.categoryTitle}
                    </span>
                    <span
                      className="text-[0.68rem] font-bold uppercase tracking-[0.07em] px-[0.55rem] py-[0.2rem] rounded-full border"
                      style={{ background: sev.bg, color: sev.color, borderColor: sev.border }}
                    >
                      {sev.label}
                    </span>
                  </div>
                  <p className="text-[0.9rem] font-semibold text-slate-800 mb-[0.875rem] leading-snug">{item.text}</p>
                  {item.tip && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-[0.875rem]">
                      <strong className="block text-[0.85rem] text-slate-700 mb-[0.375rem]">{item.tip.title}</strong>
                      <p className="mb-3 text-[0.82rem] text-slate-600 leading-relaxed">{item.tip.body}</p>
                      {item.tip.action && (
                        <div className="bg-indigo-50 border border-indigo-200 rounded-md px-3 py-[0.625rem]">
                          <span className="block text-[0.6rem] font-bold uppercase tracking-[0.08em] text-indigo-700 mb-[0.2rem]">
                            Action
                          </span>
                          <p className="m-0 text-[0.8rem] text-slate-700 leading-relaxed">{item.tip.action}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* All done state */}
      {missed.length === 0 && (
        <section className="text-center py-12 px-8 bg-green-50 border border-green-300 rounded-2xl">
          <Trophy size={44} className="text-yellow-500 mx-auto mb-3" />
          <h2 className="text-[1.4rem] font-extrabold text-green-700 mb-2">Perfect Score!</h2>
          <p className="text-slate-600 text-[0.9rem] leading-relaxed">
            You've completed every check. Your digital security posture is
            excellent. Revisit this checkup periodically to stay on top of new
            threats.
          </p>
        </section>
      )}

      <div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/checklist")}
        >
          <><ArrowLeft size={15} className="inline-block mr-1" /> Continue Checklist</>
        </button>
      </div>
    </main>
  );
}
