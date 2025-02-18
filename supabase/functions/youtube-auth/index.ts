
// @ts-ignore
import { corsHeaders } from '../_shared/cors.ts';

console.log('Edge function starting...');

const CLIENT_ID = Deno.env.get('YOUTUBE_CLIENT_ID');
const CLIENT_SECRET = Deno.env.get('YOUTUBE_CLIENT_SECRET');
const REDIRECT_URI = 'https://a4df1979-e2d6-4bf8-9ddc-2c5daa66f295.lovableproject.com/auth/callback';

function createAuthUrl() {
  console.log('Creating auth URL...');
  const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=${scope}&` +
    `access_type=offline&` +
    `prompt=consent`;
  console.log('Auth URL created (domain):', new URL(url).origin);
  return url;
}

async function exchangeCodeForTokens(code: string) {
  console.log('Exchanging code for tokens...');
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

  console.log('Tokens received successfully');
  return tokenResponse.json();
}

Deno.serve(async (req) => {
  console.log('Received request:', req.method);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Validate credentials
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.error('Missing OAuth credentials');
      throw new Error('Missing OAuth credentials');
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log('Request body action:', body.action);
    } catch (e) {
      console.error('Failed to parse request body:', e);
      throw new Error('Invalid request body');
    }

    const { action, code } = body;

    if (action === 'login') {
      console.log('Processing login action');
      const authUrl = createAuthUrl();
      return new Response(
        JSON.stringify({ authUrl }),
        { 
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    } 
    
    if (action === 'callback' && code) {
      console.log('Processing callback action');
      const tokens = await exchangeCodeForTokens(code);
      return new Response(
        JSON.stringify(tokens),
        { 
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      );
    }

    console.error('Invalid action requested:', action);
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
