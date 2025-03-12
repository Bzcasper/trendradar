
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TrendHeatmapWidget = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isDetailedView, setIsDetailedView] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleCellHover = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <div className="w-full h-full min-h-[500px] flex justify-center items-center p-4 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" className="w-full h-full">
        <defs>
          {/* Enhanced background gradient with more depth */}
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          
          {/* Enhanced heatmap gradient with smoother transitions */}
          <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="20%" stopColor="#2563eb" />
            <stop offset="40%" stopColor="#7c3aed" />
            <stop offset="60%" stopColor="#db2777" />
            <stop offset="80%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          
          {/* Enhanced card gradient */}
          <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>
          
          {/* Enhanced glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
          
          {/* Pulse animation */}
          <filter id="pulse" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="800" height="500" fill="url(#bgGradient)" />

        {/* Title with enhanced styling */}
        <g className="title-group" filter="url(#glow)">
          <text x="50" y="50" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff">
            Trend Activity Heatmap
          </text>
          <text x="50" y="80" fontFamily="Inter, sans-serif" fontSize="16" fill="#94a3b8">
            Engagement distribution over time - {currentYear}
          </text>
        </g>

        {/* Enhanced Calendar Grid */}
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

        {/* Enhanced Day Labels */}
        <g transform="translate(25, 150)" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8">
          {days.map((day, i) => (
            <text key={day} x="0" y={15 + (i * 30)} textAnchor="start">{day}</text>
          ))}
        </g>

        {/* Enhanced Calendar Heatmap Cells */}
        <g transform="translate(50, 130)">
          {months.map((month, monthIndex) => (
            <g key={month}>
              {days.map((day, dayIndex) => (
                <rect
                  key={`${month}-${day}`}
                  x={60 + (monthIndex * 60)}
                  y={dayIndex * 30}
                  width="30"
                  height="30"
                  rx="3"
                  fill={`url(#heatGradient)`}
                  opacity={0.1 + (Math.random() * 0.9)}
                  className="transition-all duration-300"
                  onMouseEnter={() => handleCellHover(month)}
                  onMouseLeave={() => setSelectedMonth(null)}
                  filter={selectedMonth === month ? "url(#glow)" : "none"}
                >
                  <animate
                    attributeName="opacity"
                    values={selectedMonth === month ? "0.4;0.8;0.4" : ""}
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          ))}
        </g>

        {/* Enhanced Legend */}
        <g transform="translate(50, 360)">
          <text x="0" y="0" fontFamily="Inter, sans-serif" fontSize="14" fill="#ffffff">Activity Level</text>
          <rect x="0" y="10" width="600" height="20" rx="3" fill="url(#heatGradient)" />
          <text x="0" y="50" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8">Low</text>
          <text x="590" y="50" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8" textAnchor="end">High</text>
        </g>

        {/* Enhanced Stats Cards */}
        <g transform="translate(50, 420)" className="stats-cards">
          {[
            { title: "PEAK ACTIVITY DAY", value: "Jul 15, 2023" },
            { title: "MOST ACTIVE MONTH", value: "July 2023" },
            { title: "TOTAL ACTIVITIES", value: "12,487" },
          ].map((stat, i) => (
            <g key={stat.title} transform={`translate(${i * 200}, 0)`}>
              <rect
                x="0"
                y="0"
                width="180"
                height="60"
                rx="5"
                fill="url(#cardGradient)"
                className="transition-all duration-300"
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
          <g transform="translate(600, 0)" onClick={() => setIsDetailedView(!isDetailedView)}>
            <rect
              x="0"
              y="0"
              width="110"
              height="60"
              rx="5"
              fill="#ef4444"
              opacity="0.2"
              stroke="#ef4444"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-300 hover:opacity-30"
            />
            <text x="55" y="30" fontFamily="Inter, sans-serif" fontSize="12" fill="#94a3b8" textAnchor="middle">
              SHOW
            </text>
            <text x="55" y="45" fontFamily="Inter, sans-serif" fontSize="12" fill="#ffffff" textAnchor="middle">
              DETAILED VIEW
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
