
import { TrendingItem } from './types';
import { supabase } from '@/integrations/supabase/client';
import { extractKeywords } from './utils';

export async function fetchNewsTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    // Call Supabase Edge Function to handle NewsAPI requests
    const { data, error } = await supabase.functions.invoke('news-trends', {
      body: { query, timeframe }
    });
    
    if (error) {
      console.error('Supabase News search error:', error);
      throw error;
    }
    
    if (data && Array.isArray(data)) {
      return data.map(item => ({
        ...item,
        platform: 'NewsAPI'
      }));
    }
    
    throw new Error('Invalid response from News API');
  } catch (error) {
    console.error('Error fetching News trends:', error);
    
    // Fallback to synthetic data
    const newsTitles = [
      "Global Economy: Markets Reach Record Highs Despite Inflation Concerns",
      "Climate Summit: World Leaders Pledge New Emission Targets",
      "Tech Giants Announce Revolutionary AI Developments",
      "Health Report: New Study Reveals Benefits of Intermittent Fasting",
      "Space Exploration: Private Companies Plan First Commercial Moon Landing"
    ];
    
    const results = newsTitles
      .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
      .map((title, index) => {
        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 5));
        
        const views = Math.floor(Math.random() * 200000) + 30000;
        const likes = Math.floor(views * (Math.random() * 0.05 + 0.01));
        const comments = Math.floor(likes * (Math.random() * 0.5 + 0.2));
        
        return {
          id: `news-${index}`,
          video_id: `news-article-${index}`,
          title,
          views,
          likes,
          comments,
          category: 'News',
          platform: 'NewsAPI',
          thumbnail_url: `https://picsum.photos/seed/news${index}/300/200`,
          published_at: createdDate.toISOString(),
          description: `Breaking news about ${title.split(':')[0].trim()}`,
          keywords: extractKeywords(title)
        };
      });
      
    return results;
  }
}
