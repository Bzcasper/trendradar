
import { TrendingItem } from "./api/types";
import { TrendAnalyzer } from "./TrendAnalyzer";
import { fetchMultiPlatformTrends } from "./multiPlatformApiService";

interface ContentAnalysisResult {
  analyzedContent: TrendingItem;
  similarTrends: TrendingItem[];
  comparisonWithTopTrend: {
    winner: TrendingItem;
    loser: TrendingItem;
    comparisonFactors: {
      viewVelocity: { a: number; b: number; winner: 'a' | 'b' | 'tie' };
      engagementRate: { a: number; b: number; winner: 'a' | 'b' | 'tie' };
      trendAcceleration: { a: number; b: number; winner: 'a' | 'b' | 'tie' };
      relativeVolume: { a: number; b: number; winner: 'a' | 'b' | 'tie' };
      overallScore: { a: number; b: number; winner: 'a' | 'b' | 'tie' };
    };
  };
  recommendedKeywords: string[];
  potentialViewsEstimate: number;
  trendingSummary: string;
}

/**
 * Analyzes a piece of content and compares it with current trending content
 * to provide insights and recommendations
 */
export async function analyzeUserContent(
  content: TrendingItem,
  keywordsToMatch: string[] = []
): Promise<ContentAnalysisResult> {
  // Step 1: Analyze the user's content
  const analyzedContent = TrendAnalyzer.analyzeItem(content);
  
  // Step 2: Fetch similar trending content
  const query = keywordsToMatch.length > 0 
    ? keywordsToMatch.join(" ")
    : content.title.split(" ").slice(0, 3).join(" ");
    
  const trendingContent = await fetchMultiPlatformTrends(query);
  
  // Step 3: Find similar trends
  const similarTrends = trendingContent
    .filter(item => item.id !== content.id)
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 5);
  
  // Step 4: Compare with top trend
  const topTrend = similarTrends[0];
  const comparisonWithTopTrend = topTrend 
    ? TrendAnalyzer.compareItems(analyzedContent, topTrend)
    : {
        winner: analyzedContent,
        loser: analyzedContent,
        comparisonFactors: {
          viewVelocity: { a: 0, b: 0, winner: 'tie' },
          engagementRate: { a: 0, b: 0, winner: 'tie' },
          trendAcceleration: { a: 0, b: 0, winner: 'tie' },
          relativeVolume: { a: 0, b: 0, winner: 'tie' },
          overallScore: { a: 0, b: 0, winner: 'tie' }
        }
      };
  
  // Step 5: Extract recommended keywords from trending content
  const allKeywords = similarTrends
    .flatMap(item => item.keywords || [])
    .reduce((acc, { keyword, count }) => {
      const existing = acc.find(k => k.keyword === keyword);
      if (existing) {
        existing.count += count;
      } else {
        acc.push({ keyword, count });
      }
      return acc;
    }, [] as { keyword: string, count: number }[])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(k => k.keyword);
    
  // Step 6: Estimate potential views based on similar content
  const avgViewsOfTopTrends = similarTrends.length > 0
    ? similarTrends.reduce((sum, item) => sum + item.views, 0) / similarTrends.length
    : 0;
    
  const potentialViewsEstimate = Math.round(
    avgViewsOfTopTrends * (analyzedContent.viral_probability || 0.5)
  );
  
  // Step 7: Generate trend summary
  const trendingSummary = generateTrendingSummary(analyzedContent, similarTrends);
  
  return {
    analyzedContent,
    similarTrends,
    comparisonWithTopTrend,
    recommendedKeywords: allKeywords,
    potentialViewsEstimate,
    trendingSummary
  };
}

/**
 * Generates a human-readable summary of the trending analysis
 */
function generateTrendingSummary(
  content: TrendingItem,
  similarTrends: TrendingItem[]
): string {
  const trendingScore = content.trending_score || 0;
  const viralProbability = (content.viral_probability || 0) * 100;
  
  let summary = "";
  
  if (trendingScore > 75) {
    summary = `This content has excellent potential with a trending score of ${trendingScore.toFixed(1)} and a ${viralProbability.toFixed(1)}% chance of going viral. `;
  } else if (trendingScore > 50) {
    summary = `This content has good potential with a trending score of ${trendingScore.toFixed(1)} and a ${viralProbability.toFixed(1)}% chance of going viral. `;
  } else if (trendingScore > 25) {
    summary = `This content has moderate potential with a trending score of ${trendingScore.toFixed(1)} and a ${viralProbability.toFixed(1)}% chance of going viral. `;
  } else {
    summary = `This content has limited potential with a trending score of ${trendingScore.toFixed(1)} and a ${viralProbability.toFixed(1)}% chance of going viral. `;
  }
  
  if (similarTrends.length > 0) {
    const topPlatforms = [...new Set(similarTrends.map(item => item.platform))].slice(0, 3).join(", ");
    summary += `Similar content is currently trending on ${topPlatforms}. `;
  }
  
  // Add recommendations based on metrics
  if (content.engagement_rate && content.engagement_rate < 5) {
    summary += "Consider increasing engagement by adding calls to action and more interactive elements. ";
  }
  
  if (content.view_velocity && content.trend_acceleration && content.trend_acceleration < 0) {
    summary += "The view velocity is slowing down. Consider promoting this content more actively. ";
  }
  
  return summary;
}
