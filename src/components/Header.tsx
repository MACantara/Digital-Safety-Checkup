import { useNavigate, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { phases, totalPhases } from "../data/phaseData";

interface HeaderProps {
  completedPhases: Set<number>;
}

export default function Header({ completedPhases }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // Show phase progress only on phase/activity/summary routes
  const showProgress =
    location.pathname.startsWith("/phase/") ||
    location.pathname === "/summary";

  // Derive current phase from path
  const phaseMatch = location.pathname.match(/^\/phase\/(\d+)/);
  const currentPhaseId = phaseMatch ? Number(phaseMatch[1]) : null;

  return (
    <header className="sticky top-0 z-[100] bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.08] px-6">
      <div className="max-w-[900px] mx-auto flex items-center justify-between h-[60px]">
        {/* Logo */}
        <button
          className="bg-transparent border-none cursor-pointer flex items-center gap-2 p-0"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <Shield size={22} className="text-indigo-400 shrink-0" />
          <span className="text-base font-bold text-slate-200 tracking-tight max-sm:hidden">
            Digital Safety Checkup
          </span>
        </button>

        {/* Phase progress pills */}
        {showProgress && (
          <nav className="flex items-center gap-1">
            {phases.map((phase) => {
              const done = completedPhases.has(phase.id);
              const active = phase.id === currentPhaseId;
              const PhaseIcon = phase.icon;
              return (
                <button
                  key={phase.id}
                  onClick={() => navigate(`/phase/${phase.id}`)}
                  className={[
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[0.72rem] font-semibold transition-colors bg-transparent cursor-pointer font-[inherit]",
                    active
                      ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300"
                      : done
                      ? "border-green-500/30 bg-green-500/8 text-green-400"
                      : "border-white/[0.07] bg-slate-800/50 text-slate-600 hover:text-slate-400 hover:border-white/[0.12]",
                  ].join(" ")}
                  title={phase.title}
                >
                  <PhaseIcon size={12} className="shrink-0" />
                  <span className="max-sm:hidden">{done && !active ? "✓ " : ""}{phase.title}</span>
                  <span className="sm:hidden">P{phase.id}{done && !active ? " ✓" : ""}</span>
                </button>
              );
            })}
            {/* Summary pill */}
            <button
              onClick={() => navigate("/summary")}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[0.72rem] font-semibold transition-colors bg-transparent cursor-pointer font-[inherit]",
                location.pathname === "/summary"
                  ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-300"
                  : completedPhases.size === totalPhases
                  ? "border-green-500/30 bg-green-500/8 text-green-400"
                  : "border-white/[0.07] bg-slate-800/50 text-slate-500 hover:text-slate-400",
              ].join(" ")}
              title="Summary"
            >
              <span>Summary</span>
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
