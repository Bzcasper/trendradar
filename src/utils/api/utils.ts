
import { TrendingItem } from './types';

export function filterTrendsByQuery(trends: TrendingItem[], query: string): TrendingItem[] {
  if (!query) return trends;
  
  return trends.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
    (item.keywords && item.keywords.some(k => k.keyword.toLowerCase().includes(query.toLowerCase())))
  );
}

export function extractKeywords(text: string): { keyword: string, count: number }[] {
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have']);
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  
  const keywordCount = new Map<string, number>();
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      keywordCount.set(word, (keywordCount.get(word) || 0) + 1);
    }
  });
  
  const hashtags = text.match(/#\w+/g) || [];
  hashtags.forEach(tag => {
    const keyword = tag.substring(1).toLowerCase();
    keywordCount.set(keyword, (keywordCount.get(keyword) || 0) + 3);
  });
  
  return Array.from(keywordCount.entries())
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}
