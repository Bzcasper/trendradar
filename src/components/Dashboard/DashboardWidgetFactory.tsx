
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter, AreaChart, Area } from "recharts";
import mockTrendData from "@/data/mockTrendData";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Eye, MessageSquare, ThumbsUp, Award, Zap } from "lucide-react";
import { format } from "date-fns";

// Widget types
export type WidgetType = 
  | "trafficTrends"
  | "trafficSources"
  | "conversionFunnel"
  | "platformPerformance"
  | "keyMetrics"
  | "topPerformers"
  | "engagementRadar"
  | "keywordCloud"
  | "trendHeatmap"
  | "viralPotential";

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

  // Top performing content (from mock data)
  const topPerformers = mockTrendData
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 5);

  // Engagement radar data
  const engagementRadarData = [
    { category: "Views", A: 120, B: 110, fullMark: 150 },
    { category: "Likes", A: 98, B: 130, fullMark: 150 },
    { category: "Comments", A: 86, B: 130, fullMark: 150 },
    { category: "Shares", A: 99, B: 100, fullMark: 150 },
    { category: "Watch Time", A: 85, B: 90, fullMark: 150 },
    { category: "CTR", A: 65, B: 85, fullMark: 150 },
  ];

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

  // Viral potential scatter plot
  const viralPotentialData = mockTrendData.map(item => ({
    title: item.title.substring(0, 20),
    engagementRate: item.engagement_rate || 0,
    viewVelocity: (item.views || 0) / ((new Date().getTime() - new Date(item.published_at).getTime()) / (1000 * 60 * 60)),
    trending: item.trending_score || 0,
    views: item.views,
  }));
  
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

    case "topPerformers":
      return (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {topPerformers.map((video, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium truncate">{video.title}</h3>
                      <Badge 
                        variant={video.trending_score > 75 ? "default" : "outline"}
                        className={`${video.trending_score > 75 ? 'bg-green-100 text-green-800' : ''} ml-2 flex-shrink-0`}
                      >
                        {video.trending_score?.toFixed(1)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Eye size={12} className="mr-1"/> 
                        {video.views?.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp size={12} className="mr-1"/> 
                        {video.likes?.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={12} className="mr-1"/> 
                        {video.comments?.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {video.published_at && format(new Date(video.published_at), 'MMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );

    case "engagementRadar":
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

    case "keywordCloud":
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

    case "viralPotential":
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
  { type: "keyMetrics", title: "Key Metrics" },
  { type: "topPerformers", title: "Top Performers" },
  { type: "engagementRadar", title: "Engagement Radar" },
  { type: "keywordCloud", title: "Keyword Cloud" },
  { type: "viralPotential", title: "Viral Potential" }
];
