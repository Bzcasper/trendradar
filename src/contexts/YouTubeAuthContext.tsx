
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface YouTubeAuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const YouTubeAuthContext = createContext<YouTubeAuthContextType | undefined>(undefined);

export function YouTubeAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing token in localStorage
    const token = localStorage.getItem('youtube_access_token');
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async () => {
    try {
      console.log('Initiating YouTube login');
      const { data, error } = await supabase.functions.invoke('youtube-auth', {
        body: { action: 'login' }
      });

      if (error) throw error;
      
      if (data?.authUrl) {
        // Redirect to Google's OAuth consent screen
        window.location.href = data.authUrl;
      } else {
        throw new Error('No auth URL received');
      }
    } catch (error) {
      console.error('YouTube login error:', error);
      toast({
        title: "Failed to connect YouTube",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('youtube_access_token');
      setAccessToken(null);
      setIsAuthenticated(false);
      
      toast({
        title: "Disconnected from YouTube",
        description: "Your YouTube account has been disconnected",
      });
    } catch (error) {
      console.error('YouTube logout error:', error);
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <YouTubeAuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
      {children}
    </YouTubeAuthContext.Provider>
  );
}

export function useYouTubeAuth() {
  const context = useContext(YouTubeAuthContext);
  if (context === undefined) {
    throw new Error('useYouTubeAuth must be used within a YouTubeAuthProvider');
  }
  return context;
}
