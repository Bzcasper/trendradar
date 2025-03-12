
import React from "react";
import { motion } from "framer-motion";

interface StatsCardsProps {
  isDetailedView: boolean;
  toggleDetailedView: () => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ isDetailedView, toggleDetailedView }) => {
  const stats = [
    { title: "PEAK ACTIVITY DAY", value: "Jul 15, 2023" },
    { title: "MOST ACTIVE MONTH", value: "July 2023" },
    { title: "TOTAL ACTIVITIES", value: "12,487" },
  ];

  return (
    <g transform="translate(50, 420)" className="stats-cards">
      {stats.map((stat, i) => (
        <g key={stat.title} transform={`translate(${i * 200}, 0)`}>
          <motion.rect
            x="0"
            y="0"
            width="180"
            height="60"
            rx="5"
            fill="url(#cardGradient)"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          />
          <text x="15" y="25" fontFamily="Inter, sans-serif" fontSize="14" fill="#94a3b8">
            {stat.title}
          </text>
          <text x="15" y="45" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="bold" fill="#ffffff">
            {stat.value}
          </text>
        </g>
      ))}

      {/* Enhanced Detail View Button */}
      <g transform="translate(600, 0)">
        <motion.rect
          x="0"
          y="0"
          width="110"
          height="60"
          rx="5"
          fill="#ef4444"
          opacity="0.2"
          stroke="#ef4444"
          strokeWidth="2"
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.2 }}
          onClick={toggleDetailedView}
          style={{ cursor: "pointer" }}
        />
        <text x="55" y="30" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8" textAnchor="middle">
          {isDetailedView ? "HIDE" : "SHOW"}
        </text>
        <text x="55" y="45" fontFamily="Inter, sans-serif" fontSize="12" fill="#ffffff" textAnchor="middle">
          DETAILED VIEW
        </text>
      </g>
    </g>
  );
};
