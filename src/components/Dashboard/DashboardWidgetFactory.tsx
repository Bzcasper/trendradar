
import React from "react";
import { WidgetType } from "./types";
import { TrafficTrendsWidget } from "./Widgets/TrafficTrendsWidget";
import { TrafficSourcesWidget } from "./Widgets/TrafficSourcesWidget";
import { ConversionFunnelWidget } from "./Widgets/ConversionFunnelWidget";
import { PlatformPerformanceWidget } from "./Widgets/PlatformPerformanceWidget";
import { KeyMetricsWidget } from "./Widgets/KeyMetricsWidget";
import { TopPerformersWidget } from "./Widgets/TopPerformersWidget";
import { EngagementRadarWidget } from "./Widgets/EngagementRadarWidget";
import { KeywordCloudWidget } from "./Widgets/KeywordCloudWidget";
import { ViralPotentialWidget } from "./Widgets/ViralPotentialWidget";
import { TrendPerformanceWidget } from './Widgets/TrendPerformanceWidget';
import { TrendHeatmapWidget } from './Widgets/TrendHeatmapWidget';

// Re-export types and available widgets
export * from "./types";

// Widget factory component
export function DashboardWidgetContent({ type }: { type: WidgetType }) {
  // Render widget based on type
  switch (type) {
    case "trafficTrends":
      return <TrafficTrendsWidget />;
      
    case "trafficSources":
      return <TrafficSourcesWidget />;
      
    case "conversionFunnel":
      return <ConversionFunnelWidget />;
      
    case "platformPerformance":
      return <PlatformPerformanceWidget />;
      
    case "keyMetrics":
      return <KeyMetricsWidget />;

    case "topPerformers":
      return <TopPerformersWidget />;

    case "engagementRadar":
      return <EngagementRadarWidget />;

    case "keywordCloud":
      return <KeywordCloudWidget />;

    case "viralPotential":
      return <ViralPotentialWidget />;

    case "trendPerformance":
      return <TrendPerformanceWidget />;
      
    case "trendHeatmap":
      return <TrendHeatmapWidget />;
      
    default:
      return <div>Unknown widget type</div>;
  }
}
