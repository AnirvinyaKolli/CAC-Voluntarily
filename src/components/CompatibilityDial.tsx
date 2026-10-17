interface CompatibilityDialProps {
  score: number;
}

function CompatibilityDial({ score }: CompatibilityDialProps) {
  const safeScore = Math.min(100, Math.max(0, Math.round(score)));
  const scoreColor =
    safeScore >= 80 ? "#16a34a" : safeScore >= 40 ? "#e4a112" : "#dc2626";
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const progress = (safeScore / 100) * circumference;

  return (
    <div
      className="flex shrink-0 flex-col items-center gap-1"
    >
      <svg className="h-14 w-14" viewBox="0 0 52 52" aria-hidden="true">
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="5"
        />
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          transform="rotate(-90 26 26)"
        />
        <text
          x="26"
          y="27"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={scoreColor}
          fontSize="13"
          fontWeight="700"
        >
          {safeScore}%
        </text>
      </svg>
    </div>
  );
}

export default CompatibilityDial;
