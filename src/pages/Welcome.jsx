import { useNavigate } from "react-router-dom";
import { categories, totalItems } from "../data/checklistData";
import "./Welcome.css";

const categoryHighlights = categories.slice(0, 4);

export default function Welcome({ onReset }) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/checklist");
  };

  return (
    <main className="welcome">
      <div className="welcome__hero">
        <h1 className="welcome__title">
          How safe are you <span className="welcome__title-accent">online?</span>
        </h1>
        <p className="welcome__subtitle">
          Work through {totalItems} practical security checks across{" "}
          {categories.length} categories — and learn exactly how to fix any gaps.
          Takes about 10 minutes.
        </p>
        <div className="welcome__actions">
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
            Reset & Start Fresh
          </button>
        </div>
      </div>

      <section className="welcome__categories">
        <h2 className="welcome__section-title">What we cover</h2>
        <div className="welcome__grid">
          {categories.map((cat) => (
            <div key={cat.id} className="welcome__cat-card">
              <span className="welcome__cat-icon">{cat.icon}</span>
              <div>
                <div className="welcome__cat-name">{cat.title}</div>
                <div className="welcome__cat-count">
                  {cat.items.length} checks
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="welcome__how">
        <h2 className="welcome__section-title">How it works</h2>
        <div className="welcome__steps">
          <div className="welcome__step">
            <div className="welcome__step-num">1</div>
            <div>
              <strong>Go through each category</strong>
              <p>Check off items you've already done. Click <strong>?</strong> on any item to learn why it matters and how to act on it.</p>
            </div>
          </div>
          <div className="welcome__step">
            <div className="welcome__step-num">2</div>
            <div>
              <strong>Get your safety score</strong>
              <p>Your weighted score reflects the severity of each item, so the most important issues count most.</p>
            </div>
          </div>
          <div className="welcome__step">
            <div className="welcome__step-num">3</div>
            <div>
              <strong>Follow your action plan</strong>
              <p>See a prioritized list of what to fix first, with specific guidance for each issue.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="welcome__privacy-note">
        🔒 All data stays in your browser — nothing is sent to any server.
      </div>
    </main>
  );
}
