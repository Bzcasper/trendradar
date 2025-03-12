
import { useState } from "react";
import { AnalyticsDashboardHeader } from "./Analytics/AnalyticsDashboardHeader";
import { KeyMetricsCards } from "./Analytics/KeyMetricsCards";
import { TrafficTrendsChart } from "./Analytics/TrafficTrendsChart";
import { PerformanceSection } from "./Analytics/PerformanceSection";
import { TopPerformingTable } from "./Analytics/TopPerformingTable";
import { 
  calculateSummaryMetrics,
  getTrafficTrendsData,
  getPlatformPerformanceData,
  getFunnelData,
  getTrafficSourcesData,
  getTopPerformingContent
} from "./Analytics/utils/dataTransformations";

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("30days");
  
  // Get data from utility functions
  const { totalViews, avgEngagementRate, conversionRate, roi } = calculateSummaryMetrics();
  const trafficTrendsData = getTrafficTrendsData();
  const platformPerformanceData = getPlatformPerformanceData();
  const funnelData = getFunnelData(totalViews);
  const trafficSourcesData = getTrafficSourcesData();
  const topContent = getTopPerformingContent();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <AnalyticsDashboardHeader 
        timeframe={timeframe} 
        setTimeframe={setTimeframe} 
      />

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
