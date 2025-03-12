
import { TrendingItem } from './types';
import { extractKeywords } from './utils';

export function fetchTikTokTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  const tiktokTitles = [
    "How to perfect that trending dance move #dance #viral",
    "What I eat in a day as a fitness model #fitness #nutrition",
    "DIY home decor ideas you haven't seen before #homedecor #diy",
    "Transforming my apartment with just $100 #budget #interiordesign",
    "Day in the life of a software engineer #tech #coding"
  ];
  
  const results = tiktokTitles
    .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
    .map((title, index) => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 10));
      
      const views = Math.floor(Math.random() * 1000000) + 100000;
      const likes = Math.floor(views * (Math.random() * 0.2 + 0.1));
      const comments = Math.floor(likes * (Math.random() * 0.3 + 0.05));
      
      return {
        id: `tiktok-${index}`,
        video_id: `tiktok-video-${index}`,
        title,
        views,
        likes,
        comments,
        category: 'Entertainment',
        platform: 'TikTok',
        thumbnail_url: `https://picsum.photos/seed/tiktok${index}/300/300`,
        published_at: createdDate.toISOString(),
        description: `Trending TikTok video about ${title.split('#')[0].trim()}`,
        keywords: extractKeywords(title)
      };
    });
    
  return Promise.resolve(results);
}
