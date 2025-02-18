import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { default: { url: string } };
    categoryId: string;
    publishedAt: string;
  };
}

interface VideoStats {
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

// Function to extract and analyze keywords
function extractKeywords(title: string, description: string): { keyword: string, count: number }[] {
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at']);
  const combined = `${title} ${description}`.toLowerCase();
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
    .slice(0, 20); // Top 20 keywords
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

// Function to categorize content using OpenAI
async function categorizeContent(title: string, description: string): Promise<string> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  
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
            content: `You are a content categorization expert. Analyze the video title and description and return ONLY ONE of the following categories:
              - Technology
              - Gaming
              - Education
              - Entertainment
              - Music
              - Sports
              - News
              - Lifestyle
              - Business
              - Science
              - Arts
              - Travel
              Return ONLY the category name, nothing else.`
          },
          {
            role: 'user',
            content: `Title: ${title}\nDescription: ${description}`
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent categorization
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error categorizing content:', error);
    return 'Uncategorized';
  }
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

    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`
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
      searchData.items.map(async (item: YouTubeVideo, index: number) => {
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${YOUTUBE_API_KEY}`
        )
        const statsData = await statsResponse.json()
        const stats = statsData.items[0] as VideoStats

        const views = parseInt(stats.statistics.viewCount || '0')
        const likes = parseInt(stats.statistics.likeCount || '0')
        const comments = parseInt(stats.statistics.commentCount || '0')
        const publishedAt = item.snippet.publishedAt

        // Get AI categorization and keywords
        const aiCategory = await categorizeContent(
          item.snippet.title,
          item.snippet.description
        );

        const keywords = extractKeywords(
          item.snippet.title,
          item.snippet.description
        );

        const videoData = {
          video_id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail_url: item.snippet.thumbnails.default.url,
          views,
          likes,
          comments,
          category: aiCategory,
          published_at: publishedAt,
          keywords
        }

        // Store video data
        const { data: video, error: videoError } = await supabaseClient
          .from('youtube_videos')
          .upsert(videoData, {
            onConflict: 'video_id',
            ignoreDuplicates: false,
            returning: true
          })
          .select()
          .single()

        if (videoError) throw videoError

        // Send processed data to webhook
        try {
          await fetch('https://vaubsaaeexjdgzpzuqcm.functions.supabase.co/webhook-sender', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders
            },
            body: JSON.stringify({
              data: {
                ...videoData,
                ai_analysis: {
                  category: aiCategory,
                  keywords: keywords
                },
                metrics: {
                  views,
                  likes,
                  comments
                }
              }
            })
          });
        } catch (webhookError) {
          console.error('Webhook delivery failed:', webhookError);
          // Continue processing even if webhook fails
        }

        return {
          ...video,
          category: aiCategory,
          keywords
        }
      })
    )

    return new Response(JSON.stringify(processedVideos), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
