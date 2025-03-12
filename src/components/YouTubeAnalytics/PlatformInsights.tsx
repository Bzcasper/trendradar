
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, ArrowUpRight, TrendingDown, ArrowDownRight } from "lucide-react";
import { TrendingItem } from "@/utils/multiPlatformApiService";

interface PlatformInsightsProps {
  data: TrendingItem[];
  platform: string;
}

const PLATFORM_COLORS = {
  'YouTube': '#FF0000',
  'Twitter': '#1DA1F2',
  'TikTok': '#000000',
  'Reddit': '#FF4500',
  'NewsAPI': '#1877F2',
  'Wikipedia': '#000000',
  'default': '#718096'
};

export function PlatformInsights({ data, platform }: PlatformInsightsProps) {
  // Filter data for the selected platform
  const platformData = platform === 'all' 
    ? data 
    : data.filter(item => 
        item.platform?.toLowerCase() === platform.toLowerCase() || 
        item.category?.toLowerCase() === platform.toLowerCase()
      );
  
  if (platformData.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p>No data available for this platform.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate platform metrics
  const totalViews = platformData.reduce((sum, item) => sum + (item.views || 0), 0);
  const avgEngagement = platformData.reduce((sum, item) => sum + (item.engagement_rate || 0), 0) / platformData.length;
  const avgTrendingScore = platformData.reduce((sum, item) => sum + (item.trending_score || 0), 0) / platformData.length;
  
  // Prepare chart data
  const engagementByViews = platformData.map(item => ({
    name: item.title.substring(0, 20) + '...',
    views: item.views,
    engagement: item.engagement_rate,
    trending: item.trending_score
  })).sort((a, b) => (b.trending || 0) - (a.trending || 0)).slice(0, 5);
  
  // Platform growth (simulated)
  const growth = Math.random() * 20 - 5; // Random between -5% and +15%
  
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              {platform === 'all' ? 'All Platforms' : platform} Insights
            </CardTitle>
            <Badge 
              variant={growth > 0 ? "default" : "destructive"}
              className={growth > 0 ? "bg-green-100 text-green-800" : ""}
            >
              {growth > 0 ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {Math.abs(growth).toFixed(1)}% {growth > 0 ? 'Growth' : 'Decline'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-500">Total Views</div>
              <div className="text-2xl font-bold mt-1">{totalViews.toLocaleString()}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-500">Avg. Engagement</div>
              <div className="text-2xl font-bold mt-1">{avgEngagement.toFixed(1)}%</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-500">Trending Score</div>
              <div className="text-2xl font-bold mt-1">{avgTrendingScore.toFixed(1)}</div>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={engagementByViews}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="views" 
                  name="Views" 
                  fill={PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS] || PLATFORM_COLORS.default} 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="engagement" 
                  name="Engagement Rate (%)" 
                  fill="#82ca9d" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
