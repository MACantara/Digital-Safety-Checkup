import "./TipPanel.css";

export default function TipPanel({ tip, onClose }) {
  if (!tip) return null;

  return (
    <div className="tip-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="tip-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="tip-close" onClick={onClose} aria-label="Close tip">
          ✕
        </button>
        <div className="tip-icon">💡</div>
        <h3 className="tip-title">{tip.title}</h3>
        <p className="tip-body">{tip.body}</p>
        {tip.action && (
          <div className="tip-action">
            <span className="tip-action-label">Action</span>
            <p>{tip.action}</p>
          </div>
        )}
        <button className="btn btn-primary tip-got-it" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
