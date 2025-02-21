import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the URL parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        
        // Check for errors
        const error = queryParams.get('error') || hashParams.get('error');
        const errorDescription = queryParams.get('error_description') || hashParams.get('error_description');
        
        if (error) {
          console.error('Auth error:', error, errorDescription);
          toast({
            title: "Authentication failed",
            description: errorDescription || error,
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        // Get the auth code from URL
        const code = queryParams.get('code');
        
        if (code) {
          console.log('Processing auth code...');
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            throw error;
          }

          console.log('Successfully authenticated');
          toast({
            title: "Successfully signed in",
            description: "Welcome back!",
          });
          
          navigate('/dashboard');
        } else {
          // If no code is present, check if we're handling a successful OAuth response
          const accessToken = hashParams.get('access_token');
          if (accessToken) {
            console.log('Received access token from OAuth provider');
            navigate('/dashboard');
          } else {
            console.error('No authentication code or token found');
            navigate('/auth');
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast({
          title: "Authentication failed",
          description: error instanceof Error ? error.message : "An error occurred during authentication",
          variant: "destructive",
        });
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <p>Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}
