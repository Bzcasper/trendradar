
import { calculateTrendingScore, calculateFibonacciRetracement } from "./trendingAlgorithm";
import mockTrendData from "@/data/mockTrendData";
import { TrendingItem, ApiEndpoint } from "./api/types";
import { fetchYouTubeTrends, analyzeSingleYouTubeVideo } from "./api/youtube";
import { fetchRedditTrends } from "./api/reddit";
import { fetchTwitterTrends } from "./api/twitter";
import { fetchTikTokTrends } from "./api/tiktok";
import { fetchNewsTrends } from "./api/news";
import { fetchWikipediaTrends } from "./api/wikipedia";
import { fetchPinterestTrends } from "./api/pinterest";
import { fetchExplodingTopics } from "./api/explodingTopics";
import { filterTrendsByQuery } from "./api/utils";

export type { TrendingItem };

export async function fetchMultiPlatformTrends(
  query: string,
  platforms: string[] = ['all'],
  timeframe: string = 'week'
): Promise<TrendingItem[]> {
  try {
    let allResults: TrendingItem[] = [];
    const isAllPlatforms = platforms.includes('all');
    
    const apiEndpoints: ApiEndpoint[] = [
      {
        name: 'youtube',
        enabled: isAllPlatforms || platforms.includes('youtube'),
        fetchFunction: fetchYouTubeTrends
      },
      {
        name: 'reddit',
        enabled: isAllPlatforms || platforms.includes('reddit'),
        fetchFunction: fetchRedditTrends
      },
      {
        name: 'twitter',
        enabled: isAllPlatforms || platforms.includes('twitter'),
        fetchFunction: fetchTwitterTrends
      },
      {
        name: 'tiktok',
        enabled: isAllPlatforms || platforms.includes('tiktok'),
        fetchFunction: fetchTikTokTrends
      },
      {
        name: 'news',
        enabled: isAllPlatforms || platforms.includes('news'),
        fetchFunction: fetchNewsTrends
      },
      {
        name: 'wikipedia',
        enabled: isAllPlatforms || platforms.includes('wikipedia'),
        fetchFunction: fetchWikipediaTrends
      },
      {
        name: 'pinterest',
        enabled: isAllPlatforms || platforms.includes('pinterest'),
        fetchFunction: fetchPinterestTrends
      },
      {
        name: 'explodingTopics',
        enabled: isAllPlatforms || platforms.includes('explodingTopics'),
        fetchFunction: fetchExplodingTopics
      }
    ];
    
    const apiPromises = apiEndpoints
      .filter(endpoint => endpoint.enabled)
      .map(endpoint => {
        return endpoint.fetchFunction(query, timeframe)
          .catch(error => {
            console.error(`Error fetching from ${endpoint.name}:`, error);
            return [] as TrendingItem[];
          });
      });
    
    const results = await Promise.all(apiPromises);
    allResults = results.flat();
    
    if (allResults.length === 0) {
      console.log('No API results found, using mock data as fallback');
      return filterMockData(query);
    }
    
    const processedResults = processResults(allResults);
    return processedResults.sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0));
  } catch (error) {
    console.error('Error in fetchMultiPlatformTrends:', error);
    return filterMockData(query);
  }
}

/**
 * Analyze a specific piece of content (video, post, etc.) using our trending algorithm
 */
export async function analyzeContent(
  contentId: string,
  platform: string = 'youtube'
): Promise<TrendingItem | null> {
  try {
    let contentData: TrendingItem | null = null;
    
    switch (platform.toLowerCase()) {
      case 'youtube':
        contentData = await analyzeSingleYouTubeVideo(contentId);
        break;
      // Add other platform-specific analysis functions as needed
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
    
    if (!contentData) {
      return null;
    }
    
    return processContentItem(contentData);
  } catch (error) {
    console.error('Error analyzing content:', error);
    return null;
  }
}

function processResults(results: TrendingItem[]): TrendingItem[] {
  return results.map(processContentItem);
}

function processContentItem(item: TrendingItem): TrendingItem {
  const trendingMetrics = calculateTrendingScore(
    item.views,
    item.likes,
    item.comments,
    new Date(item.published_at),
    item.engagement_rate || 0
  );
  
  let fiboRetracement;
  if (item.views > 100000) {
    const peakValue = item.views * 1.2;
    fiboRetracement = calculateFibonacciRetracement(peakValue, item.views);
  }
  
  return {
    ...item,
    engagement_rate: trendingMetrics.engagementRate,
    view_velocity: trendingMetrics.viewVelocity,
    trending_score: trendingMetrics.trendingScore,
    viral_probability: trendingMetrics.viralProbability,
    trend_acceleration: trendingMetrics.trendAcceleration,
    rsi: trendingMetrics.rsi,
    relative_volume: trendingMetrics.relativeVolume,
    fibo_retracement: fiboRetracement
  };
}

function filterMockData(query: string): TrendingItem[] {
  if (!query) return mockTrendData;
  
  return mockTrendData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );
}
