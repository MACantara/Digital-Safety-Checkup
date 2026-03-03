import { useNavigate } from "react-router-dom";
import {
  categories,
  calculateScore,
  getScoreLabel,
  severityWeight,
} from "../data/checklistData";
import ScoreGauge from "../components/ScoreGauge";
import "./Results.css";

function getMissedItems(checkedIds) {
  const missed = [];
  for (const cat of categories) {
    for (const item of cat.items) {
      if (!checkedIds.has(item.id)) {
        missed.push({ ...item, categoryTitle: cat.title, categoryIcon: cat.icon });
      }
    }
  }
  // Sort by severity weight descending
  return missed.sort(
    (a, b) => severityWeight[b.severity] - severityWeight[a.severity]
  );
}

const severityBadge = {
  critical: { bg: "rgba(239,68,68,0.12)", color: "#f87171", label: "Critical" },
  high: { bg: "rgba(249,115,22,0.12)", color: "#fb923c", label: "High" },
  medium: { bg: "rgba(245,158,11,0.12)", color: "#fbbf24", label: "Medium" },
  low: { bg: "rgba(132,204,22,0.12)", color: "#a3e635", label: "Low" },
};

export default function Results({ checkedIds, onReset }) {
  const navigate = useNavigate();
  const score = calculateScore(checkedIds);
  const { label, color } = getScoreLabel(score);
  const missed = getMissedItems(checkedIds);

  const totalCount = categories.reduce((s, c) => s + c.items.length, 0);
  const doneCount = checkedIds.size;

  const criticalMissed = missed.filter((i) => i.severity === "critical");
  const highMissed = missed.filter((i) => i.severity === "high");

  return (
    <main className="results-page">
      {/* Score hero */}
      <section className="results-hero">
        <div className="results-hero__gauge">
          <ScoreGauge score={score} large />
        </div>
        <div className="results-hero__text">
          <h1 className="results-hero__title">Your Digital Safety Score</h1>
          <p className="results-hero__subtitle">
            You completed <strong>{doneCount}</strong> of{" "}
            <strong>{totalCount}</strong> safety checks.{" "}
            {missed.length === 0
              ? "Outstanding — you've done everything!"
              : `You have ${missed.length} item${missed.length !== 1 ? "s" : ""} remaining.`}
          </p>
          <div className="results-hero__actions">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/checklist")}
            >
              ← Back to Checklist
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
      <section className="results-section">
        <h2 className="results-section__title">Category Breakdown</h2>
        <div className="results-breakdown">
          {categories.map((cat) => {
            const done = cat.items.filter((i) => checkedIds.has(i.id)).length;
            const total = cat.items.length;
            const pct = Math.round((done / total) * 100);
            return (
              <div key={cat.id} className="results-breakdown__item">
                <div className="results-breakdown__item-header">
                  <span className="results-breakdown__icon">{cat.icon}</span>
                  <span className="results-breakdown__cat-name">{cat.title}</span>
                  <span
                    className={`results-breakdown__pct ${pct === 100 ? "results-breakdown__pct--done" : ""}`}
                  >
                    {pct}%
                  </span>
                </div>
                <div className="results-breakdown__bar">
                  <div
                    className="results-breakdown__fill"
                    style={{
                      width: `${pct}%`,
                      background: pct === 100 ? "#22c55e" : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    }}
                  />
                </div>
                <div className="results-breakdown__counts">
                  {done}/{total} complete
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action plan */}
      {missed.length > 0 && (
        <section className="results-section">
          <h2 className="results-section__title">Your Action Plan</h2>
          <p className="results-section__desc">
            Prioritized by severity — tackle{" "}
            <span style={{ color: "#f87171" }}>Critical</span> and{" "}
            <span style={{ color: "#fb923c" }}>High</span> items first.
          </p>
          <div className="results-action-list">
            {missed.map((item) => {
              const sev = severityBadge[item.severity];
              return (
                <div key={item.id} className="results-action-item">
                  <div className="results-action-item__header">
                    <span className="results-action-item__cat">
                      {item.categoryIcon} {item.categoryTitle}
                    </span>
                    <span
                      className="results-action-item__severity"
                      style={{ background: sev.bg, color: sev.color }}
                    >
                      {sev.label}
                    </span>
                  </div>
                  <p className="results-action-item__text">{item.text}</p>
                  {item.tip && (
                    <div className="results-action-item__tip">
                      <strong>{item.tip.title}</strong>
                      <p>{item.tip.body}</p>
                      {item.tip.action && (
                        <div className="results-action-item__action-box">
                          <span className="results-action-item__action-label">
                            Action
                          </span>
                          <p>{item.tip.action}</p>
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
        <section className="results-allgood">
          <div className="results-allgood__icon">🏆</div>
          <h2>Perfect Score!</h2>
          <p>
            You've completed every check. Your digital security posture is
            excellent. Revisit this checkup periodically to stay on top of new
            threats.
          </p>
        </section>
      )}

      <div className="results-footer">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/checklist")}
        >
          ← Continue Checklist
        </button>
      </div>
    </main>
  );
}
