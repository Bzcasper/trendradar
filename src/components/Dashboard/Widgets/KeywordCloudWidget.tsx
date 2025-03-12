
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// Keyword cloud data (simplified visualization with area chart)
const keywordCloudData = [
  { keyword: "Travel", count: 45 },
  { keyword: "Beauty", count: 78 },
  { keyword: "Gaming", count: 92 },
  { keyword: "Tech", count: 63 },
  { keyword: "Fitness", count: 51 },
  { keyword: "Cooking", count: 38 },
  { keyword: "Finance", count: 27 },
].map((item, index) => ({
  ...item,
  x: index,
  y: item.count,
}));

export const KeywordCloudWidget = () => {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={keywordCloudData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="keyword" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
