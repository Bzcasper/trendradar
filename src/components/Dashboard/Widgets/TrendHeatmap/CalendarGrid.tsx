
import React from "react";
import { motion } from "framer-motion";

interface CalendarGridProps {
  months: string[];
  days: string[];
  selectedMonth: string | null;
  handleCellHover: (month: string) => void;
  handleMonthLeave: () => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  months,
  days,
  selectedMonth,
  handleCellHover,
  handleMonthLeave,
}) => {
  return (
    <>
      {/* Month Labels */}
      <g transform="translate(50, 120)">
        {months.map((month, i) => (
          <text
            key={month}
            x={75 + (i * 60)}
            y="0"
            fontFamily="Inter, sans-serif"
            fontSize="14"
            fill="#ffffff"
            textAnchor="middle"
            opacity={selectedMonth === month ? "1" : "0.7"}
            className="transition-opacity duration-200"
          >
            {month}
          </text>
        ))}
      </g>

      {/* Day Labels */}
      <g transform="translate(25, 150)" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8">
        {days.map((day, i) => (
          <text key={day} x="0" y={15 + (i * 30)} textAnchor="start">{day}</text>
        ))}
      </g>

      {/* Calendar Heatmap Cells */}
      <g transform="translate(50, 130)">
        {months.map((month, monthIndex) => (
          <g 
            key={month}
            onMouseEnter={() => handleCellHover(month)}
            onMouseLeave={handleMonthLeave}
          >
            {days.map((day, dayIndex) => (
              <motion.rect
                key={`${month}-${day}`}
                x={60 + (monthIndex * 60)}
                y={dayIndex * 30}
                width="30"
                height="30"
                rx="3"
                fill={`url(#heatGradient)`}
                opacity={0.1 + (Math.random() * 0.9)}
                className="transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                filter={selectedMonth === month ? "url(#glow)" : "none"}
                initial={false}
                animate={{
                  opacity: selectedMonth === month 
                    ? [0.4, 0.8, 0.4] 
                    : 0.1 + (Math.random() * 0.9)
                }}
                transition={{
                  opacity: {
                    repeat: selectedMonth === month ? Infinity : 0,
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
              />
            ))}
          </g>
        ))}
      </g>
    </>
  );
};
