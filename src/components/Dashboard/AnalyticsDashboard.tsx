
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mockTrendData from "@/data/mockTrendData";
import { KeyMetricsCards } from "./Analytics/KeyMetricsCards";
import { TrafficTrendsChart } from "./Analytics/TrafficTrendsChart";
import { PerformanceSection } from "./Analytics/PerformanceSection";
import { TopPerformingTable } from "./Analytics/TopPerformingTable";

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("30days");
  
  // Calculate summary metrics from our existing data
  const totalViews = mockTrendData.reduce((sum, item) => sum + item.views, 0);
  const avgEngagementRate = (mockTrendData.reduce((sum, item) => sum + (item.engagement_rate || 0), 0) / mockTrendData.length);
  const conversionRate = 3.8; // Example value
  const roi = 312; // Example value
  
  // Create traffic trends data for line chart
  const trafficTrendsData = [
    { date: "Oct 1", organic: 6000, referral: 4000 },
    { date: "Oct 8", organic: 8000, referral: 6000 },
    { date: "Oct 15", organic: 12000, referral: 7000 },
    { date: "Oct 22", organic: 14000, referral: 8000 },
    { date: "Oct 29", organic: 16000, referral: 9000 },
    { date: "Nov 5", organic: 18000, referral: 10000 }
  ];
  
  // Content performance by platform
  const platformPerformanceData = [
    { name: "YouTube", views: 45000, engagement: 8.2 },
    { name: "TikTok", views: 65000, engagement: 9.7 },
    { name: "Instagram", views: 32000, engagement: 6.8 },
    { name: "Reddit", views: 18000, engagement: 4.3 }
  ];
  
  // Create funnel data
  const funnelData = [
    { name: "Visitors", value: totalViews, color: "#4263EB" },
    { name: "Leads", value: Math.floor(totalViews * 0.28), color: "#6E8AFA" },
    { name: "Qualified Leads", value: Math.floor(totalViews * 0.12), color: "#9BABFC" },
    { name: "Opportunities", value: Math.floor(totalViews * 0.05), color: "#BDD0FE" }
  ];
  
  // Create traffic sources data for pie chart
  const trafficSourcesData = [
    { name: "Organic Search", value: 42, color: "#4263EB" },
    { name: "Social Media", value: 28, color: "#F86A6A" },
    { name: "Referral", value: 19, color: "#FF8F3F" },
    { name: "Direct", value: 8, color: "#FFC541" },
    { name: "Other", value: 3, color: "#A3AED0" }
  ];
  
  // Top performing content
  const topContent = mockTrendData
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      views: item.views,
      avg_time: (Math.random() * 4 + 2).toFixed(2),
      engagement: (item.engagement_rate || 0).toFixed(1) + "%",
      conversions: Math.floor(item.views * (Math.random() * 0.01)),
    }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time insights to optimize your content strategy</p>
        </div>
        
        <Tabs value={timeframe} onValueChange={setTimeframe} className="mt-4 md:mt-0">
          <TabsList className="bg-blue-100">
            <TabsTrigger value="30days" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Last 30 Days
            </TabsTrigger>
            <TabsTrigger value="quarter" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Quarter
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Custom
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <KeyMetricsCards
        totalViews={totalViews}
        avgEngagementRate={avgEngagementRate}
        conversionRate={conversionRate}
        roi={roi}
      />

      <TrafficTrendsChart data={trafficTrendsData} />

      <PerformanceSection
        platformPerformanceData={platformPerformanceData}
        funnelData={funnelData}
        trafficSourcesData={trafficSourcesData}
      />

      <TopPerformingTable content={topContent} />
    </div>
  );
}
