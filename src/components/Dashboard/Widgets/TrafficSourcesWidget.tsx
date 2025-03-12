
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Create traffic sources data for pie chart
const trafficSourcesData = [
  { name: "Organic Search", value: 42, color: "#4263EB" },
  { name: "Social Media", value: 28, color: "#F86A6A" },
  { name: "Referral", value: 19, color: "#FF8F3F" },
  { name: "Direct", value: 8, color: "#FFC541" },
  { name: "Other", value: 3, color: "#A3AED0" }
];

export const TrafficSourcesWidget = () => {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={trafficSourcesData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {trafficSourcesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
