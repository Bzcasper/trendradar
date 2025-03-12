
import { Card } from "@/components/ui/card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface TrafficTrendsData {
  date: string;
  organic: number;
  referral: number;
}

interface TrafficTrendsChartProps {
  data: TrafficTrendsData[];
}

export function TrafficTrendsChart({ data }: TrafficTrendsChartProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow mb-6">
      <div className="font-semibold text-gray-900 mb-1">Traffic Trends</div>
      <div className="text-sm text-gray-600 mb-4">Daily visitors over the selected period</div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
    </Card>
  );
}
