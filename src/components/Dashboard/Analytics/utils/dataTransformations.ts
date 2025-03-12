
import mockTrendData from "@/data/mockTrendData";

// Calculate summary metrics from existing data
export const calculateSummaryMetrics = () => {
  const totalViews = mockTrendData.reduce((sum, item) => sum + item.views, 0);
  const avgEngagementRate = (mockTrendData.reduce((sum, item) => sum + (item.engagement_rate || 0), 0) / mockTrendData.length);
  const conversionRate = 3.8; // Example value
  const roi = 312; // Example value

  return {
    totalViews,
    avgEngagementRate,
    conversionRate,
    roi
  };
};

// Create traffic trends data for line chart
export const getTrafficTrendsData = () => [
  { date: "Oct 1", organic: 6000, referral: 4000 },
  { date: "Oct 8", organic: 8000, referral: 6000 },
  { date: "Oct 15", organic: 12000, referral: 7000 },
  { date: "Oct 22", organic: 14000, referral: 8000 },
  { date: "Oct 29", organic: 16000, referral: 9000 },
  { date: "Nov 5", organic: 18000, referral: 10000 }
];

// Content performance by platform
export const getPlatformPerformanceData = () => [
  { name: "YouTube", views: 45000, engagement: 8.2 },
  { name: "TikTok", views: 65000, engagement: 9.7 },
  { name: "Instagram", views: 32000, engagement: 6.8 },
  { name: "Reddit", views: 18000, engagement: 4.3 }
];

// Create funnel data
export const getFunnelData = (totalViews: number) => [
  { name: "Visitors", value: totalViews, color: "#4263EB" },
  { name: "Leads", value: Math.floor(totalViews * 0.28), color: "#6E8AFA" },
  { name: "Qualified Leads", value: Math.floor(totalViews * 0.12), color: "#9BABFC" },
  { name: "Opportunities", value: Math.floor(totalViews * 0.05), color: "#BDD0FE" }
];

// Create traffic sources data for pie chart
export const getTrafficSourcesData = () => [
  { name: "Organic Search", value: 42, color: "#4263EB" },
  { name: "Social Media", value: 28, color: "#F86A6A" },
  { name: "Referral", value: 19, color: "#FF8F3F" },
  { name: "Direct", value: 8, color: "#FFC541" },
  { name: "Other", value: 3, color: "#A3AED0" }
];

// Get top performing content
export const getTopPerformingContent = () => {
  return mockTrendData
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      views: item.views,
      avg_time: (Math.random() * 4 + 2).toFixed(2),
      engagement: (item.engagement_rate || 0).toFixed(1) + "%",
      conversions: Math.floor(item.views * (Math.random() * 0.01)),
    }));
};
