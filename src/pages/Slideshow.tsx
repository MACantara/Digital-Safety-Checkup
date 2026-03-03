import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Mail,
  MessagesSquare,
  Target,
  Keyboard,
} from "lucide-react";
import {
  phases,
  totalPhases,
  type Phase,
  type Principle,
  type ExampleMessage,
  type ActivityOption,
} from "../data/phaseData";

// ─── Slide type system ────────────────────────────────────────────────────────

type Slide =
  | { type: "title" }
  | { type: "context" }
  | { type: "principle"; index: number }
  | { type: "examples" }
  | { type: "activity" }
  | { type: "takeaway" };

function buildSlides(phase: Phase): Slide[] {
  const slides: Slide[] = [{ type: "title" }];
  if (phase.context) slides.push({ type: "context" });
  phase.principles.forEach((_, i) => slides.push({ type: "principle", index: i }));
  if (phase.examples?.length) slides.push({ type: "examples" });
  slides.push({ type: "activity" });
  slides.push({ type: "takeaway" });
  return slides;
}

// ─── Shared wrapper ───────────────────────────────────────────────────────────

function SlideWrapper({
  children,
  dir,
  slideKey,
  centered = false,
}: {
  children: React.ReactNode;
  dir: "fwd" | "back";
  slideKey: string | number;
  centered?: boolean;
}) {
  return (
    <div
      key={slideKey}
      className={`flex-1 flex ${centered ? "items-center justify-center" : "items-start"} px-10 py-10 max-md:px-5 max-md:py-6 ${dir === "fwd" ? "slide-anim-fwd" : "slide-anim-back"}`}
    >
      <div className={`w-full ${centered ? "max-w-[860px]" : "max-w-[960px] mx-auto"}`}>
        {children}
      </div>
    </div>
  );
}

// ─── Slide: Context ──────────────────────────────────────────────────────────

function ContextSlide({ phase, dir }: { phase: Phase; dir: "fwd" | "back" }) {
  const ctx = phase.context;
  if (!ctx) return null;

  const phaseColors = [
    {
      accent: "text-rose-400",
      border: "border-rose-500/25",
      bg: "bg-rose-500/10",
      badge: "bg-rose-500/15 text-rose-300 border border-rose-500/30",
      rankBg: "bg-rose-500/10",
    },
    {
      accent: "text-sky-400",
      border: "border-sky-500/25",
      bg: "bg-sky-500/10",
      badge: "bg-sky-500/15 text-sky-300 border border-sky-500/30",
      rankBg: "bg-sky-500/10",
    },
    {
      accent: "text-emerald-400",
      border: "border-emerald-500/25",
      bg: "bg-emerald-500/10",
      badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
      rankBg: "bg-emerald-500/10",
    },
  ];
  const color = phaseColors[phase.id - 1] ?? phaseColors[0];
  const isTenItems = ctx.items.length >= 8;

  return (
    <SlideWrapper dir={dir} slideKey="context">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <span className={`text-[0.8rem] font-extrabold uppercase tracking-[0.2em] ${color.accent}`}>
            Context
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-slate-100 tracking-[-0.035em] leading-[1.1]">
            {ctx.slideTitle}
          </h2>
          {ctx.subtitle && (
            <p className="text-slate-400 text-[0.9rem] mt-1 max-w-[680px] leading-relaxed">
              {ctx.subtitle}
            </p>
          )}
        </div>

        {/* Items grid */}
        <div
          className={`grid ${
            isTenItems ? "grid-cols-2 max-md:grid-cols-1" : "grid-cols-2 max-md:grid-cols-1"
          } gap-2.5`}
        >
          {ctx.items.map((item) => (
            <div
              key={item.rank}
              className="flex items-start gap-3 bg-slate-800/50 border border-white/[0.06] rounded-xl px-4 py-3 hover:border-white/[0.12] transition-colors"
            >
              {/* Rank badge */}
              <span
                className={`shrink-0 w-7 h-7 rounded-lg ${color.rankBg} border ${color.border} flex items-center justify-center text-[0.72rem] font-extrabold ${color.accent} mt-0.5`}
              >
                {item.rank}
              </span>

              <div className="flex-1 min-w-0">
                {/* Label row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[0.92rem] font-bold text-slate-100">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[0.62rem] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full ${color.badge}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                {/* Detail */}
                <p className="text-[0.8rem] text-slate-400 leading-snug mt-0.5">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        {ctx.footnote && (
          <p className="text-[0.7rem] text-slate-600 border-t border-white/[0.05] pt-3 leading-relaxed">
            {ctx.footnote}
          </p>
        )}
      </div>
    </SlideWrapper>
  );
}

// ─── Slide: Title ─────────────────────────────────────────────────────────────

function TitleSlide({ phase, dir }: { phase: Phase; dir: "fwd" | "back" }) {
  const PhaseIcon = phase.icon;
  const phaseColors = [
    { text: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10", icon: "text-rose-400" },
    { text: "text-sky-400",  border: "border-sky-500/30",  bg: "bg-sky-500/10",  icon: "text-sky-400"  },
    { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10", icon: "text-emerald-400" },
  ];
  const color = phaseColors[phase.id - 1] ?? phaseColors[0];

  return (
    <SlideWrapper dir={dir} slideKey="title" centered>
      <div className="flex flex-col items-center text-center gap-8">
        {/* Icon */}
        <div className={`w-24 h-24 rounded-3xl ${color.bg} border ${color.border} flex items-center justify-center shadow-2xl`}>
          <PhaseIcon size={48} className={color.icon} />
        </div>

        {/* Eye-catching phase label */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[0.85rem] font-extrabold uppercase tracking-[0.22em] text-indigo-400">
            Phase {phase.id} of {totalPhases} &nbsp;·&nbsp; {phase.duration}
          </span>
          <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-extrabold text-slate-100 tracking-[-0.045em] leading-[1] max-w-[800px]">
            {phase.title}
          </h1>
          <p className="text-[clamp(1rem,2.5vw,1.4rem)] text-slate-400 max-w-[580px] leading-relaxed">
            {phase.tagline}
          </p>
        </div>

        {/* Content preview pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {phase.principles.map((p, i) => (
            <span
              key={p.id}
              className="px-5 py-[0.5rem] rounded-full bg-slate-800 border border-white/[0.09] text-slate-400 text-[0.9rem] font-semibold"
            >
              {i + 1}. {p.title}
            </span>
          ))}
          {phase.examples && (
            <span className="px-5 py-[0.5rem] rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[0.9rem] font-semibold">
              Real Examples
            </span>
          )}
          <span className="px-5 py-[0.5rem] rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-400 text-[0.9rem] font-semibold">
            Live Quiz
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-600 text-[0.78rem] mt-2">
          <Keyboard size={12} />
          <span>Use ← → arrow keys or click the buttons below to navigate</span>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ─── Slide: Principle ─────────────────────────────────────────────────────────

function PrincipleSlide({
  phase,
  principle,
  index,
  dir,
}: {
  phase: Phase;
  principle: Principle;
  index: number;
  dir: "fwd" | "back";
}) {
  const total = phase.principles.length;
  const label =
    phase.id === 1 ? "Red Flag" : phase.id === 2 ? "Behaviour" : "Principle";

  return (
    <SlideWrapper dir={dir} slideKey={`principle-${index}`}>
      <div className="flex flex-col gap-8">
        {/* Phase label */}
        <div>
          <span className="text-[0.8rem] font-extrabold uppercase tracking-[0.2em] text-indigo-400">
            {label} {index + 1} of {total}
          </span>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-[1fr_1.1fr] gap-8 items-start max-lg:grid-cols-1 max-lg:gap-6">
          {/* LEFT — number badge + title + what */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-5">
              <span className="shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[2rem] font-extrabold text-white shadow-xl shadow-indigo-500/25">
                {index + 1}
              </span>
              <h2 className="text-[clamp(1.9rem,4.5vw,3.2rem)] font-extrabold text-slate-100 tracking-[-0.035em] leading-[1.1] pt-1">
                {principle.title}
              </h2>
            </div>

            <div className="bg-slate-800/50 border border-white/[0.07] rounded-2xl px-6 py-5">
              <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-indigo-400 mb-2 block">
                What it is
              </span>
              <p className="text-[clamp(0.95rem,2vw,1.15rem)] text-slate-200 leading-relaxed">
                {principle.what}
              </p>
            </div>
          </div>

          {/* RIGHT — how + why */}
          <div className="flex flex-col gap-4">
            <div className="bg-amber-500/8 border border-amber-500/25 rounded-2xl px-6 py-5">
              <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-amber-400 mb-2 block">
                How it happens
              </span>
              <p className="text-[clamp(0.9rem,1.8vw,1.1rem)] text-slate-300 leading-relaxed whitespace-pre-line">
                {principle.how}
              </p>
            </div>

            <div className="bg-rose-500/8 border border-rose-500/25 rounded-2xl px-6 py-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-rose-400">
                  Why it works on us
                </span>
              </div>
              <p className="text-[clamp(0.9rem,1.8vw,1.1rem)] text-slate-300 leading-relaxed">
                {principle.why}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ─── Slide: Examples ──────────────────────────────────────────────────────────

function RedFlagTag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[0.72rem] font-bold">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 flag-ring inline-block shrink-0" />
      {text}
    </span>
  );
}

function MockMessage({ ex }: { ex: ExampleMessage }) {
  const typeConfig = {
    sms: {
      icon: <MessageSquare size={13} className="text-emerald-400" />,
      headerBg: "bg-emerald-900/30",
      border: "border-emerald-500/25",
      accent: "text-emerald-300",
    },
    email: {
      icon: <Mail size={13} className="text-sky-400" />,
      headerBg: "bg-sky-900/30",
      border: "border-sky-500/25",
      accent: "text-sky-300",
    },
    dm: {
      icon: <MessagesSquare size={13} className="text-violet-400" />,
      headerBg: "bg-violet-900/30",
      border: "border-violet-500/25",
      accent: "text-violet-300",
    },
  };
  const cfg = typeConfig[ex.type];

  // Highlight urgency words
  const urgencyRe =
    /\b(NOW|URGENT|immediately|suspend|suspended|suspension|disabled|permanently|blocked|locked|required|warning|limited|24 hours)\b/gi;
  // Highlight suspicious domains/links
  const domainRe =
    /\b\S+\.(net|xyz|info|org|biz)[\S]*/gi;

  function annotate(text: string): React.ReactNode[] {
    // Combine both patterns
    const combined = new RegExp(
      `(${urgencyRe.source})|(${domainRe.source})`,
      "gi"
    );
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;
    combined.lastIndex = 0;
    while ((match = combined.exec(text)) !== null) {
      if (match.index > last) parts.push(text.slice(last, match.index));
      const isUrgency = urgencyRe.test(match[0]);
      urgencyRe.lastIndex = 0;
      if (isUrgency) {
        parts.push(
          <mark
            key={match.index}
            className="bg-red-500/25 text-red-200 rounded-[3px] px-[2px] not-italic font-bold"
          >
            {match[0]}
          </mark>
        );
      } else {
        parts.push(
          <mark
            key={match.index}
            className="bg-orange-500/25 text-orange-200 rounded-[3px] px-[2px] not-italic font-bold underline decoration-orange-400 decoration-dotted"
          >
            {match[0]}
          </mark>
        );
      }
      last = match.index + match[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }

  return (
    <div className={`flex flex-col rounded-2xl border ${cfg.border} overflow-hidden bg-slate-900`}>
      {/* Type tag */}
      <div className={`${cfg.headerBg} px-4 py-[0.55rem] flex items-center gap-2 border-b ${cfg.border}`}>
        {cfg.icon}
        <span className={`text-[0.72rem] font-extrabold uppercase tracking-[0.1em] ${cfg.accent}`}>
          {ex.label}
        </span>
      </div>

      {/* Sender / subject line */}
      <div className="px-4 py-2 bg-slate-800/60 border-b border-white/[0.06] flex flex-col gap-[0.15rem]">
        <span className="text-[0.72rem] text-slate-400 font-medium">
          From: <span className="text-slate-300">{ex.sender}</span>
        </span>
        {ex.subject && (
          <span className="text-[0.72rem] text-slate-500">
            Subject: {ex.subject}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-4 py-4 text-[0.82rem] text-slate-300 leading-[1.75] whitespace-pre-wrap font-mono flex-1">
        {annotate(ex.content)}
      </div>
    </div>
  );
}

function ExamplesSlide({ phase, dir }: { phase: Phase; dir: "fwd" | "back" }) {
  const examples = phase.examples ?? [];
  return (
    <SlideWrapper dir={dir} slideKey="examples">
      <div className="flex flex-col gap-7">
        {/* Heading */}
        <div className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-extrabold uppercase tracking-[0.2em] text-indigo-400">
            Real Examples
          </span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-extrabold text-slate-100 tracking-[-0.03em] leading-[1.1]">
            Can You Spot the Red Flags?
          </h2>
          <p className="text-[1rem] text-slate-400">
            These are real scam scripts. Highlighted in{" "}
            <span className="text-red-300 font-semibold">red</span> = urgency triggers. Highlighted in{" "}
            <span className="text-orange-300 font-semibold">orange</span> = suspicious links.
          </p>
        </div>

        {/* Messages side by side */}
        <div className={`grid gap-5 ${examples.length === 3 ? "grid-cols-3 max-lg:grid-cols-1" : examples.length === 2 ? "grid-cols-2 max-md:grid-cols-1" : "grid-cols-1"}`}>
          {examples.map((ex) => (
            <MockMessage key={ex.label} ex={ex} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-2">
          <RedFlagTag text="Urgency trigger — forces panic, stops thinking" />
          <RedFlagTag text="Fake domain — looks real, but it isn't" />
        </div>

        {/* Reminder */}
        <div className="bg-slate-800 border border-white/[0.07] rounded-2xl px-6 py-4 flex items-start gap-4">
          <span className="text-2xl shrink-0">💡</span>
          <p className="text-[0.95rem] text-slate-300 leading-relaxed">
            <strong className="text-slate-100">Remember:</strong> Real banks, GCash, and Facebook{" "}
            <strong className="text-white">never</strong> send links asking you to verify outside
            their official app. Every one of these messages is a scam.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ─── Slide: Activity ──────────────────────────────────────────────────────────

function ActivitySlide({
  phase,
  dir,
  submitted,
  selected,
  onToggle,
  onSubmit,
}: {
  phase: Phase;
  dir: "fwd" | "back";
  submitted: boolean;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onSubmit: () => void;
}) {
  const { activity } = phase;

  const correctIds = new Set(activity.options.filter((o) => o.correct).map((o) => o.id));
  const isCorrect =
    submitted &&
    [...selected].every((id) => correctIds.has(id)) &&
    selected.size === correctIds.size;

  return (
    <SlideWrapper dir={dir} slideKey="activity">
      <div className="flex flex-col gap-7">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="text-[0.8rem] font-extrabold uppercase tracking-[0.2em] text-violet-400">
            Quiz Time
          </span>
          <h2 className="text-[clamp(1.4rem,3.5vw,2.2rem)] font-extrabold text-slate-100 tracking-[-0.03em] leading-[1.2]">
            {activity.question}
          </h2>
          {activity.multiSelect && (
            <p className="text-slate-500 text-[0.9rem]">Select all that apply.</p>
          )}
        </div>

        {/* Context message */}
        {activity.context && (
          <div className="flex flex-col gap-2">
            <span className="text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-slate-500">
              {activity.contextLabel ?? "Read this message:"}
            </span>
            <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              {/* Fake phone status bar */}
              <div className="bg-slate-800 px-5 py-2 flex items-center gap-2 border-b border-white/[0.06]">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">
                  SMS Message
                </span>
              </div>
              <p className="px-6 py-5 text-[1rem] text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">
                {activity.context}
              </p>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="flex flex-col gap-3">
          {activity.options.map((opt, i) => (
            <ActivityOption
              key={opt.id}
              opt={opt}
              index={i}
              selected={selected.has(opt.id)}
              submitted={submitted}
              onToggle={() => onToggle(opt.id)}
            />
          ))}
        </div>

        {/* Submit */}
        {!submitted ? (
          <button
            className="btn btn-primary"
            style={{
              fontSize: "1rem",
              padding: "0.75rem 2rem",
              width: "fit-content",
              opacity: selected.size === 0 ? 0.4 : 1,
              cursor: selected.size === 0 ? "not-allowed" : "pointer",
            }}
            disabled={selected.size === 0}
            onClick={onSubmit}
          >
            Check Answer
          </button>
        ) : (
          <div
            className={`rounded-2xl border px-6 py-5 ${
              isCorrect
                ? "bg-green-500/8 border-green-500/30"
                : "bg-amber-500/8 border-amber-500/30"
            }`}
          >
            <p
              className={`text-[1rem] font-extrabold mb-2 ${
                isCorrect ? "text-green-300" : "text-amber-300"
              }`}
            >
              {isCorrect ? "✓ Correct!" : "Here's what to know:"}
            </p>
            <p className="text-[0.9rem] text-slate-300 leading-relaxed">
              {activity.correctExplanation}
            </p>
          </div>
        )}
      </div>
    </SlideWrapper>
  );
}

function ActivityOption({
  opt,
  index,
  selected,
  submitted,
  onToggle,
}: {
  opt: ActivityOption;
  index: number;
  selected: boolean;
  submitted: boolean;
  onToggle: () => void;
}) {
  const letters = ["A", "B", "C", "D", "E"];
  const letter = letters[index] ?? String(index + 1);

  let containerCls =
    "flex items-start gap-4 border rounded-2xl px-5 py-4 transition-all cursor-pointer text-left w-full font-[inherit] bg-transparent";
  let letterBg = "bg-slate-700 text-slate-400";
  let textCls = "text-slate-300";

  if (!submitted) {
    if (selected) {
      containerCls += " border-indigo-500/60 bg-indigo-500/10";
      letterBg = "bg-indigo-500 text-white";
      textCls = "text-indigo-100";
    } else {
      containerCls += " border-white/[0.08] bg-slate-800 hover:border-white/[0.18] hover:bg-slate-750";
    }
  } else {
    if (opt.correct) {
      containerCls += " border-green-500/50 bg-green-500/8";
      letterBg = "bg-green-500 text-white";
      textCls = "text-green-200";
    } else if (selected && !opt.correct) {
      containerCls += " border-red-500/40 bg-red-500/8";
      letterBg = "bg-red-500 text-white";
      textCls = "text-red-300";
    } else {
      containerCls += " border-white/[0.05] bg-slate-800/50 opacity-50";
    }
  }

  return (
    <div className="flex flex-col gap-0 pop-in" style={{ animationDelay: `${index * 0.05}s` }}>
      <button
        disabled={submitted}
        onClick={onToggle}
        className={containerCls}
      >
        {/* Letter badge */}
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[0.78rem] font-extrabold transition-colors ${letterBg}`}
        >
          {submitted ? (
            opt.correct ? (
              <CheckCircle2 size={16} />
            ) : selected ? (
              <XCircle size={16} />
            ) : (
              letter
            )
          ) : (
            letter
          )}
        </span>

        <span className={`text-[1rem] leading-relaxed font-medium ${textCls}`}>
          {opt.text}
        </span>
      </button>

      {/* Feedback */}
      {submitted && (selected || opt.correct) && (
        <div
          className={`mx-3 px-5 py-3 rounded-b-xl text-[0.83rem] leading-relaxed border border-t-0 ${
            opt.correct
              ? "bg-green-500/6 text-green-400 border-green-500/30"
              : "bg-red-500/6 text-red-400 border-red-500/25"
          }`}
        >
          {opt.feedback}
        </div>
      )}
    </div>
  );
}

// ─── Slide: Takeaway ──────────────────────────────────────────────────────────

function TakeawaySlide({
  phase,
  dir,
  isLast,
  onNext,
}: {
  phase: Phase;
  dir: "fwd" | "back";
  isLast: boolean;
  onNext: () => void;
}) {
  const PhaseIcon = phase.icon;
  return (
    <SlideWrapper dir={dir} slideKey="takeaway" centered>
      <div className="flex flex-col items-center text-center gap-8 max-w-[680px] mx-auto">
        {/* Phase icon in completion state */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center shadow-xl shadow-green-500/10">
            <PhaseIcon size={36} className="text-green-400" />
          </div>
          <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-[0.75rem] font-extrabold border-2 border-slate-950">
            ✓
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[0.9rem] font-extrabold uppercase tracking-[0.2em] text-green-400">
            Phase {phase.id} Complete
          </p>
          <h2 className="text-[clamp(1.6rem,4vw,2.6rem)] font-extrabold text-slate-100 tracking-[-0.03em] leading-[1.2]">
            {phase.summaryTakeaway}
          </h2>
        </div>

        {/* Action box */}
        <div className="w-full bg-indigo-500/10 border border-indigo-500/30 rounded-2xl px-7 py-6 text-left flex gap-4 items-start">
          <Target size={24} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.15em] text-indigo-400 mb-2">
              Your Action
            </p>
            <p className="text-[1rem] text-slate-200 leading-relaxed">
              {phase.summaryAction}
            </p>
          </div>
        </div>

        <button className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.85rem 2.5rem" }} onClick={onNext}>
          {isLast ? "View Full Summary" : `Next: Phase ${phase.id + 1}`}
          <ArrowRight size={16} className="inline-block ml-1" />
        </button>
      </div>
    </SlideWrapper>
  );
}

// ─── Nav bar ─────────────────────────────────────────────────────────────────

function NavBar({
  slideIndex,
  totalSlides,
  slideLabels,
  canGoNext,
  onPrev,
  onNext,
}: {
  slideIndex: number;
  totalSlides: number;
  slideLabels: string[];
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-white/[0.07] bg-slate-950/80 backdrop-blur px-8 py-4 flex items-center gap-6 max-md:px-4">
      {/* Prev */}
      <button
        onClick={onPrev}
        disabled={slideIndex === 0}
        className="btn btn-outline flex items-center gap-2"
        style={{
          opacity: slideIndex === 0 ? 0.3 : 1,
          cursor: slideIndex === 0 ? "not-allowed" : "pointer",
        }}
      >
        <ArrowLeft size={15} /> Prev
      </button>

      {/* Slide dots + label */}
      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? "w-6 h-2 bg-indigo-400"
                  : i < slideIndex
                  ? "w-2 h-2 bg-slate-600"
                  : "w-2 h-2 bg-slate-700"
              }`}
            />
          ))}
        </div>
        <span className="text-[0.7rem] font-semibold text-slate-600 tracking-wide">
          {slideLabels[slideIndex]} &nbsp;·&nbsp; {slideIndex + 1} / {totalSlides}
        </span>
      </div>

      {/* Next */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="btn btn-primary flex items-center gap-2"
        style={{
          opacity: !canGoNext ? 0.35 : 1,
          cursor: !canGoNext ? "not-allowed" : "pointer",
        }}
      >
        Next <ArrowRight size={15} />
      </button>
    </div>
  );
}

// ─── Main Slideshow page ──────────────────────────────────────────────────────

interface SlideshowProps {
  onComplete: (phaseId: number) => void;
}

export default function Slideshow({ onComplete }: SlideshowProps) {
  const { phaseId } = useParams<{ phaseId: string }>();
  const navigate = useNavigate();
  const phase = phases.find((p) => p.id === Number(phaseId));

  const [slideIndex, setSlideIndex] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");

  // Track previous phaseId to reset state synchronously on phase change
  const [prevPhaseId, setPrevPhaseId] = useState(phaseId);

  // Activity state
  const [quizSelected, setQuizSelected] = useState<Set<string>>(new Set());
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Synchronous reset when the phase changes — prevents slideIndex from being
  // out-of-bounds during the first render with the new phase's slide array.
  if (prevPhaseId !== phaseId) {
    setPrevPhaseId(phaseId);
    setSlideIndex(0);
    setDir("fwd");
    setQuizSelected(new Set());
    setQuizSubmitted(false);
  }

  if (!phase) {
    navigate("/", { replace: true });
    return null;
  }

  const slides = buildSlides(phase);
  // Clamp as a safety net so currentSlide is never undefined
  const safeIndex = Math.max(0, Math.min(slideIndex, slides.length - 1));
  const currentSlide = slides[safeIndex];
  const isLastPhase = phase.id === totalPhases;

  // Generate human-readable labels for the nav bar
  const slideLabels: string[] = slides.map((s) => {
    if (s.type === "title") return "Introduction";
    if (s.type === "context") return "Context";
    if (s.type === "principle") {
      const p = phase.principles[s.index];
      return p.title;
    }
    if (s.type === "examples") return "Real Examples";
    if (s.type === "activity") return "Quiz";
    return "Takeaway";
  });

  const isActivitySlide = currentSlide.type === "activity";
  // Can only advance past activity after submitting
  const canGoNext = isActivitySlide ? quizSubmitted : true;

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    if (safeIndex < slides.length - 1) {
      setDir("fwd");
      setSlideIndex(safeIndex + 1);
    }
  }, [safeIndex, slides.length, canGoNext]);

  const goPrev = useCallback(() => {
    if (safeIndex > 0) {
      setDir("back");
      setSlideIndex(safeIndex - 1);
    }
  }, [safeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const handleQuizToggle = (id: string) => {
    if (quizSubmitted) return;
    setQuizSelected((prev) => {
      const next = new Set(prev);
      if (phase.activity.multiSelect) {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      } else {
        next.clear();
        if (!prev.has(id)) next.add(id);
      }
      return next;
    });
  };

  const handleQuizSubmit = () => {
    if (quizSelected.size === 0) return;
    setQuizSubmitted(true);
    onComplete(phase.id);
  };

  const handleFinalNext = () => {
    if (isLastPhase) navigate("/summary");
    else navigate(`/phase/${phase.id + 1}`);
  };

  // Render the current slide content
  function renderSlide() {
    const s = currentSlide;
    const p = phase!;
    if (s.type === "title") return <TitleSlide phase={p} dir={dir} />;
    if (s.type === "context") return <ContextSlide phase={p} dir={dir} />;
    if (s.type === "principle")
      return (
        <PrincipleSlide
          phase={p}
          principle={p.principles[s.index]}
          index={s.index}
          dir={dir}
        />
      );
    if (s.type === "examples") return <ExamplesSlide phase={p} dir={dir} />;
    if (s.type === "activity")
      return (
        <ActivitySlide
          phase={p}
          dir={dir}
          submitted={quizSubmitted}
          selected={quizSelected}
          onToggle={handleQuizToggle}
          onSubmit={handleQuizSubmit}
        />
      );
    if (s.type === "takeaway")
      return (
        <TakeawaySlide
          phase={p}
          dir={dir}
          isLast={isLastPhase}
          onNext={handleFinalNext}
        />
      );
    return null;
  }

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 60px)" }}>
      {/* Slide area — fills remaining space */}
      <div
        className="flex-1 flex flex-col overflow-hidden relative"
        style={{ minHeight: 0 }}
      >
        <div className="flex-1 overflow-y-auto">{renderSlide()}</div>
      </div>

      {/* Fixed bottom nav bar */}
      <NavBar
        slideIndex={safeIndex}
        totalSlides={slides.length}
        slideLabels={slideLabels}
        canGoNext={canGoNext}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
