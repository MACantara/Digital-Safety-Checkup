import { useNavigate } from "react-router-dom";
import { ArrowRight, RotateCcw } from "lucide-react";
import { phases, totalPhases } from "../data/phaseData";

interface SummaryProps {
  completedPhases: Set<number>;
  onReset: () => void;
}

export default function Summary({ completedPhases, onReset }: SummaryProps) {
  const navigate = useNavigate();
  const completedCount = completedPhases.size;
  const allDone = completedCount === totalPhases;

  return (
    <main className="max-w-[720px] mx-auto px-6 pt-10 pb-20 flex flex-col gap-10">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-[1.5rem] px-8 py-10 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg shadow-indigo-500/20">
          {allDone ? "✓" : completedCount}
        </div>
        <div>
          <h1 className="text-[1.8rem] font-extrabold text-slate-100 tracking-[-0.025em] mb-2">
            {allDone
              ? "You finished the Digital Safety Checkup!"
              : `You completed ${completedCount} of ${totalPhases} phases`}
          </h1>
          <p className="text-slate-400 text-[0.9rem] leading-relaxed max-w-[480px] mx-auto">
            {allDone
              ? "You now know how to spot scams, protect your data, and upgrade your passwords. Those 15 minutes could save your accounts — and your money."
              : "Come back to complete the remaining phases — each one adds a practical layer of protection."}
          </p>
        </div>

        {/* Phase completion dots */}
        <div className="flex gap-3 mt-2">
          {phases.map((phase) => {
            const done = completedPhases.has(phase.id);
            const PhaseIcon = phase.icon;
            return (
              <div
                key={phase.id}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-colors ${
                  done
                    ? "border-indigo-500/40 bg-indigo-500/10"
                    : "border-white/[0.07] bg-slate-800/50"
                }`}
              >
                <PhaseIcon
                  size={16}
                  className={done ? "text-indigo-400" : "text-slate-600"}
                />
                <span
                  className={`text-[0.65rem] font-semibold ${
                    done ? "text-indigo-300" : "text-slate-600"
                  }`}
                >
                  {done ? "✓" : `P${phase.id}`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key takeaways — one per phase */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-slate-600">
          Key Takeaways
        </h2>
        <div className="flex flex-col gap-3">
          {phases.map((phase) => {
            const done = completedPhases.has(phase.id);
            const PhaseIcon = phase.icon;
            return (
              <div
                key={phase.id}
                className={`flex gap-4 items-start bg-slate-800 border rounded-xl px-5 py-4 ${
                  done ? "border-white/[0.08]" : "border-white/[0.04] opacity-50"
                }`}
              >
                <div
                  className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                    done
                      ? "bg-indigo-500/15 border border-indigo-500/25"
                      : "bg-slate-700 border border-white/[0.06]"
                  }`}
                >
                  <PhaseIcon
                    size={16}
                    className={done ? "text-indigo-400" : "text-slate-600"}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[0.7rem] font-bold uppercase tracking-[0.08em] mb-[0.3rem] ${
                      done ? "text-indigo-400" : "text-slate-600"
                    }`}
                  >
                    Phase {phase.id}: {phase.title}
                  </p>
                  <p
                    className={`text-[0.875rem] leading-relaxed ${
                      done ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {phase.summaryTakeaway}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Immediate actions */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-slate-600">
          Your 3 Immediate Actions
        </h2>
        <p className="text-[0.82rem] text-slate-500 -mt-1">
          Do these today — they cover 80% of your risk.
        </p>
        <div className="flex flex-col gap-3">
          {phases.map((phase, i) => (
            <div
              key={phase.id}
              className="flex gap-4 items-start bg-slate-800 border border-white/[0.07] rounded-xl px-5 py-4"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[0.72rem] font-extrabold text-white">
                {i + 1}
              </span>
              <p className="text-[0.875rem] text-slate-300 leading-relaxed">
                {phase.summaryAction}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* "If you only do one thing" callout */}
      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/6 px-6 py-5">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-amber-400 mb-2">
          If you only do one thing
        </p>
        <p className="text-[0.9rem] text-slate-300 leading-relaxed">
          Enable <strong className="text-white">2FA on your email account</strong> right now. Your email controls everything else — every password reset, every account. Protecting it is the single highest-impact action you can take. Takes under 2 minutes.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 flex-wrap pt-2 border-t border-white/[0.07]">
        {!allDone && (
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              const nextPhase = phases.find((p) => !completedPhases.has(p.id));
              if (nextPhase) navigate(`/phase/${nextPhase.id}/learn`);
            }}
          >
            Continue Where You Left Off <ArrowRight size={15} className="inline-block ml-1" />
          </button>
        )}
        <button
          className="btn btn-ghost flex items-center gap-2"
          onClick={() => {
            onReset();
            navigate("/");
          }}
        >
          <RotateCcw size={14} /> Start Over
        </button>
        <button
          className="btn btn-outline"
          onClick={() => navigate("/phase/1/learn")}
        >
          Review Phase 1
        </button>
      </div>
    </main>
  );
}
