import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp, MessageSquare, Mail, MessagesSquare } from "lucide-react";
import { phases } from "../data/phaseData";

// ─── Example message card ─────────────────────────────────────────────────────

function ExampleCard({
  type,
  sender,
  subject,
  content,
  label,
}: {
  type: "sms" | "email" | "dm";
  sender: string;
  subject?: string;
  content: string;
  label: string;
}) {
  const icons = {
    sms: <MessageSquare size={14} className="text-emerald-400" />,
    email: <Mail size={14} className="text-sky-400" />,
    dm: <MessagesSquare size={14} className="text-violet-400" />,
  };
  const colors = {
    sms: "border-emerald-500/30 bg-emerald-500/5",
    email: "border-sky-500/30 bg-sky-500/5",
    dm: "border-violet-500/30 bg-violet-500/5",
  };

  // Highlight "urgency" words and suspicious links
  const highlighted = content
    .replace(
      /\b(NOW|URGENT|immediately|immediately|suspend|suspended|suspension|disabled|permanently|blocked|locked)\b/gi,
      (m) => `⚑${m}⚑`
    )
    .split("⚑");

  return (
    <div className={`rounded-xl border ${colors[type]} p-4`}>
      <div className="flex items-center gap-2 mb-3">
        {icons[type]}
        <span className="text-[0.72rem] font-bold uppercase tracking-[0.08em] text-slate-500">
          {label}
        </span>
      </div>

      {/* Mock phone / message UI */}
      <div className="bg-slate-900 rounded-lg overflow-hidden border border-white/[0.06]">
        {/* Header bar */}
        <div className="px-4 py-[0.5rem] bg-slate-800 border-b border-white/[0.06] flex flex-col gap-[0.15rem]">
          <span className="text-[0.72rem] text-slate-400 font-medium">From: {sender}</span>
          {subject && (
            <span className="text-[0.72rem] text-slate-500">Subject: {subject}</span>
          )}
        </div>
        {/* Body */}
        <div className="px-4 py-3 text-[0.82rem] text-slate-300 leading-[1.65] whitespace-pre-wrap font-mono">
          {highlighted.map((segment, i) =>
            i % 2 === 1 ? (
              <mark
                key={i}
                className="bg-red-500/20 text-red-300 rounded px-[2px] not-italic font-medium"
              >
                {segment}
              </mark>
            ) : (
              <span key={i}>{segment}</span>
            )
          )}
        </div>
      </div>
      <p className="mt-2 text-[0.72rem] text-slate-600">
        ▲ Highlighted words are urgency triggers — red flags in action.
      </p>
    </div>
  );
}

// ─── Principle card ───────────────────────────────────────────────────────────

function PrincipleCard({
  index,
  title,
  what,
  how,
  why,
}: {
  index: number;
  title: string;
  what: string;
  how: string;
  why: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-slate-800 border border-white/[0.07] rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center gap-4 px-5 py-4 bg-transparent border-none text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {/* Number badge */}
        <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[0.78rem] font-extrabold text-white">
          {index + 1}
        </span>
        <span className="flex-1 text-[0.92rem] font-bold text-slate-200">{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-slate-500 shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-slate-500 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-white/[0.06]">
          {/* What */}
          <div className="pt-4">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-indigo-400 mb-1 block">
              What it is
            </span>
            <p className="text-[0.875rem] text-slate-300 leading-relaxed">{what}</p>
          </div>
          {/* How */}
          <div className="bg-slate-900/60 rounded-xl px-4 py-3">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-amber-400 mb-1 block">
              How it works
            </span>
            <p className="text-[0.875rem] text-slate-400 leading-relaxed whitespace-pre-line">{how}</p>
          </div>
          {/* Why */}
          <div className="flex gap-3">
            <div className="w-0.5 rounded-full bg-gradient-to-b from-rose-500 to-violet-500 shrink-0" />
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-rose-400 mb-1 block">
                Why it matters
              </span>
              <p className="text-[0.875rem] text-slate-400 leading-relaxed">{why}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PhaseLearn() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const navigate = useNavigate();
  const phase = phases.find((p) => p.id === Number(phaseId));

  if (!phase) {
    navigate("/", { replace: true });
    return null;
  }

  const PhaseIcon = phase.icon;
  const isFirst = phase.id === 1;

  return (
    <main className="max-w-[720px] mx-auto px-6 pt-10 pb-20 flex flex-col gap-8">
      {/* Phase header */}
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-indigo-400">
            Phase {phase.id} of {phases.length} · {phase.duration}
          </span>
        </div>
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <PhaseIcon size={24} className="text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-[1.8rem] font-extrabold text-slate-100 tracking-[-0.025em] leading-[1.1] mb-2">
              {phase.title}
            </h1>
            <p className="text-slate-400 text-[0.9rem] leading-relaxed">{phase.tagline}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[0.65rem] font-bold text-white">1</span>
            <span className="text-[0.72rem] font-semibold text-indigo-300">Learn</span>
          </div>
          <div className="flex-1 h-px bg-white/[0.1]" />
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[0.65rem] font-bold text-slate-500">2</span>
            <span className="text-[0.72rem] font-semibold text-slate-600">Activity</span>
          </div>
          {phase.id < phases.length && (
            <>
              <div className="flex-1 h-px bg-white/[0.1]" />
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[0.65rem] font-bold text-slate-500">→</span>
                <span className="text-[0.72rem] font-semibold text-slate-600">
                  Phase {phase.id + 1}
                </span>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Divider */}
      <hr className="border-white/[0.07]" />

      {/* Principles */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-slate-600">
          {isFirst
            ? "The 4 Red Flags to Memorise"
            : phase.id === 2
            ? "5 Protective Behaviours"
            : "The Core Formula"}
        </h2>
        {phase.principles.map((p, i) => (
          <PrincipleCard key={p.id} index={i} {...p} />
        ))}
      </section>

      {/* Examples (Phase 1 only — or any phase that has them) */}
      {phase.examples && phase.examples.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-slate-600">
              Real Examples — Spot the Red Flags
            </h2>
            <p className="text-[0.82rem] text-slate-500">
              Read each message below. Find the red flags before looking at the highlights.
            </p>
          </div>
          {phase.examples.map((ex) => (
            <ExampleCard key={ex.label} {...ex} />
          ))}
        </section>
      )}

      {/* CTA */}
      <div className="flex flex-col gap-3 pt-2 border-t border-white/[0.07]">
        <p className="text-[0.82rem] text-slate-500">
          Ready to test what you just learned?
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate(`/phase/${phase.id}/activity`)}
          >
            Start Activity <ArrowRight size={15} className="inline-block ml-1" />
          </button>
          {phase.id > 1 && (
            <button
              className="btn btn-ghost"
              onClick={() => navigate(`/phase/${phase.id - 1}/activity`)}
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
