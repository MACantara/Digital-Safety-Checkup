import { getScoreLabel } from "../data/checklistData";
import "./ScoreGauge.css";

export default function ScoreGauge({ score, large = false }) {
  const { label, color } = getScoreLabel(score);

  // SVG arc gauge
  const radius = large ? 80 : 54;
  const stroke = large ? 10 : 7;
  const cx = radius + stroke;
  const cy = radius + stroke;
  const size = (radius + stroke) * 2;
  const circumference = Math.PI * radius; // half-circle
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`score-gauge ${large ? "score-gauge--large" : ""}`}>
      <svg
        width={size}
        height={cx}
        viewBox={`0 0 ${size} ${cx}`}
        className="score-gauge__svg"
        aria-hidden="true"
      >
        {/* Background track */}
        <path
          d={`M ${stroke} ${cy} A ${radius} ${radius} 0 0 1 ${size - stroke} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Score arc */}
        <path
          d={`M ${stroke} ${cy} A ${radius} ${radius} 0 0 1 ${size - stroke} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1), stroke 0.4s" }}
        />
      </svg>

      <div className="score-gauge__center">
        <span className="score-gauge__number" style={{ color }}>
          {score}
        </span>
        <span className="score-gauge__label" style={{ color }}>
          {label}
        </span>
      </div>
    </div>
  );
}
