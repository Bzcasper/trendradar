
import { TrendingItem } from './types';
import { extractKeywords } from './utils';

export function fetchTwitterTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  const twitterTrends = [
    "#TechInnovation The latest in AI and machine learning breakthroughs",
    "#TravelGoals Exploring hidden gems in Southeast Asia",
    "#HealthyLiving Simple habits that transform your wellbeing",
    "#ClimateAction How individuals are making a difference",
    "#FinancialFreedom Investment strategies for beginners"
  ];
  
  const results = twitterTrends
    .filter(title => query ? title.toLowerCase().includes(query.toLowerCase()) : true)
    .map((title, index) => {
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 7));
      
      const views = Math.floor(Math.random() * 500000) + 50000;
      const likes = Math.floor(views * (Math.random() * 0.1 + 0.05));
      const comments = Math.floor(likes * (Math.random() * 0.2 + 0.1));
      
      return {
        id: `twitter-${index}`,
        video_id: `twitter-trend-${index}`,
        title,
        views,
        likes,
        comments,
        category: 'Social',
        platform: 'Twitter',
        thumbnail_url: `https://picsum.photos/seed/twitter${index}/300/200`,
        published_at: createdDate.toISOString(),
        description: `Trending Twitter topic about ${title.split('#')[1]}`,
        keywords: extractKeywords(title)
      };
    });
    
  return Promise.resolve(results);
}
