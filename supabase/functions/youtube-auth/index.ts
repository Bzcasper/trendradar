
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { corsHeaders } from '../_shared/cors.ts'

const CLIENT_ID = Deno.env.get('YOUTUBE_CLIENT_ID');
const CLIENT_SECRET = Deno.env.get('YOUTUBE_CLIENT_SECRET');
const REDIRECT_URI = 'https://a4df1979-e2d6-4bf8-9ddc-2c5daa66f295.lovableproject.com/auth/callback'; // Updated for Lovable preview URL

// Create the OAuth 2.0 URL
function createAuthUrl() {
  const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
  return `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=${scope}&` +
    `access_type=offline&` +
    `prompt=consent`;
}

// Exchange code for tokens
async function exchangeCodeForTokens(code: string) {
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
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

  return tokenResponse.json();
}

// Handle requests
Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders 
    });
  }

  try {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error('Missing OAuth credentials');
    }

    console.log('Processing request:', req.method); // Add logging

    const { action, code } = await req.json();
    console.log('Request payload:', { action, code: code ? '[REDACTED]' : undefined }); // Add logging

    if (action === 'login') {
      // Generate auth URL for initial login
      const authUrl = createAuthUrl();
      console.log('Generated auth URL (domain only):', new URL(authUrl).origin); // Log only the domain for security
      
      return new Response(
        JSON.stringify({ authUrl }),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    } else if (action === 'callback' && code) {
      // Exchange code for tokens
      console.log('Processing callback with code'); // Add logging
      const tokens = await exchangeCodeForTokens(code);
      console.log('Tokens received successfully'); // Add logging
      
      return new Response(
        JSON.stringify(tokens),
        { 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json'
          } 
        }
      );
    } else {
      throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Auth error:', error); // Add error logging
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
