import React from 'react';

interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const ProgressRing: React.FC<Props> = ({ percentage, size = 100, strokeWidth = 8, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(249,115,22,0.15)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F97316"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-primary">{percentage}%</span>
        {label && <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
};

export default ProgressRing;
