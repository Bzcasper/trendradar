
import { TrendingUp, Clock, Award, Zap } from "lucide-react";

// Format engagement rate for display
export const formatEngagement = (value: number | undefined) => {
  if (!value && value !== 0) return '-';
  return value.toFixed(1) + '%';
};

// Format large numbers with abbreviations (K, M, B)
export const formatNumber = (num: number | undefined) => {
  if (!num && num !== 0) return '-';
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Calculate trending indicator based on trending score
export const getTrendingIndicator = (score: number) => {
  if (score > 75) return { icon: TrendingUp, color: "text-green-500", text: "Hot" };
  if (score > 50) return { icon: TrendingUp, color: "text-orange-500", text: "Rising" };
  return { icon: Clock, color: "text-blue-500", text: "Steady" };
};

// Calculate viral potential indicator
export const getViralPotential = (probability: number) => {
  if (probability > 0.7) return { icon: Zap, color: "text-purple-500", text: "High" };
  if (probability > 0.4) return { icon: Award, color: "text-yellow-500", text: "Medium" };
  return { icon: Award, color: "text-gray-500", text: "Low" };
};
