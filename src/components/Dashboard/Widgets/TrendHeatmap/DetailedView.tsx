
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DetailedViewProps {
  isVisible: boolean;
  selectedMonth: string | null;
}

export const DetailedView: React.FC<DetailedViewProps> = ({ isVisible, selectedMonth }) => {
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          transform="translate(50, 230)"
        >
          <rect 
            x="0" 
            y="0" 
            width="700" 
            height="120" 
            rx="8" 
            fill="url(#cardGradient)" 
            stroke="#4263eb" 
            strokeWidth="1"
          />
          
          <text x="20" y="30" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="bold" fill="#ffffff">
            {selectedMonth ? `${selectedMonth} 2023 Detailed Insights` : 'Trend Details'}
          </text>
          
          <text x="20" y="60" fontFamily="Inter, sans-serif" fontSize="14" fill="#94a3b8">
            {selectedMonth 
              ? `${selectedMonth} showed a 23% increase in engagement compared to previous month.` 
              : 'Hover over a month to see detailed insights.'}
          </text>
          
          <text x="20" y="90" fontFamily="Inter, sans-serif" fontSize="14" fill="#94a3b8">
            {selectedMonth 
              ? `Top performing days: ${selectedMonth} 15th and ${selectedMonth} 22nd with peak viral potential.` 
              : 'Monthly stats will appear here when a month is selected.'}
          </text>
        </motion.g>
      )}
    </AnimatePresence>
  );
};
