
import { TrendingItem } from "./api/types";
import { calculateTrendingScore, calculateFibonacciRetracement } from "./trendingAlgorithm";

/**
 * TrendAnalyzer class for analyzing content across multiple platforms
 * using our custom algorithm
 */
export class TrendAnalyzer {
  /**
   * Analyze a single content item using our trending algorithm
   */
  public static analyzeItem(item: TrendingItem): TrendingItem {
    const trendingMetrics = calculateTrendingScore(
      item.views,
      item.likes,
      item.comments,
      new Date(item.published_at),
      item.engagement_rate || 0
    );
    
    let fiboRetracement;
    if (item.views > 100000) {
      const peakValue = item.views * 1.2;
      fiboRetracement = calculateFibonacciRetracement(peakValue, item.views);
    }
    
    return {
      ...item,
      engagement_rate: trendingMetrics.engagementRate,
      view_velocity: trendingMetrics.viewVelocity,
      trending_score: trendingMetrics.trendingScore,
      viral_probability: trendingMetrics.viralProbability,
      trend_acceleration: trendingMetrics.trendAcceleration,
      rsi: trendingMetrics.rsi,
      relative_volume: trendingMetrics.relativeVolume,
      fibo_retracement: fiboRetracement
    };
  }
  
  /**
   * Analyze multiple content items and sort by trending score
   */
  public static analyzeMultiple(items: TrendingItem[]): TrendingItem[] {
    const analyzedItems = items.map(item => this.analyzeItem(item));
    return this.sortByTrendingScore(analyzedItems);
  }
  
  /**
   * Compare two content items and determine which one is more likely to trend
   */
  public static compareItems(itemA: TrendingItem, itemB: TrendingItem): {
    winner: TrendingItem,
    loser: TrendingItem,
    comparisonFactors: {
      viewVelocity: { a: number, b: number, winner: 'a' | 'b' | 'tie' },
      engagementRate: { a: number, b: number, winner: 'a' | 'b' | 'tie' },
      trendAcceleration: { a: number, b: number, winner: 'a' | 'b' | 'tie' },
      relativeVolume: { a: number, b: number, winner: 'a' | 'b' | 'tie' },
      overallScore: { a: number, b: number, winner: 'a' | 'b' | 'tie' }
    }
  } {
    const analyzedA = this.analyzeItem(itemA);
    const analyzedB = this.analyzeItem(itemB);
    
    const viewVelocityWinner = analyzedA.view_velocity > analyzedB.view_velocity ? 'a' : 
                              analyzedA.view_velocity < analyzedB.view_velocity ? 'b' : 'tie';
                              
    const engagementRateWinner = analyzedA.engagement_rate > analyzedB.engagement_rate ? 'a' : 
                                analyzedA.engagement_rate < analyzedB.engagement_rate ? 'b' : 'tie';
                                
    const trendAccelerationWinner = analyzedA.trend_acceleration > analyzedB.trend_acceleration ? 'a' : 
                                   analyzedA.trend_acceleration < analyzedB.trend_acceleration ? 'b' : 'tie';
                                   
    const relativeVolumeWinner = analyzedA.relative_volume > analyzedB.relative_volume ? 'a' : 
                                analyzedA.relative_volume < analyzedB.relative_volume ? 'b' : 'tie';
                                
    const overallScoreWinner = analyzedA.trending_score > analyzedB.trending_score ? 'a' : 
                              analyzedA.trending_score < analyzedB.trending_score ? 'b' : 'tie';
    
    const winner = overallScoreWinner === 'a' ? analyzedA : analyzedB;
    const loser = overallScoreWinner === 'a' ? analyzedB : analyzedA;
    
    return {
      winner,
      loser,
      comparisonFactors: {
        viewVelocity: { 
          a: analyzedA.view_velocity || 0, 
          b: analyzedB.view_velocity || 0, 
          winner: viewVelocityWinner 
        },
        engagementRate: { 
          a: analyzedA.engagement_rate || 0, 
          b: analyzedB.engagement_rate || 0, 
          winner: engagementRateWinner 
        },
        trendAcceleration: { 
          a: analyzedA.trend_acceleration || 0, 
          b: analyzedB.trend_acceleration || 0, 
          winner: trendAccelerationWinner 
        },
        relativeVolume: { 
          a: analyzedA.relative_volume || 0, 
          b: analyzedB.relative_volume || 0, 
          winner: relativeVolumeWinner 
        },
        overallScore: { 
          a: analyzedA.trending_score || 0, 
          b: analyzedB.trending_score || 0, 
          winner: overallScoreWinner 
        }
      }
    };
  }
  
  /**
   * Sort items by trending score (descending)
   */
  private static sortByTrendingScore(items: TrendingItem[]): TrendingItem[] {
    return [...items].sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0));
  }
}
