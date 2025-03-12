
import mockTrendData from "@/data/mockTrendData";
import { calculateTrendingScore } from "./trendingAlgorithm";
import { TrendingItem } from "./api/types";

/**
 * Fetch trends from multiple platforms
 * Falls back to mock data if public APIs fail
 */
export async function fetchMultiPlatformTrends(
  query: string, 
  platform: string = 'all',
  timeframe: string = 'week'
): Promise<TrendingItem[]> {
  try {
    // Start with our mock data as fallback
    let results: TrendingItem[] = [...mockTrendData];
    
    if (platform === 'all' || platform === 'reddit') {
      try {
        const redditResults = await fetchRedditTrends(query);
        results = [...results, ...redditResults];
      } catch (error) {
        console.log('Reddit API fetch failed:', error);
      }
    }
    
    if (platform === 'all' || platform === 'tiktok') {
      try {
        const tiktokResults = await fetchTikTokTrends(query);
        results = [...results, ...tiktokResults];
      } catch (error) {
        console.log('TikTok API fetch failed:', error);
      }
    }
    
    // Filter by search query if provided
    if (query) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    return results;
  } catch (error) {
    console.error('Error fetching multi-platform trends:', error);
    // Fall back to filtered mock data
    return mockTrendData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
    );
  }
}

/**
 * Fetch trends from Reddit public API
 */
async function fetchRedditTrends(query: string): Promise<TrendingItem[]> {
  try {
    // Use public Reddit API - new subreddits
    const response = await fetch('https://www.reddit.com/subreddits/new/.json?limit=10');
    
    if (!response.ok) {
      throw new Error('Reddit API request failed');
    }
    
    const data = await response.json();
    const subreddits = data.data.children;
    
    // Transform Reddit data to match our format
    return subreddits.map((subreddit: any, index: number) => {
      const subredditData = subreddit.data;
      const createdDate = new Date(subredditData.created_utc * 1000);
      
      // Estimate metrics
      const subscribers = subredditData.subscribers || 0;
      const hoursSinceCreated = Math.max(1, (Date.now() - createdDate.getTime()) / (1000 * 60 * 60));
      
      // Create mock engagement metrics based on available data
      const views = subscribers * 10;
      const likes = subscribers * 0.5;
      const comments = subscribers * 0.2;
      
      // Calculate trending metrics
      const trendingMetrics = calculateTrendingScore(
        views,
        likes,
        comments,
        createdDate,
        0
      );
      
      return {
        id: `reddit-${index}`,
        video_id: subredditData.id,
        title: subredditData.title,
        views: views,
        likes: likes,
        comments: comments,
        category: 'Reddit',
        platform: 'Reddit', // Adding the required platform property
        thumbnail_url: subredditData.icon_img || 'https://i.imgur.com/sdO8tAw.png',
        published_at: new Date(subredditData.created_utc * 1000).toISOString(),
        description: subredditData.public_description || 'No description available',
        engagement_rate: trendingMetrics.engagementRate,
        view_velocity: trendingMetrics.viewVelocity,
        trending_score: trendingMetrics.trendingScore,
        viral_probability: trendingMetrics.viralProbability,
        keywords: extractKeywords(subredditData.title + ' ' + (subredditData.public_description || ''))
      };
    });
  } catch (error) {
    console.error('Error fetching Reddit trends:', error);
    return [];
  }
}

/**
 * Fetch trends from TikTok (using public endpoints)
 * Note: This is for demonstration purposes. In a real application,
 * we would need to use official APIs with authentication.
 */
async function fetchTikTokTrends(query: string): Promise<TrendingItem[]> {
  try {
    // For demonstration, we'll create synthetic TikTok data
    // In a real app, this would call the TikTok API
    
    const tiktokData = generateSyntheticTikTokData(query);
    return tiktokData;
  } catch (error) {
    console.error('Error with TikTok trends:', error);
    return [];
  }
}

/**
 * Generate synthetic TikTok data for demonstration
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
      
      // Calculate trending metrics
      const trendingMetrics = calculateTrendingScore(
        views,
        likes,
        comments,
        createdDate,
        0
      );
      
      return {
        id: `tiktok-${index}`,
        video_id: `tiktok-video-${index}`,
        title,
        views,
        likes,
        comments,
        category: 'TikTok',
        platform: 'TikTok', // Adding the required platform property
        thumbnail_url: `https://picsum.photos/seed/tiktok${index}/300/300`,
        published_at: createdDate.toISOString(),
        description: `Trending TikTok video about ${title.split('#')[0].trim()}`,
        engagement_rate: trendingMetrics.engagementRate,
        view_velocity: trendingMetrics.viewVelocity,
        trending_score: trendingMetrics.trendingScore,
        viral_probability: trendingMetrics.viralProbability,
        keywords: extractKeywords(title)
      };
    });
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
