import "./CheckItem.css";

const severityConfig = {
  critical: { label: "Critical", color: "#ef4444" },
  high: { label: "High", color: "#f97316" },
  medium: { label: "Medium", color: "#f59e0b" },
  low: { label: "Low", color: "#84cc16" },
};

export default function CheckItem({ item, checked, onToggle, onTipClick }) {
  const sev = severityConfig[item.severity];

  return (
    <div
      className={`check-item ${checked ? "check-item--checked" : ""}`}
      onClick={() => onToggle(item.id)}
    >
      <div className="check-item__checkbox" aria-checked={checked} role="checkbox">
        {checked && <span className="check-item__tick">✓</span>}
      </div>

      <div className="check-item__content">
        <p className="check-item__text">{item.text}</p>
        <div className="check-item__meta">
          <span
            className="check-item__severity"
            style={{ color: sev.color, borderColor: `${sev.color}40` }}
          >
            {sev.label}
          </span>
        </div>
      </div>

      <button
        className="check-item__tip-btn"
        onClick={(e) => {
          e.stopPropagation();
          onTipClick(item.tip);
        }}
        aria-label={`Learn more about: ${item.text}`}
        title="Learn more"
      >
        <span>?</span>
      </button>
    </div>
  );
}
