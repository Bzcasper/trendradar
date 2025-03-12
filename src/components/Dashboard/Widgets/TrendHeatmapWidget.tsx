
import React, { useState } from "react";
import { motion } from "framer-motion";
import { GradientDefs } from "./TrendHeatmap/GradientDefs";
import { CalendarGrid } from "./TrendHeatmap/CalendarGrid";
import { Legend } from "./TrendHeatmap/Legend";
import { StatsCards } from "./TrendHeatmap/StatsCards";
import { DetailedView } from "./TrendHeatmap/DetailedView";

export const TrendHeatmapWidget = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [isDetailedView, setIsDetailedView] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleCellHover = (month: string) => {
    setSelectedMonth(month);
  };
  
  const handleMonthLeave = () => {
    setSelectedMonth(null);
  };
  
  const toggleDetailedView = () => {
    setIsDetailedView(!isDetailedView);
  };

  return (
    <div className="w-full h-full min-h-[500px] flex justify-center items-center p-4 overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" className="w-full h-full">
        <GradientDefs />

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

        <CalendarGrid 
          months={months} 
          days={days} 
          selectedMonth={selectedMonth}
          handleCellHover={handleCellHover}
          handleMonthLeave={handleMonthLeave}
        />
        
        <DetailedView 
          isVisible={isDetailedView} 
          selectedMonth={selectedMonth} 
        />

        <Legend />
        
        <StatsCards 
          isDetailedView={isDetailedView}
          toggleDetailedView={toggleDetailedView}
        />
      </svg>
    </div>
  );
};
