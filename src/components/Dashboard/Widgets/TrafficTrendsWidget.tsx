
import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Create traffic trends data for line chart
const trafficTrendsData = [
  { date: "Oct 1", organic: 6000, referral: 4000 },
  { date: "Oct 8", organic: 8000, referral: 6000 },
  { date: "Oct 15", organic: 12000, referral: 7000 },
  { date: "Oct 22", organic: 14000, referral: 8000 },
  { date: "Oct 29", organic: 16000, referral: 9000 },
  { date: "Nov 5", organic: 18000, referral: 10000 }
];

export const TrafficTrendsWidget = () => {
  return (
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trafficTrendsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" stroke="#888" fontSize={12} />
          <YAxis stroke="#888" fontSize={12} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="organic" stroke="#4263EB" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Organic" />
          <Line type="monotone" dataKey="referral" stroke="#F86A6A" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Referral" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
