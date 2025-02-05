import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardCard } from "./DashboardCard";

const mockData = [
  { topic: "Gaming", count: 340 },
  { topic: "Music", count: 280 },
  { topic: "Tech", count: 220 },
  { topic: "Sports", count: 190 },
  { topic: "News", count: 150 },
];

export const TrendingTopics = () => {
  return (
    <DashboardCard title="Trending Topics">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(221, 83%, 53%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};