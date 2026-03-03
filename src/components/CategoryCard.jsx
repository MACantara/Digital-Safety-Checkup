import { useState } from "react";
import CheckItem from "./CheckItem";
import "./CategoryCard.css";

export default function CategoryCard({ category, checkedIds, onToggle, onTipClick }) {
  const [collapsed, setCollapsed] = useState(false);

  const total = category.items.length;
  const done = category.items.filter((i) => checkedIds.has(i.id)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="category-card">
      <button
        className="category-card__header"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
      >
        <div className="category-card__title-row">
          <span className="category-card__icon">{category.icon}</span>
          <div className="category-card__title-block">
            <h2 className="category-card__title">{category.title}</h2>
            <p className="category-card__desc">{category.description}</p>
          </div>
        </div>
        <div className="category-card__summary">
          <span
            className={`category-card__badge ${done === total ? "category-card__badge--done" : ""}`}
          >
            {done}/{total}
          </span>
          <span className={`category-card__chevron ${collapsed ? "category-card__chevron--collapsed" : ""}`}>
            ▾
          </span>
        </div>
      </button>

      <div className="category-card__progress-bar">
        <div
          className="category-card__progress-fill"
          style={{ width: `${pct}%` }}
        />
      </div>

      {!collapsed && (
        <div className="category-card__items">
          {category.items.map((item) => (
            <CheckItem
              key={item.id}
              item={item}
              checked={checkedIds.has(item.id)}
              onToggle={onToggle}
              onTipClick={onTipClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}
