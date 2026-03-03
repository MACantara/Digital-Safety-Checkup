import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Zap, ClipboardList } from "lucide-react";
import { phases } from "../data/phaseData";

interface WelcomeProps {
  completedPhases: Set<number>;
  onReset: () => void;
}

export default function Welcome({ completedPhases, onReset }: WelcomeProps) {
  const navigate = useNavigate();
  const hasProgress = completedPhases.size > 0;
  const allDone = completedPhases.size === phases.length;

  const handleStart = () => navigate("/phase/1");

  const handleResume = () => {
    const nextPhase = phases.find((p) => !completedPhases.has(p.id));
    if (nextPhase) navigate(`/phase/${nextPhase.id}`);
    else navigate("/summary");
  };

  return (
    <main className="max-w-[720px] mx-auto px-6 pt-12 pb-20">
      {/* Hero */}
      <div className="text-center pb-14 border-b border-slate-200 mb-12">
        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold text-slate-900 leading-[1.1] mb-4 tracking-[-0.03em]">
          Stay safe online —{" "}
          <span className="gradient-text">in 15 minutes.</span>
        </h1>
        <p className="text-[1.05rem] text-slate-600 leading-relaxed max-w-[560px] mx-auto mb-8">
          Three short phases. Each one teaches you a key skill, shows you real
          examples, then asks you to apply it. No jargon. No fluff.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {hasProgress && !allDone ? (
            <>
              <button className="btn btn-primary btn-lg" onClick={handleResume}>
                Continue Where I Left Off <ArrowRight size={16} className="inline-block ml-1" />
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={() => { onReset(); handleStart(); }}
              >
                Start Over
              </button>
            </>
          ) : allDone ? (
            <>
              <button className="btn btn-primary btn-lg" onClick={() => navigate("/summary")}>
                View My Summary <ArrowRight size={16} className="inline-block ml-1" />
              </button>
              <button
                className="btn btn-ghost btn-lg"
                onClick={() => { onReset(); handleStart(); }}
              >
                Start Over
              </button>
            </>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={handleStart}>
              Begin the Checkup <ArrowRight size={16} className="inline-block ml-1" />
            </button>
          )}
        </div>
      </div>

      {/* 3 Phases overview */}
      <section className="mb-12">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-500 mb-5">
          What you'll cover
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-3">
          {phases.map((phase) => {
            const Icon = phase.icon;
            const done = completedPhases.has(phase.id);
            return (
              <div
                key={phase.id}
                className={`flex flex-col gap-3 border rounded-2xl px-5 py-4 transition-colors cursor-pointer ${
                  done
                    ? "border-indigo-300 bg-indigo-50 hover:bg-indigo-100"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
                onClick={() => navigate(`/phase/${phase.id}`)}
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={20}
                    className={done ? "text-indigo-600" : "text-slate-500"}
                  />
                  {done && (
                    <span className="text-[0.65rem] font-bold text-green-700 bg-green-100 border border-green-300 px-2 py-[2px] rounded-full">
                      Done
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.08em] text-slate-500 mb-[0.2rem]">
                    Phase {phase.id} · {phase.duration}
                  </div>
                  <div className="text-[0.88rem] font-semibold text-slate-800 leading-snug">
                    {phase.title}
                  </div>
                  <div className="text-[0.75rem] text-slate-600 mt-[0.3rem] leading-relaxed">
                    {phase.tagline}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How each phase works */}
      <section className="mb-12">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-500 mb-5">
          How each phase works
        </h2>
        <div className="flex flex-col gap-5">
          {[
            {
              icon: BookOpen,
              title: "Learn the concept",
              body: "Each phase opens with the what, the how, and the why — explained simply, with real examples you've probably already seen.",
            },
            {
              icon: Zap,
              title: "Apply it immediately",
              body: "A short activity asks you to use what you just learned. Reading isn't enough — answering is what makes it stick.",
            },
            {
              icon: ClipboardList,
              title: "Walk away with specific actions",
              body: "At the end you'll have a clear, prioritised list of things to do today — not someday, today.",
            },
          ].map(({ icon: Icon, title, body }, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                <Icon size={17} className="text-indigo-700" />
              </div>
              <div>
                <strong className="block text-slate-900 text-[0.95rem] mb-[0.3rem]">
                  {title}
                </strong>
                <p className="text-slate-600 text-[0.85rem] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
