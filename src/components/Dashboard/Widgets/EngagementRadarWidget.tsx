
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";

// Engagement radar data
const engagementRadarData = [
  { category: "Views", A: 120, B: 110, fullMark: 150 },
  { category: "Likes", A: 98, B: 130, fullMark: 150 },
  { category: "Comments", A: 86, B: 130, fullMark: 150 },
  { category: "Shares", A: 99, B: 100, fullMark: 150 },
  { category: "Watch Time", A: 85, B: 90, fullMark: 150 },
  { category: "CTR", A: 65, B: 85, fullMark: 150 },
];

export const EngagementRadarWidget = () => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={engagementRadarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar name="Current Content" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Top Performers" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
