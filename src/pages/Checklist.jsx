import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, calculateScore, totalItems } from "../data/checklistData";
import CheckItem from "../components/CheckItem";
import ScoreGauge from "../components/ScoreGauge";
import TipPanel from "../components/TipPanel";
import "./Checklist.css";

export default function Checklist({ checkedIds, onToggle }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTip, setActiveTip] = useState(null);

  const score = calculateScore(checkedIds);
  const doneCount = checkedIds.size;
  const category = categories[activeTab];
  const catDone = category.items.filter((i) => checkedIds.has(i.id)).length;
  const catTotal = category.items.length;
  const isFirst = activeTab === 0;
  const isLast = activeTab === categories.length - 1;

  const goNext = () => (isLast ? navigate("/results") : setActiveTab((t) => t + 1));
  const goPrev = () => setActiveTab((t) => t - 1);

  return (
    <>
      {activeTip && (
        <TipPanel tip={activeTip} onClose={() => setActiveTip(null)} />
      )}

      <div className="checklist-page">
        {/* Sidebar / tab strip */}
        <nav className="checklist-tabs" role="tablist" aria-label="Security categories">
          {categories.map((cat, i) => {
            const done = cat.items.filter((item) => checkedIds.has(item.id)).length;
            const complete = done === cat.items.length;
            const active = i === activeTab;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                className={[
                  "checklist-tab",
                  active ? "checklist-tab--active" : "",
                  complete ? "checklist-tab--done" : "",
                ].join(" ")}
                onClick={() => setActiveTab(i)}
              >
                <span className="checklist-tab__icon">{cat.icon}</span>
                <span className="checklist-tab__label">{cat.title}</span>
                {complete && (
                  <span className="checklist-tab__check" aria-label="Complete">✓</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active category panel */}
        <main className="checklist-panel" role="tabpanel">
          {/* Overall progress */}
          <div className="checklist-overall">
            <div className="checklist-overall__bar">
              <div
                className="checklist-overall__fill"
                style={{ width: `${(doneCount / totalItems) * 100}%` }}
              />
            </div>
            <span className="checklist-overall__label">
              {doneCount}/{totalItems} total
            </span>
          </div>

          {/* Category header */}
          <header className="checklist-cat-header">
            <div className="checklist-cat-header__top">
              <span className="checklist-cat-header__icon">{category.icon}</span>
              <div className="checklist-cat-header__title-block">
                <div className="checklist-cat-header__step">
                  Category {activeTab + 1} of {categories.length}
                </div>
                <h1 className="checklist-cat-header__title">{category.title}</h1>
              </div>
              <div className="checklist-cat-header__gauge">
                <ScoreGauge score={score} />
              </div>
            </div>
            <p className="checklist-cat-header__desc">{category.description}</p>
            <div className="checklist-cat-header__progress">
              <div className="checklist-cat-header__bar">
                <div
                  className="checklist-cat-header__fill"
                  style={{ width: `${(catDone / catTotal) * 100}%` }}
                />
              </div>
              <span className="checklist-cat-header__count">
                {catDone}/{catTotal} in this section
              </span>
            </div>
          </header>

          {/* Items */}
          <div className="checklist-items">
            {category.items.map((item) => (
              <CheckItem
                key={item.id}
                item={item}
                checked={checkedIds.has(item.id)}
                onToggle={onToggle}
                onTipClick={setActiveTip}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="checklist-nav">
            <button
              className="btn btn-outline"
              onClick={goPrev}
              disabled={isFirst}
            >
              ← Previous
            </button>
            <button className="btn btn-primary btn-lg" onClick={goNext}>
              {isLast
                ? "View My Results →"
                : `Next: ${categories[activeTab + 1].icon} ${categories[activeTab + 1].title} →`}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
