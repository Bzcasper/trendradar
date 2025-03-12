
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
  | "viralPotential"
  | "trendPerformance"
  | "trendRadar";

export interface WidgetData {
  id: string;
  type: WidgetType;
  title: string;
  size?: "small" | "medium" | "large" | "full";
}

export const availableWidgets: Array<{ type: WidgetType, title: string }> = [
  { type: "trafficTrends", title: "Traffic Trends" },
  { type: "trafficSources", title: "Traffic Sources" },
  { type: "conversionFunnel", title: "Conversion Funnel" },
  { type: "platformPerformance", title: "Platform Performance" },
  { type: "keyMetrics", title: "Key Metrics" },
  { type: "topPerformers", title: "Top Performers" },
  { type: "engagementRadar", title: "Engagement Radar" },
  { type: "keywordCloud", title: "Keyword Cloud" },
  { type: "viralPotential", title: "Viral Potential" },
  { type: "trendHeatmap", title: "Trend Heatmap" },
  { type: "trendPerformance", title: "Trend Performance" },
  { type: "trendRadar", title: "Trend Analysis Radar" }
];
