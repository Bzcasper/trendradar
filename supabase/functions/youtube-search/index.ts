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
      searchData.items.map(async (item: YouTubeVideo) => {
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${YOUTUBE_API_KEY}`
        )
        const statsData = await statsResponse.json()
        const stats = statsData.items[0] as VideoStats

        const views = parseInt(stats.statistics.viewCount || '0')
        const likes = parseInt(stats.statistics.likeCount || '0')
        const comments = parseInt(stats.statistics.commentCount || '0')
        const publishedAt = item.snippet.publishedAt

        // Get AI-powered categorization
        const aiCategory = await categorizeContent(
          item.snippet.title,
          item.snippet.description
        );

        // Calculate metrics
        const viewVelocity = calculateViewVelocity(views, publishedAt)
        const engagementRate = calculateEngagementRate(likes, comments, views)
        const audienceRetention = 50 // Placeholder
        const trendAcceleration = calculateTrendAcceleration(viewVelocity, viewVelocity * 0.8)
        const movingAverage = calculateMovingAverage(viewVelocity, [viewVelocity * 0.8, viewVelocity * 0.9])
        const viralProbability = calculateViralProbability(viewVelocity, engagementRate, trendAcceleration)
        const trendingScore = calculateTrendingScore(
          viewVelocity,
          engagementRate,
          audienceRetention,
          trendAcceleration,
          movingAverage,
          viralProbability
        )

        const videoData = {
          video_id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail_url: item.snippet.thumbnails.default.url,
          views,
          likes,
          comments,
          category: aiCategory, // Use AI-generated category
          published_at: publishedAt,
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

        // Store trend metrics
        await supabaseClient
          .from('trend_metrics')
          .upsert({
            video_id: item.id.videoId,
            title: item.snippet.title,
            view_velocity: viewVelocity,
            engagement_rate: engagementRate,
            audience_retention: audienceRetention,
            trending_score: trendingScore,
            trend_acceleration: trendAcceleration,
            moving_average: movingAverage,
            viral_probability: viralProbability,
            metadata: {
              views,
              likes,
              comments,
              published_at: publishedAt,
              category: aiCategory // Store AI category in metadata
            }
          }, {
            onConflict: 'video_id',
            ignoreDuplicates: false
          })

        // Store search results
        await supabaseClient
          .from('search_results')
          .upsert({
            query_id: queryData.id,
            video_id: video.id,
            rank: index + 1,
          }, {
            onConflict: 'query_id,video_id',
            ignoreDuplicates: true
          })

        return {
          ...video,
          view_velocity: viewVelocity,
          engagement_rate: engagementRate,
          trending_score: trendingScore,
          viral_probability: viralProbability
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
