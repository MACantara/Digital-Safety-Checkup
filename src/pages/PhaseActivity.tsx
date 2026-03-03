import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, XCircle, Circle, CheckSquare2, Square } from "lucide-react";
import { phases, totalPhases } from "../data/phaseData";

// ─── Option button ────────────────────────────────────────────────────────────

function OptionButton({
  text,
  selected,
  submitted,
  correct,
  feedback,
  multiSelect,
  onToggle,
}: {
  text: string;
  selected: boolean;
  submitted: boolean;
  correct: boolean;
  feedback: string;
  multiSelect: boolean;
  onToggle: () => void;
}) {
  const CheckIcon = multiSelect ? (selected ? CheckSquare2 : Square) : (selected ? CheckCircle2 : Circle);

  let borderColor = "border-white/[0.08]";
  let bg = "bg-slate-800 hover:bg-slate-750 hover:border-white/[0.14]";
  let textColor = "text-slate-300";
  let icon = <CheckIcon size={18} className="shrink-0 text-slate-500" />;

  if (submitted) {
    if (correct) {
      borderColor = "border-green-500/50";
      bg = "bg-green-500/8";
      textColor = "text-green-300";
      icon = <CheckCircle2 size={18} className="shrink-0 text-green-400" />;
    } else if (selected && !correct) {
      borderColor = "border-red-500/40";
      bg = "bg-red-500/8";
      textColor = "text-red-300";
      icon = <XCircle size={18} className="shrink-0 text-red-400" />;
    } else {
      bg = "bg-slate-800";
      textColor = "text-slate-500";
    }
  } else if (selected) {
    borderColor = "border-indigo-500/60";
    bg = "bg-indigo-500/10 hover:bg-indigo-500/12";
    textColor = "text-indigo-200";
    icon = <CheckIcon size={18} className="shrink-0 text-indigo-400" />;
  }

  return (
    <div className="flex flex-col gap-0">
      <button
        disabled={submitted}
        onClick={onToggle}
        className={`w-full flex items-start gap-3 text-left border rounded-xl px-4 py-3 transition-colors cursor-pointer font-[inherit] ${bg} ${borderColor} ${submitted ? "cursor-default" : ""}`}
      >
        {icon}
        <span className={`text-[0.875rem] leading-relaxed ${textColor} font-medium`}>{text}</span>
      </button>

      {/* Feedback message — shown after submission for selected or correct items */}
      {submitted && (selected || correct) && (
        <div
          className={`mx-2 px-4 py-2 rounded-b-xl text-[0.78rem] leading-relaxed ${
            correct
              ? "bg-green-500/8 text-green-400 border border-t-0 border-green-500/30"
              : selected && !correct
              ? "bg-red-500/8 text-red-400 border border-t-0 border-red-500/30"
              : ""
          }`}
        >
          {feedback}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface PhaseActivityProps {
  onComplete: (phaseId: number) => void;
}

export default function PhaseActivity({ onComplete }: PhaseActivityProps) {
  const { phaseId } = useParams<{ phaseId: string }>();
  const navigate = useNavigate();
  const phase = phases.find((p) => p.id === Number(phaseId));

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  if (!phase) {
    navigate("/", { replace: true });
    return null;
  }

  const { activity } = phase;
  const PhaseIcon = phase.icon;
  const isLastPhase = phase.id === totalPhases;

  const correctIds = new Set(activity.options.filter((o) => o.correct).map((o) => o.id));
  const selectedCorrectCount = [...selected].filter((id) => correctIds.has(id)).length;
  const selectedWrongCount = [...selected].filter((id) => !correctIds.has(id)).length;

  const isCorrect =
    submitted &&
    selectedCorrectCount === correctIds.size &&
    selectedWrongCount === 0;

  const toggle = (id: string) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (activity.multiSelect) {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      } else {
        // single select
        next.clear();
        if (!prev.has(id)) next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    setSubmitted(true);
    onComplete(phase.id);
  };

  const handleNext = () => {
    if (isLastPhase) {
      navigate("/summary");
    } else {
      navigate(`/phase/${phase.id + 1}/learn`);
    }
  };

  const handleBack = () => {
    navigate(`/phase/${phase.id}/learn`);
  };

  return (
    <main className="max-w-[680px] mx-auto px-6 pt-10 pb-20 flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-indigo-400">
            Phase {phase.id} of {totalPhases} · Activity
          </span>
        </div>
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <PhaseIcon size={20} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-[1.3rem] font-extrabold text-slate-100 tracking-[-0.02em] leading-snug">
              {phase.title}
            </h1>
            <p className="text-[0.75rem] text-slate-500 mt-[0.2rem]">Apply what you just learned</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-[0.65rem] font-bold text-slate-300">✓</span>
            <span className="text-[0.72rem] font-semibold text-slate-500">Learn</span>
          </div>
          <div className="flex-1 h-px bg-white/[0.1]" />
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[0.65rem] font-bold text-white">2</span>
            <span className="text-[0.72rem] font-semibold text-indigo-300">Activity</span>
          </div>
          {!isLastPhase && (
            <>
              <div className="flex-1 h-px bg-white/[0.1]" />
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[0.65rem] font-bold text-slate-500">→</span>
                <span className="text-[0.72rem] font-semibold text-slate-600">Phase {phase.id + 1}</span>
              </div>
            </>
          )}
        </div>
      </header>

      <hr className="border-white/[0.07]" />

      {/* Question */}
      <section className="flex flex-col gap-4">
        {/* Context box (fake message) */}
        {activity.context && (
          <div className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-slate-600">
              {activity.contextLabel ?? "Read carefully:"}
            </span>
            <div className="bg-slate-900 border border-white/[0.08] rounded-xl px-5 py-4">
              <p className="text-[0.875rem] text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                {activity.context}
              </p>
            </div>
          </div>
        )}

        {/* Prompt */}
        <div className="flex flex-col gap-2">
          <p className="text-[1.05rem] font-bold text-slate-100 leading-snug">
            {activity.question}
          </p>
          {activity.multiSelect && (
            <p className="text-[0.75rem] text-slate-500">Select all that apply.</p>
          )}
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {activity.options.map((opt) => (
            <OptionButton
              key={opt.id}
              text={opt.text}
              selected={selected.has(opt.id)}
              submitted={submitted}
              correct={opt.correct}
              feedback={opt.feedback}
              multiSelect={activity.multiSelect}
              onToggle={() => toggle(opt.id)}
            />
          ))}
        </div>
      </section>

      {/* Submit / result */}
      {!submitted ? (
        <button
          className="btn btn-primary btn-lg self-start"
          disabled={selected.size === 0}
          onClick={handleSubmit}
          style={{ opacity: selected.size === 0 ? 0.4 : undefined, cursor: selected.size === 0 ? "not-allowed" : undefined }}
        >
          Check Answer
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Result banner */}
          <div
            className={`rounded-2xl border px-5 py-4 ${
              isCorrect
                ? "bg-green-500/8 border-green-500/30"
                : "bg-amber-500/8 border-amber-500/30"
            }`}
          >
            <p
              className={`text-[0.85rem] font-bold mb-1 ${
                isCorrect ? "text-green-300" : "text-amber-300"
              }`}
            >
              {isCorrect ? "✓ Correct!" : "Here's what to remember:"}
            </p>
            <p className="text-[0.82rem] text-slate-400 leading-relaxed">
              {activity.correctExplanation}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 flex-wrap pt-2 border-t border-white/[0.07]">
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              {isLastPhase ? (
                <>See My Summary <ArrowRight size={15} className="inline-block ml-1" /></>
              ) : (
                <>Next: Phase {phase.id + 1} <ArrowRight size={15} className="inline-block ml-1" /></>
              )}
            </button>
            <button className="btn btn-ghost" onClick={handleBack}>
              ← Review Phase
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
