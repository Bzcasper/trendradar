import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');
      const error_description = urlParams.get('error_description');
      
      // Handle OAuth errors
      if (error) {
        console.error('Auth error:', error, error_description);
        toast({
          title: "Authentication failed",
          description: error_description || error,
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }
      
      if (code) {
        try {
          console.log('Processing auth callback with code');
          
          // If we have a session, this is YouTube auth
          if (session) {
            const { data, error } = await supabase.functions.invoke('youtube-auth', {
              body: { action: 'callback', code }
            });

            if (error) throw error;

            // Store the access token
            localStorage.setItem('youtube_access_token', data.access_token);
            
            toast({
              title: "Successfully connected to YouTube",
              description: "You can now use YouTube features",
            });

            // Redirect back to main page
            navigate('/');
          } else {
            // Otherwise, let Supabase handle the OAuth flow
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) throw error;
            
            toast({
              title: "Successfully signed in",
              description: "Welcome back!",
            });
            
            navigate('/');
          }
        } catch (error) {
          console.error('Auth callback error:', error);
          toast({
            title: "Authentication failed",
            description: error.message,
            variant: "destructive",
          });
          navigate('/auth');
        }
      } else {
        console.error('No code in callback URL');
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate, toast, session]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating...</h1>
        <p>Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
}
