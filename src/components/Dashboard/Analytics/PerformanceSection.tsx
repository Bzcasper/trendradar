
import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface PerformanceSectionProps {
  platformPerformanceData: Array<{
    name: string;
    views: number;
    engagement: number;
  }>;
  funnelData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  trafficSourcesData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function PerformanceSection({ 
  platformPerformanceData, 
  funnelData, 
  trafficSourcesData 
}: PerformanceSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="font-semibold text-gray-900 mb-4">Platform Performance</div>
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
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="font-semibold text-gray-900 mb-4">Conversion Funnel</div>
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
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="font-semibold text-gray-900 mb-4">Traffic Sources</div>
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
      </Card>
    </div>
  );
}
