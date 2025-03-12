
import { WidgetType } from "../types";
import { EngagementRadarIcon, KeyMetricsIcon, KeywordCloudIcon } from "../WidgetIcons";

export interface WidgetCategory {
  name: string;
  icon: React.FC;
  widgets: WidgetType[];
}

// Grouped widgets by category
export const WIDGET_CATEGORIES: WidgetCategory[] = [
  {
    name: "Analytics",
    icon: KeyMetricsIcon,
    widgets: ["trafficTrends", "trafficSources", "conversionFunnel", "platformPerformance", "trendPerformance"]
  },
  {
    name: "Engagement",
    icon: EngagementRadarIcon,
    widgets: ["keyMetrics", "engagementRadar", "topPerformers"]
  },
  {
    name: "Content",
    icon: KeywordCloudIcon,
    widgets: ["keywordCloud", "viralPotential"]
  }
];
