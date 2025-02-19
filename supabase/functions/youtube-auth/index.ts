
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

const YOUTUBE_CLIENT_ID = Deno.env.get('YOUTUBE_CLIENT_ID');
const YOUTUBE_CLIENT_SECRET = Deno.env.get('YOUTUBE_CLIENT_SECRET');
const REDIRECT_URI = 'https://trendradar.ai/auth/callback';

serve(async (req) => {
  console.log('YouTube auth function invoked:', req.method);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Verify auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    // Verify environment variables
    if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET) {
      console.error('Missing required environment variables');
      throw new Error('YouTube API credentials not configured');
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('Failed to parse request body:', e);
      throw new Error('Invalid request format');
    }

    const { action } = body;
    console.log('Processing action:', action);

    if (action === 'login') {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${YOUTUBE_CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly')}&` +
        `access_type=offline&` +
        `prompt=consent`;

      console.log('Generated auth URL:', authUrl);
      
      return new Response(
        JSON.stringify({ 
          authUrl,
          timestamp: new Date().toISOString()
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    throw new Error(`Invalid action: ${action}`);

  } catch (error) {
    console.error('Edge function error:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message,
        timestamp: new Date().toISOString()
      }),
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
