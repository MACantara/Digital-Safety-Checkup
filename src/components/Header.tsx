import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  totalChecked: number;
  totalItems: number;
}

export default function Header({ totalChecked, totalItems }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isChecklist = location.pathname === "/checklist";
  const isResults = location.pathname === "/results";

  return (
    <header className="sticky top-0 z-[100] bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.08] px-6">
      <div className="max-w-[900px] mx-auto flex items-center justify-between h-[60px]">
        <button
          className="bg-transparent border-none cursor-pointer flex items-center gap-2 p-0"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <span className="text-[1.4rem]">🛡️</span>
          <span className="text-base font-bold text-slate-200 tracking-tight">Digital Safety Checkup</span>
        </button>

        {(isChecklist || isResults) && (
          <div className="flex items-center gap-4">
            <span className="text-[0.8rem] text-slate-400 tabular-nums">
              {totalChecked}/{totalItems} completed
            </span>
            <button
              className="btn btn-outline"
              onClick={() => navigate(isResults ? "/checklist" : "/results")}
            >
              {isResults ? "← Back to Checklist" : "View Results →"}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
