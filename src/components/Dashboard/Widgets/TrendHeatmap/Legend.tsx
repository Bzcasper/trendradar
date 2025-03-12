
import React from "react";

export const Legend: React.FC = () => {
  return (
    <g transform="translate(50, 360)">
      <text x="0" y="0" fontFamily="Inter, sans-serif" fontSize="14" fill="#ffffff">Activity Level</text>
      <rect x="0" y="10" width="600" height="20" rx="3" fill="url(#heatGradient)" />
      <text x="0" y="50" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8">Low</text>
      <text x="590" y="50" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8" textAnchor="end">High</text>
    </g>
  );
};
