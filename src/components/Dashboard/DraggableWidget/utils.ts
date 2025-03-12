
import { WidgetType } from "../types";
import { 
  TrafficTrendsIcon,
  TrafficSourcesIcon,
  ConversionFunnelIcon,
  PlatformPerformanceIcon,
  KeyMetricsIcon,
  EngagementRadarIcon,
  KeywordCloudIcon,
  ViralPotentialIcon,
  TopPerformersIcon,
  TrendHeatmapIcon,
  TrendRadarIcon
} from '../WidgetIcons';

export const getWidgetIcon = (type: WidgetType): JSX.Element => {
  switch (type) {
    case "trafficTrends":
      return <TrafficTrendsIcon />;
    case "trafficSources":
      return <TrafficSourcesIcon />;
    case "conversionFunnel":
      return <ConversionFunnelIcon />;
    case "platformPerformance":
      return <PlatformPerformanceIcon />;
    case "keyMetrics":
      return <KeyMetricsIcon />;
    case "topPerformers":
      return <TopPerformersIcon />;
    case "engagementRadar":
      return <EngagementRadarIcon />;
    case "keywordCloud":
      return <KeywordCloudIcon />;
    case "viralPotential":
      return <ViralPotentialIcon />;
    case "trendHeatmap":
      return <TrendHeatmapIcon />;
    case "trendRadar":
      return <TrendRadarIcon />;
    case "trendPerformance":
      return <TrafficTrendsIcon />;
    default:
      return <div className="w-8 h-8 bg-gray-200 rounded-full" />;
  }
};

export const getWidgetColors = (type: WidgetType): { bg: string; border: string } => {
  switch (type) {
    case "trafficTrends":
      return { bg: "bg-blue-50", border: "border-blue-500" };
    case "trafficSources":
      return { bg: "bg-red-50", border: "border-red-500" };
    case "conversionFunnel":
      return { bg: "bg-blue-50", border: "border-blue-500" };
    case "platformPerformance":
      return { bg: "bg-green-50", border: "border-green-500" };
    case "keyMetrics":
      return { bg: "bg-blue-50", border: "border-blue-500" };
    case "topPerformers":
      return { bg: "bg-teal-50", border: "border-teal-500" };
    case "engagementRadar":
      return { bg: "bg-orange-50", border: "border-orange-500" };
    case "keywordCloud":
      return { bg: "bg-gray-100", border: "border-gray-500" };
    case "viralPotential":
      return { bg: "bg-yellow-50", border: "border-yellow-500" };
    case "trendHeatmap":
      return { bg: "bg-indigo-50", border: "border-indigo-500" };
    case "trendRadar":
      return { bg: "bg-purple-50", border: "border-purple-500" };
    case "trendPerformance":
      return { bg: "bg-cyan-50", border: "border-cyan-500" };
    default:
      return { bg: "bg-gray-100", border: "border-gray-300" };
  }
};
