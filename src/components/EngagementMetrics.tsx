import { DashboardCard } from "./DashboardCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { date: "Mon", views: 4000, engagement: 2400 },
  { date: "Tue", views: 3000, engagement: 1398 },
  { date: "Wed", views: 2000, engagement: 9800 },
  { date: "Thu", views: 2780, engagement: 3908 },
  { date: "Fri", views: 1890, engagement: 4800 },
  { date: "Sat", views: 2390, engagement: 3800 },
  { date: "Sun", views: 3490, engagement: 4300 },
];

export const EngagementMetrics = () => {
  return (
    <DashboardCard title="Engagement Over Time">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#3B82F6" />
            <Line type="monotone" dataKey="engagement" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};