import type { ChecklistItem, Tip } from "../data/checklistData";
import { Check, HelpCircle } from "lucide-react";

const severityConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  critical: { label: "Critical", color: "#b91c1c", bg: "#fef2f2", border: "#fca5a5" },
  high: { label: "High", color: "#c2410c", bg: "#fff7ed", border: "#fdba74" },
  medium: { label: "Medium", color: "#b45309", bg: "#fffbeb", border: "#fcd34d" },
  low: { label: "Low", color: "#4d7c0f", bg: "#f7fee7", border: "#bef264" },
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
          ? "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
          : "border-transparent hover:bg-slate-50 hover:border-slate-200",
      ].join(" ")}
      onClick={() => onToggle(item.id)}
    >
      {/* Checkbox */}
      <div
        className={[
          "shrink-0 w-[22px] h-[22px] rounded-[6px] border-2 flex items-center justify-center mt-px transition-colors",
          checked ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-white",
        ].join(" ")}
        aria-checked={checked}
        role="checkbox"
      >
        {checked && <Check size={13} strokeWidth={3} className="text-white" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={[
            "mb-[0.375rem] text-[0.9rem] leading-relaxed transition-colors",
            checked ? "text-slate-500 line-through decoration-slate-400/70" : "text-slate-800",
          ].join(" ")}
        >
          {item.text}
        </p>
        <div className="flex items-center gap-2">
          <span
            className="text-[0.7rem] font-semibold uppercase tracking-[0.06em] px-[0.45rem] py-[0.1rem] rounded-full border"
            style={{ color: sev.color, backgroundColor: sev.bg, borderColor: sev.border }}
          >
            {sev.label}
          </span>
        </div>
      </div>

      {/* Tip button */}
      <button
        className="shrink-0 w-6 h-6 rounded-full border border-slate-300 bg-slate-100 text-slate-500 text-[0.75rem] font-bold cursor-pointer flex items-center justify-center transition-colors mt-px hover:bg-indigo-100 hover:border-indigo-300 hover:text-indigo-700"
        onClick={(e) => {
          e.stopPropagation();
          onTipClick(item.tip);
        }}
        aria-label={`Learn more about: ${item.text}`}
        title="Learn more"
      >
        <HelpCircle size={13} />
      </button>
    </div>
  );
}
