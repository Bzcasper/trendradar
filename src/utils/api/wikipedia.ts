
import { TrendingItem } from './types';
import { extractKeywords, filterTrendsByQuery } from './utils';
import mockTrendData from '@/data/mockTrendData';

export async function fetchWikipediaTrends(query: string, timeframe: string): Promise<TrendingItem[]> {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const response = await fetch(
      `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
    );
    
    if (!response.ok) {
      throw new Error('Wikipedia API request failed');
    }
    
    const data = await response.json();
    
    if (!data.items || !data.items[0] || !data.items[0].articles) {
      throw new Error('Invalid Wikipedia API response');
    }
    
    const articles = data.items[0].articles.slice(0, 10);
    
    const results = articles.map((article: any, index: number) => {
      const views = article.views || Math.floor(Math.random() * 100000) + 10000;
      const likes = Math.floor(views * (Math.random() * 0.05 + 0.01));
      const comments = Math.floor(likes * (Math.random() * 0.3 + 0.1));
      
      const publishedDate = new Date();
      publishedDate.setDate(publishedDate.getDate() - Math.floor(Math.random() * 30));
      
      return {
        id: `wikipedia-${index}`,
        video_id: article.article,
        title: article.article.replace(/_/g, ' '),
        views,
        likes,
        comments,
        category: 'Knowledge',
        platform: 'Wikipedia',
        thumbnail_url: `https://picsum.photos/seed/wiki${index}/300/200`,
        published_at: publishedDate.toISOString(),
        description: `This Wikipedia article has been viewed ${views} times.`,
        keywords: extractKeywords(article.article.replace(/_/g, ' '))
      };
    });
    
    return filterTrendsByQuery(results, query);
  } catch (error) {
    console.error('Error fetching Wikipedia trends:', error);
    
    const mockWikiData = mockTrendData
      .filter(item => item.category === 'Wikipedia')
      .slice(0, 5)
      .map(item => ({
        ...item,
        platform: 'Wikipedia'
      }));
      
    return filterTrendsByQuery(mockWikiData, query);
  }
}
