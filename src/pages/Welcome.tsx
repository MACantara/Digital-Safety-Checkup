import { useNavigate } from "react-router-dom";
import { categories, totalItems } from "../data/checklistData";

interface WelcomeProps {
  onReset: () => void;
}

export default function Welcome({ onReset }: WelcomeProps) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/checklist");
  };

  return (
    <main className="max-w-[760px] mx-auto px-6 pt-12 pb-20">
      {/* Hero */}
      <div className="text-center pb-14 border-b border-white/[0.07] mb-12">
        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold text-slate-100 leading-[1.1] mb-4 tracking-[-0.03em]">
          How safe are you{" "}
          <span className="gradient-text">online?</span>
        </h1>
        <p className="text-[1.05rem] text-slate-400 leading-relaxed max-w-[560px] mx-auto mb-8">
          Work through {totalItems} practical security checks across{" "}
          {categories.length} categories — and learn exactly how to fix any gaps.
          Takes about 10 minutes.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="btn btn-primary btn-lg" onClick={handleStart}>
            Start My Checkup →
          </button>
          <button
            className="btn btn-ghost btn-lg"
            onClick={() => {
              onReset();
              navigate("/checklist");
            }}
          >
            Reset &amp; Start Fresh
          </button>
        </div>
      </div>

      {/* Categories grid */}
      <section className="mb-12">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-600 mb-5">
          What we cover
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-3 bg-slate-800 border border-white/[0.07] rounded-xl px-4 py-[0.875rem] transition-colors hover:bg-slate-750 hover:border-white/[0.12]"
            >
              <span className="text-[1.4rem] shrink-0">{cat.icon}</span>
              <div>
                <div className="text-[0.85rem] font-semibold text-slate-300 leading-snug">
                  {cat.title}
                </div>
                <div className="text-[0.75rem] text-slate-600 mt-[0.1rem]">
                  {cat.items.length} checks
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-600 mb-5">
          How it works
        </h2>
        <div className="flex flex-col gap-5">
          {[
            {
              n: 1,
              title: "Go through each category",
              body: "Check off items you've already done. Click ? on any item to learn why it matters and how to act on it.",
            },
            {
              n: 2,
              title: "Get your safety score",
              body: "Your weighted score reflects the severity of each item, so the most important issues count most.",
            },
            {
              n: 3,
              title: "Follow your action plan",
              body: "See a prioritized list of what to fix first, with specific guidance for each issue.",
            },
          ].map(({ n, title, body }) => (
            <div key={n} className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-[0.85rem] text-white">
                {n}
              </div>
              <div>
                <strong className="block text-slate-200 text-[0.95rem] mb-[0.3rem]">{title}</strong>
                <p className="text-slate-500 text-[0.85rem] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
