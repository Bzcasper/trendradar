
export interface TrendingItem {
  id: string;
  video_id?: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  category: string;
  platform: string;
  thumbnail_url: string;
  published_at: string;
  description?: string;
  engagement_rate?: number;
  view_velocity?: number;
  trending_score?: number;
  viral_probability?: number;
  trend_acceleration?: number;
  rsi?: number;
  relative_volume?: number;
  keywords?: Array<{ keyword: string; count: number }>;
  fibo_retracement?: number;
}

export interface ApiEndpoint {
  name: string;
  enabled: boolean;
  fetchFunction: (query: string, timeframe: string) => Promise<TrendingItem[]>;
}

export const SUPPORTED_PLATFORMS = [
  'all',
  'youtube',
  'twitter',
  'tiktok',
  'reddit',
  'news',
  'wikipedia',
  'pinterest',
  'explodingTopics'
] as const;

export type SupportedPlatform = typeof SUPPORTED_PLATFORMS[number];

export interface ApiConfig {
  apiKey?: string;
  apiEndpoint?: string;
  maxResults?: number;
  language?: string;
  region?: string;
}
