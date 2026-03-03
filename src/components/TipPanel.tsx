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
      className="fixed inset-0 bg-black/65 backdrop-blur-[4px] z-[200] flex items-center justify-center p-6"
      style={{ animation: "fade-in 0.15s ease" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-800 border border-white/10 rounded-2xl p-8 max-w-[480px] w-full relative shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
        style={{ animation: "slide-up 0.2s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-white/[0.08] border-none text-slate-400 w-7 h-7 rounded-full cursor-pointer text-[0.75rem] flex items-center justify-center transition-colors hover:bg-white/15 hover:text-slate-200"
          onClick={onClose}
          aria-label="Close tip"
        >
          <X size={14} />
        </button>
        <Lightbulb size={30} className="text-indigo-400 mb-3" />
        <h3 className="text-[1.1rem] font-bold text-slate-200 mb-3 leading-[1.3]">{tip.title}</h3>
        <p className="text-slate-400 text-[0.9rem] leading-relaxed mb-4">{tip.body}</p>
        {tip.action && (
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-4 py-3 mb-5">
            <span className="block uppercase text-[0.65rem] tracking-[0.08em] text-indigo-400 font-bold mb-[0.3rem]">Action</span>
            <p className="m-0 text-slate-300 text-[0.85rem] leading-relaxed">{tip.action}</p>
          </div>
        )}
        <button className="btn btn-primary w-full" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
