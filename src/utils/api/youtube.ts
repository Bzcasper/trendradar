
import { TrendingItem } from './types';
import { supabase } from '@/integrations/supabase/client';
import { filterTrendsByQuery } from './utils';
import mockTrendData from '@/data/mockTrendData';

export async function fetchYouTubeTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    const { data, error } = await supabase.functions.invoke('youtube-search', {
      body: { query, timeframe }
    });
    
    if (error) {
      console.error('Supabase YouTube search error:', error);
      throw error;
    }
    
    if (data && Array.isArray(data)) {
      return data.map(item => ({
        ...item,
        platform: 'YouTube'
      }));
    }
    
    throw new Error('Invalid response from YouTube API');
  } catch (error) {
    console.error('Error fetching YouTube trends:', error);
    
    const mockYouTubeData = mockTrendData
      .filter(item => item.platform === 'YouTube' || !item.platform)
      .slice(0, 5)
      .map(item => ({
        ...item,
        platform: 'YouTube'
      }));
      
    return filterTrendsByQuery(mockYouTubeData, query);
  }
}

export async function analyzeSingleYouTubeVideo(videoId: string): Promise<TrendingItem | null> {
  try {
    const { data, error } = await supabase.functions.invoke('youtube-video-analysis', {
      body: { videoId }
    });
    
    if (error) {
      console.error('Supabase YouTube video analysis error:', error);
      throw error;
    }
    
    if (data) {
      return {
        ...data,
        platform: 'YouTube'
      };
    }
    
    throw new Error('Invalid response from YouTube API');
  } catch (error) {
    console.error('Error analyzing YouTube video:', error);
    return null;
  }
}
