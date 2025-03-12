
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts";
import mockTrendData from "@/data/mockTrendData";

export const ConversionFunnelWidget = () => {
  // Calculate summary metrics from our existing data
  const totalViews = mockTrendData.reduce((sum, item) => sum + item.views, 0);
  
  // Create funnel data
  const funnelData = [
    { name: "Visitors", value: totalViews, color: "#4263EB" },
    { name: "Leads", value: Math.floor(totalViews * 0.28), color: "#6E8AFA" },
    { name: "Qualified Leads", value: Math.floor(totalViews * 0.12), color: "#9BABFC" },
    { name: "Opportunities", value: Math.floor(totalViews * 0.05), color: "#BDD0FE" }
  ];

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={funnelData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" fontSize={10} />
          <YAxis type="category" dataKey="name" fontSize={10} width={80} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {funnelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
