import { useState } from "react";
import type { Category, Tip } from "../data/checklistData";
import CheckItem from "./CheckItem";

interface CategoryCardProps {
  category: Category;
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
  onTipClick: (tip: Tip) => void;
}

export default function CategoryCard({ category, checkedIds, onToggle, onTipClick }: CategoryCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  const total = category.items.length;
  const done = category.items.filter((i) => checkedIds.has(i.id)).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="bg-slate-800 border border-white/[0.08] rounded-2xl overflow-hidden transition-colors hover:border-white/[0.12]">
      <button
        className="w-full bg-transparent border-none cursor-pointer flex items-start justify-between gap-4 px-5 pt-5 pb-3 text-left font-[inherit]"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0 leading-none mt-[0.1rem]">{category.icon}</span>
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-200 mb-[0.2rem]">{category.title}</h2>
            <p className="text-[0.8rem] text-slate-500 leading-snug">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-[0.6rem] shrink-0">
          <span
            className={`text-[0.75rem] font-bold tabular-nums px-2 py-[0.2rem] rounded-full transition-colors ${
              done === total
                ? "bg-green-500/15 text-green-400"
                : "bg-white/[0.06] text-slate-500"
            }`}
          >
            {done}/{total}
          </span>
          <span
            className="text-slate-500 text-[1.1rem] transition-transform duration-200"
            style={{ display: "inline-block", transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </div>
      </button>

      <div className="h-[3px] bg-white/[0.06]">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-[400ms] rounded-[0_2px_2px_0]"
          style={{ width: `${pct}%` }}
        />
      </div>

      {!collapsed && (
        <div>
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
