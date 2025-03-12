
import { TrendingItem } from './types';
import { filterTrendsByQuery } from './utils';
import mockTrendData from '@/data/mockTrendData';
import { extractKeywords } from './utils';

export async function fetchRedditTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    const response = await fetch('https://www.reddit.com/subreddits/new/.json?limit=10');
    
    if (!response.ok) {
      throw new Error('Reddit API request failed');
    }
    
    const data = await response.json();
    const subreddits = data.data.children;
    
    const results = subreddits.map((subreddit: any, index: number) => {
      const subredditData = subreddit.data;
      const createdDate = new Date(subredditData.created_utc * 1000);
      
      const subscribers = subredditData.subscribers || 0;
      const views = subscribers * 10;
      const likes = subscribers * 0.5;
      const comments = subscribers * 0.2;
      
      return {
        id: `reddit-${index}`,
        video_id: subredditData.id,
        title: subredditData.title,
        views,
        likes,
        comments,
        category: 'Social',
        platform: 'Reddit',
        thumbnail_url: subredditData.icon_img || 'https://i.imgur.com/sdO8tAw.png',
        published_at: createdDate.toISOString(),
        description: subredditData.public_description || 'No description available',
        keywords: extractKeywords(subredditData.title + ' ' + (subredditData.public_description || ''))
      };
    });
    
    return filterTrendsByQuery(results, query);
  } catch (error) {
    console.error('Error fetching Reddit trends:', error);
    
    const mockRedditData = mockTrendData
      .filter(item => item.category === 'Reddit')
      .slice(0, 5)
      .map(item => ({
        ...item,
        platform: 'Reddit'
      }));
      
    return filterTrendsByQuery(mockRedditData, query);
  }
}
