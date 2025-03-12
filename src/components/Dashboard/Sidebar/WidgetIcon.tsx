
import { Plus } from "lucide-react";
import { WidgetType } from "../types";
import { 
  TrafficTrendsIcon,
  TrafficSourcesIcon,
  ConversionFunnelIcon,
  PlatformPerformanceIcon,
  KeyMetricsIcon,
  TopPerformersIcon,
  EngagementRadarIcon,
  KeywordCloudIcon,
  ViralPotentialIcon,
  TrendRadarIcon,
  TrendHeatmapIcon
} from "../WidgetIcons";

export const getWidgetIcon = (type: WidgetType) => {
  switch (type) {
    case "trafficTrends": return <div className="w-6 h-6"><TrafficTrendsIcon /></div>;
    case "trafficSources": return <div className="w-6 h-6"><TrafficSourcesIcon /></div>;
    case "conversionFunnel": return <div className="w-6 h-6"><ConversionFunnelIcon /></div>;
    case "platformPerformance": return <div className="w-6 h-6"><PlatformPerformanceIcon /></div>;
    case "keyMetrics": return <div className="w-6 h-6"><KeyMetricsIcon /></div>;
    case "topPerformers": return <div className="w-6 h-6"><TopPerformersIcon /></div>;
    case "engagementRadar": return <div className="w-6 h-6"><EngagementRadarIcon /></div>;
    case "keywordCloud": return <div className="w-6 h-6"><KeywordCloudIcon /></div>;
    case "viralPotential": return <div className="w-6 h-6"><ViralPotentialIcon /></div>;
    case "trendPerformance": return <div className="w-6 h-6"><TrafficTrendsIcon /></div>; // Using TrafficTrendsIcon as a fallback
    case "trendHeatmap": return <div className="w-6 h-6"><TrendHeatmapIcon /></div>;
    case "trendRadar": return <div className="w-6 h-6"><TrendRadarIcon /></div>;
    default: return <Plus size={16} className="text-gray-400" />;
  }
};
