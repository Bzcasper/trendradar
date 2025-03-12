
import React from "react";
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

// Returns the appropriate icon component for a widget type
export const getWidgetIcon = (type: WidgetType) => {
  switch (type) {
    case "trafficTrends":
      return React.createElement(TrafficTrendsIcon);
    case "trafficSources":
      return React.createElement(TrafficSourcesIcon);
    case "conversionFunnel":
      return React.createElement(ConversionFunnelIcon);
    case "platformPerformance":
      return React.createElement(PlatformPerformanceIcon);
    case "keyMetrics":
      return React.createElement(KeyMetricsIcon);
    case "topPerformers":
      return React.createElement(TopPerformersIcon);
    case "engagementRadar":
      return React.createElement(EngagementRadarIcon);
    case "keywordCloud":
      return React.createElement(KeywordCloudIcon);
    case "viralPotential":
      return React.createElement(ViralPotentialIcon);
    case "trendHeatmap":
      return React.createElement(TrendHeatmapIcon);
    case "trendRadar":
      return React.createElement(TrendRadarIcon);
    case "trendPerformance":
      return React.createElement(TrafficTrendsIcon);
    default:
      return React.createElement("div", { className: "w-8 h-8 bg-gray-200 rounded-full" });
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
