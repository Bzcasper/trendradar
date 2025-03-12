
import { calculateTrendingScore, calculateFibonacciRetracement } from "./trendingAlgorithm";
import mockTrendData from "@/data/mockTrendData";
import { supabase } from "@/integrations/supabase/client";

// Define the response structure for trend data
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
}

interface ApiEndpoint {
  name: string;
  enabled: boolean;
  fetchFunction: (query: string, timeframe: string) => Promise<TrendingItem[]>;
}

/**
 * Main function to fetch trends from multiple platforms
 */
export async function fetchMultiPlatformTrends(
  query: string,
  platforms: string[] = ['all'],
  timeframe: string = 'week'
): Promise<TrendingItem[]> {
  try {
    // Start with an empty results array
    let allResults: TrendingItem[] = [];
    const isAllPlatforms = platforms.includes('all');
    
    // Configure API endpoints
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
      }
    ];
    
    // Create an array of promises for each enabled API
    const apiPromises = apiEndpoints
      .filter(endpoint => endpoint.enabled)
      .map(endpoint => {
        return endpoint.fetchFunction(query, timeframe)
          .catch(error => {
            console.error(`Error fetching from ${endpoint.name}:`, error);
            return [] as TrendingItem[]; // Return empty array on error
          });
      });
    
    // Wait for all API calls to complete
    const results = await Promise.all(apiPromises);
    
    // Combine all results
    allResults = results.flat();
    
    // If no results or error occurred, use mock data as fallback
    if (allResults.length === 0) {
      console.log('No API results found, using mock data as fallback');
      return filterMockData(query);
    }
    
    // Process results with our trend algorithm
    const processedResults = processResults(allResults);
    
    // Sort by trending score (descending)
    return processedResults.sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0));
  } catch (error) {
    console.error('Error in fetchMultiPlatformTrends:', error);
    // Fallback to filtered mock data on error
    return filterMockData(query);
  }
}

/**
 * Process results with our trending algorithm
 */
function processResults(results: TrendingItem[]): TrendingItem[] {
  return results.map(item => {
    // Calculate trending metrics using our algorithm
    const trendingMetrics = calculateTrendingScore(
      item.views,
      item.likes,
      item.comments,
      new Date(item.published_at),
      item.engagement_rate || 0
    );
    
    // Add Fibonacci retracement if we have peak value (for established trends)
    let fiboRetracement;
    if (item.views > 100000) { // Arbitrary threshold for "peak"
      const peakValue = item.views * 1.2; // Simulate a higher peak in the past
      fiboRetracement = calculateFibonacciRetracement(peakValue, item.views);
    }
    
    // Return enhanced item with calculated metrics
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
  });
}

/**
 * Filter mock data based on query
 */
function filterMockData(query: string): TrendingItem[] {
  if (!query) return mockTrendData;
  
  return mockTrendData.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );
}

/**
 * YouTube API integration
 */
async function fetchYouTubeTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    // Try to use Supabase Edge Function for YouTube API (if available)
    const { data, error } = await supabase.functions.invoke('youtube-search', {
      body: { query, timeframe }
    });
    
    if (error) {
      console.error('Supabase YouTube search error:', error);
      throw error;
    }
    
    if (data && Array.isArray(data)) {
      // Add platform information
      return data.map(item => ({
        ...item,
        platform: 'YouTube'
      }));
    }
    
    throw new Error('Invalid response from YouTube API');
  } catch (error) {
    console.error('Error fetching YouTube trends:', error);
    
    // Fallback to mock YouTube data
    const mockYouTubeData = mockTrendData
      .filter(item => item.category === 'YouTube' || !item.category)
      .slice(0, 5)
      .map(item => ({
        ...item,
        platform: 'YouTube'
      }));
      
    return filterTrendsByQuery(mockYouTubeData, query);
  }
}

/**
 * Reddit API integration
 */
async function fetchRedditTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    // Reddit public API - new subreddits
    const response = await fetch('https://www.reddit.com/subreddits/new/.json?limit=10');
    
    if (!response.ok) {
      throw new Error('Reddit API request failed');
    }
    
    const data = await response.json();
    const subreddits = data.data.children;
    
    // Transform Reddit data to match our format
    const results = subreddits.map((subreddit: any, index: number) => {
      const subredditData = subreddit.data;
      const createdDate = new Date(subredditData.created_utc * 1000);
      
      // Estimate metrics
      const subscribers = subredditData.subscribers || 0;
      const views = subscribers * 10;
      const likes = subscribers * 0.5;
      const comments = subscribers * 0.2;
      
      return {
        id: `reddit-${index}`,
        video_id: subredditData.id,
        title: subredditData.title,
        views: views,
        likes: likes,
        comments: comments,
        category: 'Social',
        platform: 'Reddit',
        thumbnail_url: subredditData.icon_img || 'https://i.imgur.com/sdO8tAw.png',
        published_at: createdDate.toISOString(),
        description: subredditData.public_description || 'No description available',
        keywords: extractKeywords(subredditData.title + ' ' + (subredditData.public_description || ''))
      };
    });
    
    return filterTrendsByQuery(results, query);
  } catch (error) {
    console.error('Error fetching Reddit trends:', error);
    
    // Fallback to mock Reddit data
    const mockRedditData = mockTrendData
      .filter(item => item.category === 'Reddit')
      .slice(0, 5)
      .map(item => ({
        ...item,
        platform: 'Reddit'
      }));
      
    return filterTrendsByQuery(mockRedditData, query);
  }
}

/**
 * Twitter/X API integration
 */
async function fetchTwitterTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  // For demonstration, we'll create synthetic Twitter data
  // In a real app, you would use the Twitter API with authentication
  
  try {
    const mockTwitterData = generateSyntheticTwitterData(query);
    return mockTwitterData;
  } catch (error) {
    console.error('Error with Twitter trends:', error);
    return [];
  }
}

/**
 * TikTok API integration
 */
async function fetchTikTokTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  // For demonstration, we'll create synthetic TikTok data
  // In a real app, you would use the TikTok API with authentication
  
  try {
    const mockTikTokData = generateSyntheticTikTokData(query);
    return mockTikTokData;
  } catch (error) {
    console.error('Error with TikTok trends:', error);
    return [];
  }
}

/**
 * News API integration
 */
async function fetchNewsTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    // For demonstration, we'll create synthetic news data
    // In a real app, you would use the NewsAPI with authentication
    
    const mockNewsData = generateSyntheticNewsData(query);
    return mockNewsData;
  } catch (error) {
    console.error('Error with News API:', error);
    return [];
  }
}

/**
 * Wikipedia API integration
 */
async function fetchWikipediaTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    // Wikipedia most viewed pages API
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const response = await fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
    );
    
    if (!response.ok) {
      throw new Error('Wikipedia API request failed');
    }
    
    const data = await response.json();
    
    if (!data.items || !data.items[0] || !data.items[0].articles) {
      throw new Error('Invalid Wikipedia API response');
    }
    
    const articles = data.items[0].articles.slice(0, 10);
    
    // Transform Wikipedia data to match our format
    const results = articles.map((article: any, index: number) => {
      // Generate random stats for demo purposes
      const views = article.views || Math.floor(Math.random() * 100000) + 10000;
      const likes = Math.floor(views * (Math.random() * 0.05 + 0.01));
      const comments = Math.floor(likes * (Math.random() * 0.3 + 0.1));
      
      // Calculate published date (assume within last 30 days)
      const publishedDate = new Date();
      publishedDate.setDate(publishedDate.getDate() - Math.floor(Math.random() * 30));
      
      return {
        id: `wikipedia-${index}`,
        video_id: article.article,
        title: article.article.replace(/_/g, ' '),
        views: views,
        likes: likes,
        comments: comments,
        category: 'Knowledge',
        platform: 'Wikipedia',
        thumbnail_url: `https://picsum.photos/seed/wiki${index}/300/200`,
        published_at: publishedDate.toISOString(),
        description: `This Wikipedia article has been viewed ${views} times.`,
        keywords: extractKeywords(article.article.replace(/_/g, ' '))
      };
    });
    
    return filterTrendsByQuery(results, query);
  } catch (error) {
    console.error('Error fetching Wikipedia trends:', error);
    
    // Fallback to mock Wikipedia data
    const mockWikiData = generateSyntheticWikipediaData(query);
    return mockWikiData;
  }
}

/**
 * Generate synthetic Twitter data
 */
function generateSyntheticTwitterData(query: string): TrendingItem[] {
  const twitterTrends = [
    "#TechInnovation The latest in AI and machine learning breakthroughs",
    "#TravelGoals Exploring hidden gems in Southeast Asia",
    "#HealthyLiving Simple habits that transform your wellbeing",
    "#ClimateAction How individuals are making a difference",
    "#FinancialFreedom Investment strategies for beginners"
  ];
  
  return twitterTrends
    .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
    .map((title, index) => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 7));
      
      // Random metrics
      const views = Math.floor(Math.random() * 500000) + 50000;
      const likes = Math.floor(views * (Math.random() * 0.1 + 0.05));
      const comments = Math.floor(likes * (Math.random() * 0.2 + 0.1));
      
      return {
        id: `twitter-${index}`,
        video_id: `twitter-trend-${index}`,
        title,
        views,
        likes,
        comments,
        category: 'Social',
        platform: 'Twitter',
        thumbnail_url: `https://picsum.photos/seed/twitter${index}/300/200`,
        published_at: createdDate.toISOString(),
        description: `Trending Twitter topic about ${title.split('#')[1]}`,
        keywords: extractKeywords(title)
      };
    });
}

/**
 * Generate synthetic TikTok data
 */
function generateSyntheticTikTokData(query: string): TrendingItem[] {
  const tiktokTitles = [
    "How to perfect that trending dance move #dance #viral",
    "What I eat in a day as a fitness model #fitness #nutrition",
    "DIY home decor ideas you haven't seen before #homedecor #diy",
    "Transforming my apartment with just $100 #budget #interiordesign",
    "Day in the life of a software engineer #tech #coding"
  ];
  
  return tiktokTitles
    .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
    .map((title, index) => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 10));
      
      // Random metrics
      const views = Math.floor(Math.random() * 1000000) + 100000;
      const likes = Math.floor(views * (Math.random() * 0.2 + 0.1));
      const comments = Math.floor(likes * (Math.random() * 0.3 + 0.05));
      
      return {
        id: `tiktok-${index}`,
        video_id: `tiktok-video-${index}`,
        title,
        views,
        likes,
        comments,
        category: 'Entertainment',
        platform: 'TikTok',
        thumbnail_url: `https://picsum.photos/seed/tiktok${index}/300/300`,
        published_at: createdDate.toISOString(),
        description: `Trending TikTok video about ${title.split('#')[0].trim()}`,
        keywords: extractKeywords(title)
      };
    });
}

/**
 * Generate synthetic news data
 */
function generateSyntheticNewsData(query: string): TrendingItem[] {
  const newsTitles = [
    "Global Economy: Markets Reach Record Highs Despite Inflation Concerns",
    "Climate Summit: World Leaders Pledge New Emission Targets",
    "Tech Giants Announce Revolutionary AI Developments",
    "Health Report: New Study Reveals Benefits of Intermittent Fasting",
    "Space Exploration: Private Companies Plan First Commercial Moon Landing"
  ];
  
  return newsTitles
    .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
    .map((title, index) => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 5));
      
      // News metrics
      const views = Math.floor(Math.random() * 200000) + 30000;
      const likes = Math.floor(views * (Math.random() * 0.05 + 0.01));
      const comments = Math.floor(likes * (Math.random() * 0.5 + 0.2));
      
      return {
        id: `news-${index}`,
        video_id: `news-article-${index}`,
        title,
        views,
        likes,
        comments,
        category: 'News',
        platform: 'NewsAPI',
        thumbnail_url: `https://picsum.photos/seed/news${index}/300/200`,
        published_at: createdDate.toISOString(),
        description: `Breaking news about ${title.split(':')[0].trim()}`,
        keywords: extractKeywords(title)
      };
    });
}

/**
 * Generate synthetic Wikipedia data
 */
function generateSyntheticWikipediaData(query: string): TrendingItem[] {
  const wikiTopics = [
    "Artificial Intelligence: History and Modern Applications",
    "Climate Change: Scientific Consensus and Global Impact",
    "Quantum Computing: Principles and Future Potential",
    "Renaissance Art: Major Artists and Their Influence",
    "World History: Significant Events of the 20th Century"
  ];
  
  return wikiTopics
    .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
    .map((title, index) => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365));
      
      // Wikipedia metrics
      const views = Math.floor(Math.random() * 50000) + 5000;
      const likes = Math.floor(views * (Math.random() * 0.01 + 0.001));
      const comments = Math.floor(likes * (Math.random() * 0.1 + 0.05));
      
      return {
        id: `wiki-${index}`,
        video_id: `wiki-article-${index}`,
        title,
        views,
        likes,
        comments,
        category: 'Knowledge',
        platform: 'Wikipedia',
        thumbnail_url: `https://picsum.photos/seed/wiki${index}/300/200`,
        published_at: createdDate.toISOString(),
        description: `Wikipedia article about ${title.split(':')[0].trim()}`,
        keywords: extractKeywords(title)
      };
    });
}

/**
 * Filter trends by query
 */
function filterTrendsByQuery(trends: TrendingItem[], query: string): TrendingItem[] {
  if (!query) return trends;
  
  return trends.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
    (item.keywords && item.keywords.some(k => k.keyword.toLowerCase().includes(query.toLowerCase())))
  );
}

/**
 * Extract keywords from text
 */
function extractKeywords(text: string): { keyword: string, count: number }[] {
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have']);
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  const keywordCount = new Map<string, number>();
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      keywordCount.set(word, (keywordCount.get(word) || 0) + 1);
    }
  });
  
  // Extract hashtags as keywords with higher weight
  const hashtags = text.match(/#\w+/g) || [];
  hashtags.forEach(tag => {
    const keyword = tag.substring(1).toLowerCase();
    keywordCount.set(keyword, (keywordCount.get(keyword) || 0) + 3); // Give hashtags extra weight
  });
  
  return Array.from(keywordCount.entries())
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}
