import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const CategoryIcon = category.icon;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors hover:border-slate-300">
      <button
        className="w-full bg-transparent border-none cursor-pointer flex items-start justify-between gap-4 px-5 pt-5 pb-3 text-left font-[inherit]"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
      >
        <div className="flex items-start gap-3">
          <CategoryIcon size={22} className="text-slate-600 shrink-0 mt-[0.1rem]" />
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-900 mb-[0.2rem]">{category.title}</h2>
            <p className="text-[0.8rem] text-slate-600 leading-snug">{category.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-[0.6rem] shrink-0">
          <span
            className={`text-[0.75rem] font-bold tabular-nums px-2 py-[0.2rem] rounded-full transition-colors ${
              done === total
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {done}/{total}
          </span>
          <ChevronDown
            size={18}
            className="text-slate-400 shrink-0 transition-transform duration-200"
            style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
          />
        </div>
      </button>

      <div className="h-[3px] bg-slate-100">
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
