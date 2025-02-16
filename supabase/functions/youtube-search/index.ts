
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { default: { url: string } };
    categoryId: string;
  };
}

interface VideoStats {
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
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

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Search for videos
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=10&key=${YOUTUBE_API_KEY}`
    )
    const searchData = await searchResponse.json()

    if (!searchData.items) {
      throw new Error('No results found')
    }

    // Store search query
    const { data: queryData, error: queryError } = await supabaseClient
      .from('search_queries')
      .insert({ query })
      .select()
      .single()

    if (queryError) throw queryError

    // Process each video
    const processedVideos = await Promise.all(
      searchData.items.map(async (item: YouTubeVideo, index: number) => {
        // Get video statistics
        const statsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${YOUTUBE_API_KEY}`
        )
        const statsData = await statsResponse.json()
        const stats = statsData.items[0] as VideoStats

        const videoData = {
          video_id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail_url: item.snippet.thumbnails.default.url,
          views: parseInt(stats.statistics.viewCount || '0'),
          likes: parseInt(stats.statistics.likeCount || '0'),
          comments: parseInt(stats.statistics.commentCount || '0'),
          category: item.snippet.categoryId,
          published_at: new Date().toISOString(),
        }

        // Insert video data
        const { data: video, error: videoError } = await supabaseClient
          .from('youtube_videos')
          .upsert(videoData)
          .select()
          .single()

        if (videoError) throw videoError

        // Create search result entry
        await supabaseClient.from('search_results').insert({
          query_id: queryData.id,
          video_id: video.id,
          rank: index + 1,
        })

        return {
          ...video,
          engagement_score: (video.likes + video.comments) / video.views * 100,
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
