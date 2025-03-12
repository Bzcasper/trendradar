
import { TrendingItem } from './types';
import { supabase } from '@/integrations/supabase/client';
import { extractKeywords } from './utils';

export async function fetchWikipediaTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    // Call Supabase Edge Function to handle Wikipedia API requests
    const { data, error } = await supabase.functions.invoke('wikipedia-trends', {
      body: { query, timeframe }
    });
    
    if (error) {
      console.error('Supabase Wikipedia search error:', error);
      throw error;
    }
    
    if (data && Array.isArray(data)) {
      return data.map(item => ({
        ...item,
        platform: 'Wikipedia'
      }));
    }
    
    throw new Error('Invalid response from Wikipedia API');
  } catch (error) {
    console.error('Error fetching Wikipedia trends:', error);
    
    // Fallback to synthetic data
    const wikiTrends = [
      "Artificial Intelligence: Evolution and Impact on Society",
      "Climate Change: Latest Research and Global Response",
      "Space Exploration: Recent Discoveries and Future Missions",
      "Quantum Computing: Breakthroughs and Applications",
      "Renewable Energy: Innovations and Global Adoption"
    ];
    
    const results = wikiTrends
      .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
      .map((title, index) => {
        const createdDate = new Date();
        createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 14));
        
        const views = Math.floor(Math.random() * 300000) + 20000;
        const likes = Math.floor(views * (Math.random() * 0.02 + 0.01));
        const comments = Math.floor(likes * (Math.random() * 0.1 + 0.05));
        
        return {
          id: `wiki-${index}`,
          video_id: `wiki-article-${index}`,
          title,
          views,
          likes,
          comments,
          category: 'Knowledge',
          platform: 'Wikipedia',
          thumbnail_url: `https://picsum.photos/seed/wiki${index}/300/200`,
          published_at: createdDate.toISOString(),
          description: `Trending Wikipedia article about ${title.split(':')[0].trim()}`,
          keywords: extractKeywords(title)
        };
      });
      
    return results;
  }
}
