import type { ChecklistItem, Tip } from "../data/checklistData";

const severityConfig: Record<string, { label: string; color: string }> = {
  critical: { label: "Critical", color: "#ef4444" },
  high: { label: "High", color: "#f97316" },
  medium: { label: "Medium", color: "#f59e0b" },
  low: { label: "Low", color: "#84cc16" },
};

interface CheckItemProps {
  item: ChecklistItem;
  checked: boolean;
  onToggle: (id: string) => void;
  onTipClick: (tip: Tip) => void;
}

export default function CheckItem({ item, checked, onToggle, onTipClick }: CheckItemProps) {
  const sev = severityConfig[item.severity];

  return (
    <div
      className={[
        "flex items-start gap-[0.875rem] px-4 py-[0.875rem] rounded-[0.625rem] cursor-pointer transition-colors border select-none",
        checked
          ? "bg-indigo-500/[0.07] border-indigo-500/25 hover:bg-indigo-500/10"
          : "border-transparent hover:bg-white/[0.04] hover:border-white/[0.08]",
      ].join(" ")}
      onClick={() => onToggle(item.id)}
    >
      {/* Checkbox */}
      <div
        className={[
          "shrink-0 w-[22px] h-[22px] rounded-[6px] border-2 flex items-center justify-center mt-px transition-colors",
          checked ? "bg-indigo-500 border-indigo-500" : "border-white/20 bg-white/[0.03]",
        ].join(" ")}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <span className="text-white text-[0.8rem] font-bold leading-none">✓</span>}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={[
            "mb-[0.375rem] text-[0.9rem] leading-relaxed transition-colors",
            checked ? "text-slate-400 line-through decoration-slate-400/50" : "text-slate-300",
          ].join(" ")}
        >
          {item.text}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-[0.7rem] font-semibold uppercase tracking-[0.06em] px-[0.45rem] py-[0.1rem] rounded-full border border-current opacity-85"
            style={{ color: sev.color, borderColor: `${sev.color}40` }}
          >
            {sev.label}
          </span>
        </div>
      </div>

      {/* Tip button */}
      <button
        className="shrink-0 w-6 h-6 rounded-full border border-white/15 bg-white/5 text-slate-500 text-[0.75rem] font-bold cursor-pointer flex items-center justify-center transition-colors mt-px hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-300"
        onClick={(e) => {
          e.stopPropagation();
          onTipClick(item.tip);
        }}
        aria-label={`Learn more about: ${item.text}`}
        title="Learn more"
      >
        <span>?</span>
      </button>
    </div>
  );
}
