import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

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
    <header className="app-header">
      <div className="header-inner">
        <button
          className="logo-btn"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <span className="logo-shield">🛡️</span>
          <span className="logo-text">Digital Safety Checkup</span>
        </button>

        {(isChecklist || isResults) && (
          <div className="header-actions">
            <span className="header-progress">
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
