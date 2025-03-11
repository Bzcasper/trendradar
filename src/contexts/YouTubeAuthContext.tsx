
import React, { createContext, useContext, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

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
  const { user } = useAuth();

  const login = async () => {
    try {
      if (!user) {
        throw new Error('Please sign in first to connect your YouTube account');
      }
      
      // In a real app, this would redirect to OAuth
      // For now, we're simulating a successful connection
      setIsAuthenticated(true);
      setAccessToken('mock-token');
      
      toast({
        title: "YouTube Connected",
        description: "Your YouTube account has been successfully connected",
      });
    } catch (error) {
      console.error('YouTube login error:', error);
      toast({
        title: "Failed to connect YouTube",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
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
        description: error instanceof Error ? error.message : "An unexpected error occurred",
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
