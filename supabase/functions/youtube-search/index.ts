
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
  };
}

// First, handle CORS
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
    if (!YOUTUBE_API_KEY) {
      throw new Error('Missing YouTube API key');
    }

    const { query } = await req.json();
    if (!query) {
      throw new Error('Search query is required');
    }

    console.log('Searching for:', query); // Add logging

    // Initial search request
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet` +
      `&q=${encodeURIComponent(query)}` +
      `&type=video` +
      `&maxResults=50` +
      `&key=${YOUTUBE_API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error(`YouTube API error: ${searchResponse.statusText}`);
    }

    const searchData = await searchResponse.json();
    console.log('Search results count:', searchData.items?.length); // Add logging

    if (!searchData.items) {
      throw new Error('No results found');
    }

    const processedVideos = await Promise.all(
      searchData.items.map(async (item: YouTubeVideo) => {
        // Fetch complete video details
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?` +
          `part=snippet,contentDetails,statistics,status` +
          `&id=${item.id.videoId}` +
          `&key=${YOUTUBE_API_KEY}`
        );

        if (!detailsResponse.ok) {
          throw new Error(`Video details API error: ${detailsResponse.statusText}`);
        }

        const detailsData = await detailsResponse.json();
        const videoDetails = detailsData.items[0];

        // Calculate metrics
        const views = parseInt(videoDetails.statistics.viewCount || '0');
        const likes = parseInt(videoDetails.statistics.likeCount || '0');
        const comments = parseInt(videoDetails.statistics.commentCount || '0');
        
        const viewVelocity = views / (
          (Date.now() - new Date(item.snippet.publishedAt).getTime()) / (1000 * 60 * 60)
        );
        
        const engagementRate = ((likes + comments) / views) * 100;

        // Return processed video data
        return {
          id: crypto.randomUUID(),
          video_id: item.id.videoId,
          title: item.snippet.title,
          views,
          likes,
          comments,
          category: videoDetails.snippet.categoryId,
          thumbnail_url: item.snippet.thumbnails.high.url,
          published_at: item.snippet.publishedAt,
          description: item.snippet.description,
          engagement_rate: engagementRate,
          view_velocity: viewVelocity,
          trending_score: (viewVelocity * 0.6) + (engagementRate * 0.4),
          viral_probability: Math.min(1, (viewVelocity / 10000) + (engagementRate / 100)),
          keywords: extractKeywords(item.snippet.title, item.snippet.description)
        };
      })
    );

    console.log('Successfully processed videos:', processedVideos.length); // Add logging

    // Return the processed results with CORS headers
    return new Response(
      JSON.stringify(processedVideos),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );

  } catch (error) {
    console.error('Error in youtube-search function:', error); // Add error logging
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
});

// Helper function to extract keywords
function extractKeywords(title: string, description: string): { keyword: string, count: number }[] {
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have']);
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
    .slice(0, 15);
}
