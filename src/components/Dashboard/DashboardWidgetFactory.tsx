
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
import { TrendRadarWidget } from './Widgets/TrendRadarWidget';
import { useToast } from "@/hooks/use-toast";

// Widget factory component
export function DashboardWidgetContent({ type }: { type: WidgetType }) {
  const { toast } = useToast();

  // Render widget based on type with error handling
  try {
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
        
      case "trendRadar":
        return <TrendRadarWidget />;
        
      default:
        console.warn(`Unknown widget type: ${type}`);
        toast({
          title: "Widget Error",
          description: `Unknown widget type: ${type}`,
          variant: "destructive",
        });
        return <div className="p-4 text-center text-gray-500">Unknown widget type: {type}</div>;
    }
  } catch (error) {
    console.error(`Error rendering widget of type ${type}:`, error);
    toast({
      title: "Widget Error",
      description: "Error loading widget. Try refreshing the page.",
      variant: "destructive",
    });
    return (
      <div className="p-4 text-center text-red-500 border border-red-200 bg-red-50 rounded-md">
        Error loading widget. Please try refreshing the page.
      </div>
    );
  }
}

// Re-export types 
export * from "./types";
