import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, calculateScore } from "../data/checklistData";
import CategoryCard from "../components/CategoryCard";
import ScoreGauge from "../components/ScoreGauge";
import TipPanel from "../components/TipPanel";
import "./Checklist.css";

export default function Checklist({ checkedIds, onToggle }) {
  const navigate = useNavigate();
  const [activeTip, setActiveTip] = useState(null);

  const score = calculateScore(checkedIds);
  const totalCount = categories.reduce((s, c) => s + c.items.length, 0);
  const doneCount = checkedIds.size;

  return (
    <>
      {activeTip && (
        <TipPanel tip={activeTip} onClose={() => setActiveTip(null)} />
      )}

      <main className="checklist-page">
        <div className="checklist-page__sidebar">
          <div className="checklist-page__score-card">
            <ScoreGauge score={score} />
            <div className="checklist-page__score-meta">
              <span className="checklist-page__done-label">
                {doneCount} of {totalCount} done
              </span>
              <div className="checklist-page__overall-bar">
                <div
                  className="checklist-page__overall-fill"
                  style={{ width: `${(doneCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
            <button
              className="btn btn-primary checklist-page__results-btn"
              onClick={() => navigate("/results")}
            >
              View Results →
            </button>
          </div>

          <div className="checklist-page__cat-nav">
            {categories.map((cat) => {
              const done = cat.items.filter((i) => checkedIds.has(i.id)).length;
              const total = cat.items.length;
              return (
                <a
                  key={cat.id}
                  href={`#cat-${cat.id}`}
                  className="checklist-page__nav-item"
                >
                  <span>{cat.icon}</span>
                  <span className="checklist-page__nav-label">{cat.title}</span>
                  <span
                    className={`checklist-page__nav-badge ${
                      done === total ? "checklist-page__nav-badge--done" : ""
                    }`}
                  >
                    {done}/{total}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="checklist-page__main">
          <header className="checklist-page__header">
            <h1 className="checklist-page__title">Your Safety Checklist</h1>
            <p className="checklist-page__hint">
              Check off items you've completed. Click <strong>?</strong> to learn
              more about any item.
            </p>
          </header>

          <div className="checklist-page__categories">
            {categories.map((cat) => (
              <div key={cat.id} id={`cat-${cat.id}`}>
                <CategoryCard
                  category={cat}
                  checkedIds={checkedIds}
                  onToggle={onToggle}
                  onTipClick={setActiveTip}
                />
              </div>
            ))}
          </div>

          <div className="checklist-page__footer-action">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/results")}
            >
              View My Results →
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
