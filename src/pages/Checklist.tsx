import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import type { Tip } from "../data/checklistData";
import { categories, calculateScore, totalItems } from "../data/checklistData";
import CheckItem from "../components/CheckItem";
import ScoreGauge from "../components/ScoreGauge";
import TipPanel from "../components/TipPanel";

interface ChecklistProps {
  checkedIds: Set<string>;
  onToggle: (id: string) => void;
}

export default function Checklist({ checkedIds, onToggle }: ChecklistProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeTip, setActiveTip] = useState<Tip | null>(null);

  const score = calculateScore(checkedIds);
  const doneCount = checkedIds.size;
  const category = categories[activeTab];
  const catDone = category.items.filter((i) => checkedIds.has(i.id)).length;
  const catTotal = category.items.length;
  const isFirst = activeTab === 0;
  const isLast = activeTab === categories.length - 1;

  const CategoryIcon = category.icon;
  const NextCatIcon = isLast ? null : categories[activeTab + 1].icon;
  const nextCatTitle = isLast ? "" : categories[activeTab + 1].title;

  const goNext = () => (isLast ? navigate("/results") : setActiveTab((t) => t + 1));
  const goPrev = () => setActiveTab((t) => t - 1);

  return (
    <>
      {activeTip && (
        <TipPanel tip={activeTip} onClose={() => setActiveTip(null)} />
      )}

      <div className="flex min-h-[calc(100vh-60px)] max-md:flex-col">
        {/* Sidebar / tab strip */}
        <nav
          className="w-[230px] shrink-0 bg-gray-900 border-r border-white/[0.07] flex flex-col py-3 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.08)_transparent] max-md:w-full max-md:h-auto max-md:static max-md:flex-row max-md:overflow-x-auto max-md:overflow-y-visible max-md:py-2 max-md:px-2 max-md:gap-[0.2rem] max-md:border-r-0 max-md:border-b max-md:[scrollbar-width:none]"
          role="tablist"
          aria-label="Security categories"
        >
          {categories.map((cat, i) => {
            const done = cat.items.filter((item) => checkedIds.has(item.id)).length;
            const complete = done === cat.items.length;
            const active = i === activeTab;
            const TabIcon = cat.icon;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={active}
                className={[
                  "relative flex items-center gap-[0.625rem] px-5 py-[0.65rem] bg-transparent border-none text-left cursor-pointer text-[0.8rem] font-medium font-[inherit] transition-colors leading-[1.35]",
                  "max-md:flex-col max-md:items-center max-md:gap-[0.2rem] max-md:px-3 max-md:py-[0.45rem] max-md:rounded-lg max-md:shrink-0 max-md:text-[0.65rem]",
                  active
                    ? "text-slate-200 bg-indigo-500/10"
                    : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-400",
                ].join(" ")}
                onClick={() => setActiveTab(i)}
              >
                {/* Active indicator bar (left on desktop, bottom on mobile) */}
                {active && (
                  <span className="tab-active-indicator max-md:top-auto max-md:bottom-0 max-md:left-[6px] max-md:right-[6px] max-md:w-auto max-md:h-[2px] max-md:rounded-[2px_2px_0_0]" />
                )}
                <TabIcon size={18} className="shrink-0" />
                <span className="flex-1 min-w-0">{cat.title}</span>
                {complete && (
                  <span className="text-[0.65rem] font-extrabold text-green-400 shrink-0 max-md:absolute max-md:top-1 max-md:right-[6px] max-md:text-[0.55rem]" aria-label="Complete">
                  <Check size={10} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active category panel */}
        <main
          className="flex-1 min-w-0 max-w-[680px] mx-auto px-10 pt-8 pb-20 flex flex-col gap-7 max-md:px-4 max-md:pt-5 max-md:pb-16 max-md:gap-5"
          role="tabpanel"
        >
          {/* Overall progress */}
          <div className="flex items-center gap-[0.875rem]">
            <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-[400ms] rounded-full"
                style={{ width: `${(doneCount / totalItems) * 100}%` }}
              />
            </div>
            <span className="text-[0.72rem] text-slate-600 whitespace-nowrap tabular-nums">
              {doneCount}/{totalItems} total
            </span>
          </div>

          {/* Category header */}
          <header className="flex flex-col gap-[0.875rem]">
            <div className="flex items-center gap-[0.875rem]">
              <CategoryIcon size={36} className="text-slate-300 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-indigo-500 mb-[0.2rem]">
                  Category {activeTab + 1} of {categories.length}
                </div>
                <h1 className="text-[1.65rem] font-extrabold text-slate-100 tracking-[-0.025em] leading-[1.15] max-md:text-[1.25rem]">
                  {category.title}
                </h1>
              </div>
              <div className="shrink-0 max-md:hidden">
                <ScoreGauge score={score} />
              </div>
            </div>
            <p className="text-slate-500 text-[0.875rem] leading-relaxed">{category.description}</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-[400ms] rounded-full"
                  style={{ width: `${(catDone / catTotal) * 100}%` }}
                />
              </div>
              <span className="text-[0.72rem] text-slate-600 whitespace-nowrap tabular-nums">
                {catDone}/{catTotal} in this section
              </span>
            </div>
          </header>

          {/* Items */}
          <div className="flex flex-col gap-1 bg-slate-800 border border-white/[0.07] rounded-2xl px-3 py-2">
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
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/[0.07]">
            <button
              className="btn btn-outline"
              onClick={goPrev}
              disabled={isFirst}
              style={{ opacity: isFirst ? 0.3 : undefined, cursor: isFirst ? "not-allowed" : undefined, pointerEvents: isFirst ? "none" : undefined }}
            >
              <><ArrowLeft size={15} className="inline-block mr-1" /> Previous</>
            </button>
            <button className="btn btn-primary btn-lg max-md:flex-1 max-md:text-[0.82rem]" onClick={goNext}>
              {isLast
                ? <>View My Results <ArrowRight size={15} className="inline-block ml-1" /></>
                : <>{NextCatIcon && <><span>Next:</span> <NextCatIcon size={14} className="inline-block" /></>} {nextCatTitle} <ArrowRight size={15} className="inline-block ml-1" /></>}
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
