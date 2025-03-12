
import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import mockTrendData from "@/data/mockTrendData";

export const ViralPotentialWidget = () => {
  // Viral potential scatter plot
  const viralPotentialData = mockTrendData.map(item => ({
    title: item.title.substring(0, 20),
    engagementRate: item.engagement_rate || 0,
    viewVelocity: (item.views || 0) / ((new Date().getTime() - new Date(item.published_at).getTime()) / (1000 * 60 * 60)),
    trending: item.trending_score || 0,
    views: item.views,
  }));
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="engagementRate" name="Engagement Rate" unit="%" />
          <YAxis type="number" dataKey="viewVelocity" name="View Velocity" unit="/hr" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Videos" data={viralPotentialData} fill="#8884d8">
            {viralPotentialData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.trending > 70 ? "#82ca9d" : entry.trending > 50 ? "#ffc658" : "#ff7f0e"} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
