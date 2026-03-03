import type { Tip } from "../data/checklistData";
import { X, Lightbulb } from "lucide-react";

interface TipPanelProps {
  tip: Tip | null;
  onClose: () => void;
}

export default function TipPanel({ tip, onClose }: TipPanelProps) {
  if (!tip) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-[4px] z-[200] flex items-center justify-center p-6"
      style={{ animation: "fade-in 0.15s ease" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl p-8 max-w-[480px] w-full relative shadow-xl"
        style={{ animation: "slide-up 0.2s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-slate-100 border border-slate-200 text-slate-500 w-7 h-7 rounded-full cursor-pointer text-[0.75rem] flex items-center justify-center transition-colors hover:bg-slate-200 hover:text-slate-700"
          onClick={onClose}
          aria-label="Close tip"
        >
          <X size={14} />
        </button>
        <Lightbulb size={30} className="text-indigo-600 mb-3" />
        <h3 className="text-[1.1rem] font-bold text-slate-900 mb-3 leading-[1.3]">{tip.title}</h3>
        <p className="text-slate-600 text-[0.9rem] leading-relaxed mb-4">{tip.body}</p>
        {tip.action && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 mb-5">
            <span className="block uppercase text-[0.65rem] tracking-[0.08em] text-indigo-700 font-bold mb-[0.3rem]">Action</span>
            <p className="m-0 text-slate-700 text-[0.85rem] leading-relaxed">{tip.action}</p>
          </div>
        )}
        <button className="btn btn-primary w-full" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
