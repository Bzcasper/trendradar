
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const YOUTUBE_CLIENT_ID = Deno.env.get('YOUTUBE_CLIENT_ID');
const YOUTUBE_CLIENT_SECRET = Deno.env.get('YOUTUBE_CLIENT_SECRET');
const REDIRECT_URI = 'https://trendradar.ai/auth/callback';

function createAuthUrl() {
  console.log('Creating auth URL...');
  const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
  return `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${YOUTUBE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=${scope}&` +
    `access_type=offline&` +
    `prompt=consent`;
}

async function exchangeCodeForTokens(code: string) {
  console.log('Exchanging code for tokens...');
  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: YOUTUBE_CLIENT_ID!,
        client_secret: YOUTUBE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      console.error('Token exchange error:', error);
      throw new Error('Failed to exchange code for tokens');
    }

    console.log('Tokens received successfully');
    return tokenResponse.json();
  } catch (error) {
    console.error('Exchange code error:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET) {
      console.error('Missing required environment variables');
      throw new Error('Server configuration error');
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error('Invalid request body:', e);
      throw new Error('Invalid request format');
    }

    const { action, code } = body;
    console.log('Request action:', action);

    if (action === 'login') {
      const authUrl = createAuthUrl();
      return new Response(
        JSON.stringify({ authUrl }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    if (action === 'callback' && code) {
      const tokens = await exchangeCodeForTokens(code);
      return new Response(
        JSON.stringify(tokens),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    throw new Error('Invalid action');

  } catch (error) {
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack
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
