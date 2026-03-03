import { getScoreLabel } from "../data/checklistData";

interface ScoreGaugeProps {
  score: number;
  large?: boolean;
}

export default function ScoreGauge({ score, large = false }: ScoreGaugeProps) {
  const { label, color } = getScoreLabel(score);

  const radius = large ? 80 : 54;
  const stroke = large ? 10 : 7;
  const cx = radius + stroke;
  const cy = radius + stroke;
  const size = (radius + stroke) * 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        width={size}
        height={cx}
        viewBox={`0 0 ${size} ${cx}`}
        className="block overflow-visible"
        aria-hidden="true"
      >
        <path
          d={`M ${stroke} ${cy} A ${radius} ${radius} 0 0 1 ${size - stroke} ${cy}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
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

      <div className="flex flex-col items-center -mt-2">
        <span
          className={`font-extrabold leading-none tabular-nums ${large ? "text-[3rem]" : "text-[1.6rem]"}`}
          style={{ color }}
        >
          {score}
        </span>
        <span
          className={`font-bold uppercase tracking-[0.08em] opacity-90 ${large ? "text-[0.85rem] mt-[0.4rem]" : "text-[0.7rem] mt-[0.2rem]"}`}
          style={{ color }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
