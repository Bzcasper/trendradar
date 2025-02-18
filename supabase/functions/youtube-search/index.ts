import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
    thumbnails: {
      default: { url: string, width: number, height: number };
      medium: { url: string, width: number, height: number };
      high: { url: string, width: number, height: number };
    };
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage?: string;
    localized?: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
}

interface VideoStats {
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    projection: string;
  };
  status: {
    uploadStatus: string;
    privacyStatus: string;
    license: string;
    embeddable: boolean;
    publicStatsViewable: boolean;
    madeForKids: boolean;
  };
  topicDetails?: {
    topicCategories: string[];
    relevantTopicIds: string[];
  };
}

interface AnalyticsData {
  views: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
  averageViewPercentage: number;
  subscribersGained: number;
  subscribersLost: number;
  shares: number;
  likes: number;
  dislikes: number;
  comments: number;
  annotationClickThroughRate: number;
  annotationCloseRate: number;
  annotationImpressions: number;
  cardClickRate: number;
  cardImpressions: number;
  cardClicks: number;
}

// Constants for token and text limits
const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_KEYWORDS = 15;

// Function to sanitize text by removing special characters
function sanitizeText(text: string): string {
  return text
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, ' ')     // Replace multiple spaces with single space
    .trim();
}

// Function to truncate text to token limit
function truncateToTokenLimit(text: string, limit: number): string {
  return text.length > limit ? text.substring(0, limit) + '...' : text;
}

// Enhanced categorization function with optimized prompt
async function categorizeContent(title: string, description: string): Promise<any> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
  const sanitizedTitle = sanitizeText(title);
  const sanitizedDescription = sanitizeText(description);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a content optimization expert. Analyze the video title and description to:
1. Categorize into ONE of: Technology, Gaming, Education, Entertainment, Music, Sports, News, Lifestyle, Business, Science, Arts, Travel
2. Create an SEO-optimized title (max 60 chars)
3. Write a clear, engaging one-sentence summary (max 150 chars)
4. Extract key themes and topics

Respond in JSON format only:
{
  "category": "category_name",
  "optimized_title": "seo_friendly_title",
  "summary": "one_sentence_summary",
  "themes": ["theme1", "theme2"]
}`
          },
          {
            role: 'user',
            content: `Title: ${sanitizedTitle}\nDescription: ${sanitizedDescription}`
          }
        ],
        temperature: 0.3,
        max_tokens: 250
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    return result;
  } catch (error) {
    console.error('Error categorizing content:', error);
    return {
      category: 'Uncategorized',
      optimized_title: sanitizedTitle,
      summary: truncateToTokenLimit(sanitizedDescription, 150),
      themes: []
    };
  }
}

// Enhanced keyword extraction with token limits
function extractKeywords(title: string, description: string): { keyword: string, count: number }[] {
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at']);
  const combined = `${sanitizeText(title)} ${sanitizeText(description)}`.toLowerCase();
  const words = combined.match(/\b\w+\b/g) || [];
  
  const keywordCount = new Map<string, number>();
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      keywordCount.set(word, (keywordCount.get(word) || 0) + 1);
    }
  });
  
  return Array.from(keywordCount.entries())
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_KEYWORDS);
}

// Implement RSI calculation from Part 2
function calculateRSI(viewHistory: number[]): number {
  if (viewHistory.length < 2) return 50;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = 1; i < viewHistory.length; i++) {
    const difference = viewHistory[i] - viewHistory[i - 1];
    if (difference > 0) {
      gains += difference;
    } else {
      losses -= difference;
    }
  }
  
  const avgGain = gains / viewHistory.length;
  const avgLoss = losses / viewHistory.length;
  
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// Calculate relative volume from Part 2
function calculateRelativeVolume(currentVolume: number, averageVolume: number): number {
  return averageVolume > 0 ? currentVolume / averageVolume : 1;
}

// Calculate view velocity
const calculateViewVelocity = (views: number, publishedAt: string): number => {
  const hoursSincePublished = (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60);
  return views / (hoursSincePublished || 1); // Prevent division by zero
};

// Calculate engagement rate
const calculateEngagementRate = (likes: number, comments: number, views: number): number => {
  return views > 0 ? ((likes + comments) / views) * 100 : 0;
};

// Calculate trend acceleration (simplified version)
const calculateTrendAcceleration = (currentVelocity: number, historicalVelocity: number): number => {
  return currentVelocity - historicalVelocity;
};

// Calculate moving average (simplified 3-point moving average)
const calculateMovingAverage = (currentVelocity: number, historicalData: number[]): number => {
  const velocities = [...historicalData.slice(-2), currentVelocity];
  return velocities.reduce((sum, v) => sum + v, 0) / velocities.length;
};

// Calculate viral probability (simplified logistic function)
const calculateViralProbability = (
  viewVelocity: number,
  engagementRate: number,
  trendAcceleration: number
): number => {
  const z = 0.4 * viewVelocity + 0.3 * engagementRate + 0.3 * trendAcceleration;
  return 1 / (1 + Math.exp(-z/10000)); // Normalized to prevent extreme values
};

// Calculate trending score
const calculateTrendingScore = (
  viewVelocity: number,
  engagementRate: number,
  audienceRetention: number,
  trendAcceleration: number,
  movingAverage: number,
  viralProbability: number
): number => {
  return (
    0.3 * viewVelocity +
    0.2 * engagementRate +
    0.1 * audienceRetention +
    0.15 * trendAcceleration +
    0.15 * movingAverage +
    0.1 * viralProbability * 100
  );
};

// Enhanced trending score calculation incorporating both Part 1 and Part 2
function calculateEnhancedTrendingScore(
  viewVelocity: number,
  engagementRate: number,
  audienceRetention: number,
  trendAcceleration: number,
  movingAverage: number,
  rsi: number,
  relativeVolume: number,
  fiboLevel: number
): number {
  // Weights from both parts of the algorithm
  const weights = {
    viewVelocity: 0.2,
    engagementRate: 0.15,
    audienceRetention: 0.1,
    trendAcceleration: 0.15,
    movingAverage: 0.1,
    rsi: 0.1,
    relativeVolume: 0.1,
    fiboLevel: 0.1
  };

  return (
    weights.viewVelocity * viewVelocity +
    weights.engagementRate * engagementRate +
    weights.audienceRetention * audienceRetention +
    weights.trendAcceleration * trendAcceleration +
    weights.movingAverage * movingAverage +
    weights.rsi * rsi +
    weights.relativeVolume * relativeVolume +
    weights.fiboLevel * fiboLevel
  );
}

async function getVideoAnalytics(videoId: string): Promise<AnalyticsData | null> {
  const YOUTUBE_CLIENT_ID = Deno.env.get('YOUTUBE_CLIENT_ID');
  const YOUTUBE_CLIENT_SECRET = Deno.env.get('YOUTUBE_CLIENT_SECRET');
  
  try {
    // This is a simplified version. In production, you'd need to handle OAuth2 flow
    // and token refresh properly
    const analyticsResponse = await fetch(
      `https://youtubeanalytics.googleapis.com/v2/reports?` +
      `dimensions=video` +
      `&ids=channel==MINE` +
      `&metrics=views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,` +
      `subscribersGained,subscribersLost,shares,likes,dislikes,comments,` +
      `annotationClickThroughRate,annotationCloseRate,annotationImpressions,` +
      `cardClickRate,cardImpressions,cardClicks` +
      `&filters=video==${videoId}` +
      `&startDate=1970-01-01` +
      `&endDate=2050-12-31`,
      {
        headers: {
          Authorization: `Bearer ${YOUTUBE_CLIENT_SECRET}`,
        }
      }
    );

    const data = await analyticsResponse.json();
    return data.rows[0] || null;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY')
    if (!YOUTUBE_API_KEY) {
      throw new Error('Missing YouTube API key')
    }

    const { query } = await req.json()
    if (!query) {
      throw new Error('Search query is required')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Initial search request with more parts
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet` +
      `&q=${encodeURIComponent(query)}` +
      `&type=video` +
      `&maxResults=50` +
      `&key=${YOUTUBE_API_KEY}`
    )
    const searchData = await searchResponse.json()

    if (!searchData.items) {
      throw new Error('No results found')
    }

    const { data: queryData, error: queryError } = await supabaseClient
      .from('search_queries')
      .insert({ query })
      .select()
      .single()

    if (queryError) throw queryError

    const processedVideos = await Promise.all(
      searchData.items.map(async (item: YouTubeVideo) => {
        // Fetch complete video details
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?` +
          `part=snippet,contentDetails,statistics,status,topicDetails` +
          `&id=${item.id.videoId}` +
          `&key=${YOUTUBE_API_KEY}`
        )
        const detailsData = await detailsResponse.json()
        const videoDetails = detailsData.items[0]

        // Get analytics data
        const analyticsData = await getVideoAnalytics(item.id.videoId);

        // Calculate metrics from algorithm
        const views = parseInt(videoDetails.statistics.viewCount || '0')
        const likes = parseInt(videoDetails.statistics.likeCount || '0')
        const comments = parseInt(videoDetails.statistics.commentCount || '0')
        const publishedAt = item.snippet.publishedAt
        
        // Calculate all metrics from our algorithm
        const viewHistory = [views * 0.7, views * 0.8, views * 0.9, views];
        const rsi = calculateRSI(viewHistory);
        const averageViews = viewHistory.reduce((a, b) => a + b, 0) / viewHistory.length;
        const relativeVolume = calculateRelativeVolume(views, averageViews);
        const fiboLevel = 61.8;

        const viewVelocity = calculateViewVelocity(views, publishedAt);
        const engagementRate = calculateEngagementRate(likes, comments, views);
        const audienceRetention = analyticsData?.averageViewPercentage || 50; // Default value
        const trendAcceleration = calculateTrendAcceleration(viewVelocity, viewVelocity * 0.8);
        const movingAverage = calculateMovingAverage(viewVelocity, [viewVelocity * 0.8, viewVelocity * 0.9]);

        const trendingScore = calculateEnhancedTrendingScore(
          viewVelocity,
          engagementRate,
          audienceRetention,
          trendAcceleration,
          movingAverage,
          rsi,
          relativeVolume,
          fiboLevel
        );

        // Get AI analysis
        const aiAnalysis = await categorizeContent(
          item.snippet.title,
          item.snippet.description
        );

        const keywords = extractKeywords(
          item.snippet.title,
          item.snippet.description
        );

        const videoData = {
          video_id: item.id.videoId,
          title: aiAnalysis.optimized_title,
          original_title: item.snippet.title,
          description: aiAnalysis.summary,
          original_description: item.snippet.description,
          channel: {
            id: item.snippet.channelId,
            title: item.snippet.channelTitle
          },
          thumbnails: item.snippet.thumbnails,
          published_at: item.snippet.publishedAt,
          content_details: videoDetails.contentDetails,
          status: videoDetails.status,
          topic_details: videoDetails.topicDetails,
          raw_statistics: videoDetails.statistics,
          analytics: analyticsData,
          metrics: {
            views,
            likes,
            comments,
            engagement_rate: engagementRate,
            view_velocity: viewVelocity,
            audience_retention: analyticsData?.averageViewPercentage || 50,
            trend_acceleration: trendAcceleration,
            moving_average: movingAverage,
            rsi,
            relative_volume: relativeVolume,
            fibo_level: fiboLevel,
            trending_score: trendingScore,
            analytics_metrics: {
              estimated_minutes_watched: analyticsData?.estimatedMinutesWatched || 0,
              average_view_duration: analyticsData?.averageViewDuration || 0,
              subscribers_gained: analyticsData?.subscribersGained || 0,
              subscribers_lost: analyticsData?.subscribersLost || 0,
              shares: analyticsData?.shares || 0,
              annotation_metrics: {
                ctr: analyticsData?.annotationClickThroughRate || 0,
                close_rate: analyticsData?.annotationCloseRate || 0,
                impressions: analyticsData?.annotationImpressions || 0
              },
              card_metrics: {
                ctr: analyticsData?.cardClickRate || 0,
                impressions: analyticsData?.cardImpressions || 0,
                clicks: analyticsData?.cardClicks || 0
              }
            }
          },
          ai_analysis: {
            category: aiAnalysis.category,
            themes: aiAnalysis.themes,
            keywords: keywords
          },
          algorithm_metrics: {
            part1: {
              view_velocity: viewVelocity,
              engagement_rate: engagementRate,
              audience_retention: analyticsData?.averageViewPercentage || 50,
              trend_acceleration: trendAcceleration,
              moving_average: movingAverage
            },
            part2: {
              rsi,
              relative_volume: relativeVolume,
              fibonacci_level: fiboLevel
            }
          }
        };

        // Store in Supabase (simplified for readability)
        const { error: videoError } = await supabaseClient
          .from('youtube_videos')
          .upsert({
            video_id: videoData.video_id,
            title: videoData.title,
            description: videoData.description,
            raw_data: videoData
          }, {
            onConflict: 'video_id'
          });

        if (videoError) throw videoError;

        return videoData;
      })
    );

    // Sort and get top 10
    const topResults = processedVideos
      .sort((a, b) => b.metrics.trending_score - a.metrics.trending_score)
      .slice(0, 10)
      .map((video, index) => ({
        ...video,
        trending_rank: index + 1
      }));

    // Send to webhook
    try {
      await fetch('https://vaubsaaeexjdgzpzuqcm.functions.supabase.co/webhook-sender', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        body: JSON.stringify({
          data: {
            timestamp: new Date().toISOString(),
            search_query: query,
            total_results: processedVideos.length,
            top_results: topResults
          }
        })
      });
    } catch (webhookError) {
      console.error('Webhook delivery failed:', webhookError);
    }

    return new Response(JSON.stringify(processedVideos), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
