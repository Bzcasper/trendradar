
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// Content performance by platform
const platformPerformanceData = [
  { name: "YouTube", views: 45000, engagement: 8.2 },
  { name: "TikTok", views: 65000, engagement: 9.7 },
  { name: "Instagram", views: 32000, engagement: 6.8 },
  { name: "Reddit", views: 18000, engagement: 4.3 }
];

export const PlatformPerformanceWidget = () => {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={platformPerformanceData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" fontSize={10} />
          <YAxis type="category" dataKey="name" fontSize={10} width={70} />
          <Tooltip />
          <Bar dataKey="views" fill="#4263EB" name="Views" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
