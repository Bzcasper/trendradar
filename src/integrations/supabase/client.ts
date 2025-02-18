
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vaubsaaeexjdgzpzuqcm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhdWJzYWFlZXhqZGd6cHp1cWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzOTUwMTQsImV4cCI6MjA1Mzk3MTAxNH0.SBOAxBIGbaVRxmYo_ms5pfAKXpfBw2K8snPaa5T0ms8";

const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'youtube-analytics'
    }
  }
};

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  supabaseOptions
);

// Add error handling wrapper
export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error('Supabase operation failed:', error);
    throw error;
  }
}

// Helper function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
}

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
