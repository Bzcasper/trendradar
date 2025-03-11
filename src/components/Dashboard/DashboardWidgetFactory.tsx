
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import mockTrendData from "@/data/mockTrendData";

// Widget types
export type WidgetType = 
  | "trafficTrends"
  | "trafficSources"
  | "conversionFunnel"
  | "platformPerformance"
  | "keyMetrics";

// Widget props
export interface WidgetData {
  id: string;
  type: WidgetType;
  title: string;
  size?: "small" | "medium" | "large" | "full";
}

// Widget factory component
export function DashboardWidgetContent({ type }: { type: WidgetType }) {
  // Calculate summary metrics from our existing data
  const totalViews = mockTrendData.reduce((sum, item) => sum + item.views, 0);
  
  // Create traffic trends data for line chart
  const trafficTrendsData = [
    { date: "Oct 1", organic: 6000, referral: 4000 },
    { date: "Oct 8", organic: 8000, referral: 6000 },
    { date: "Oct 15", organic: 12000, referral: 7000 },
    { date: "Oct 22", organic: 14000, referral: 8000 },
    { date: "Oct 29", organic: 16000, referral: 9000 },
    { date: "Nov 5", organic: 18000, referral: 10000 }
  ];
  
  // Create traffic sources data for pie chart
  const trafficSourcesData = [
    { name: "Organic Search", value: 42, color: "#4263EB" },
    { name: "Social Media", value: 28, color: "#F86A6A" },
    { name: "Referral", value: 19, color: "#FF8F3F" },
    { name: "Direct", value: 8, color: "#FFC541" },
    { name: "Other", value: 3, color: "#A3AED0" }
  ];
  
  // Create funnel data
  const funnelData = [
    { name: "Visitors", value: totalViews, color: "#4263EB" },
    { name: "Leads", value: Math.floor(totalViews * 0.28), color: "#6E8AFA" },
    { name: "Qualified Leads", value: Math.floor(totalViews * 0.12), color: "#9BABFC" },
    { name: "Opportunities", value: Math.floor(totalViews * 0.05), color: "#BDD0FE" }
  ];
  
  // Content performance by platform
  const platformPerformanceData = [
    { name: "YouTube", views: 45000, engagement: 8.2 },
    { name: "TikTok", views: 65000, engagement: 9.7 },
    { name: "Instagram", views: 32000, engagement: 6.8 },
    { name: "Reddit", views: 18000, engagement: 4.3 }
  ];
  
  // Render widget based on type
  switch (type) {
    case "trafficTrends":
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
      
    case "trafficSources":
      return (
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
      );
      
    case "conversionFunnel":
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
      
    case "platformPerformance":
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
      
    case "keyMetrics":
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-gray-600 text-sm font-medium">TOTAL VIEWS</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totalViews.toLocaleString()}</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-gray-600 text-sm font-medium">AVG ENGAGEMENT</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {mockTrendData.reduce((sum, item) => sum + (item.engagement_rate || 0), 0) / mockTrendData.length}%
            </div>
          </div>
        </div>
      );
      
    default:
      return <div>Unknown widget type</div>;
  }
}

// Available widgets for selection
export const availableWidgets: Array<{ type: WidgetType, title: string }> = [
  { type: "trafficTrends", title: "Traffic Trends" },
  { type: "trafficSources", title: "Traffic Sources" },
  { type: "conversionFunnel", title: "Conversion Funnel" },
  { type: "platformPerformance", title: "Platform Performance" },
  { type: "keyMetrics", title: "Key Metrics" }
];
