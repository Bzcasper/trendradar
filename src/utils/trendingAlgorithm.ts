
/**
 * TrendRadar Algorithm Implementation
 * Based on the algorithm from the custom instructions
 */

interface TrendingMetrics {
  viewVelocity: number;
  engagementRate: number;
  audienceRetention: number;
  trendingScore: number;
  viralProbability: number;
  trendAcceleration: number;
  rsi: number;
  relativeVolume: number;
  fiboRetracement?: number;
}

/**
 * Calculates the trending score and various metrics based on our algorithm
 */
export function calculateTrendingScore(
  views: number,
  likes: number,
  comments: number,
  publishedDate: Date,
  currentEngagementRate = 0
): TrendingMetrics {
  // Step 1: Compute View Velocity (Virality Metric)
  const hoursSincePublished = Math.max(1, (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60));
  const viewVelocity = views / hoursSincePublished;
  
  // Previous velocity (simulate for calculation)
  const previousVelocity = viewVelocity * (Math.random() * 0.5 + 0.5); // Simulate previous velocity
  
  // Step 2: Compute Engagement Rate (Interaction Intensity)
  const engagementRate = ((likes + comments) / Math.max(1, views)) * 100;
  
  // Step 3: Compute Audience Retention (simplified approximation since we don't have watch time)
  // Higher engagement generally correlates with better retention
  const audienceRetention = 0.2 + (engagementRate / 100) * 0.6; // Scale to 20-80% range
  
  // Step 5: Compute Trend Acceleration
  const trendAcceleration = viewVelocity - previousVelocity;
  
  // Step 7: Calculate Relative Strength Index (RSI)
  const rsi = calculateRSI(viewVelocity, previousVelocity);
  
  // Calculate Relative Volume
  const avgVolume = views / 2; // Simplified average volume approximation
  const relativeVolume = views / Math.max(1, avgVolume);
  
  // Step 4: Compute Trending Score (Overall Popularity Rank)
  // Weights for each component
  const w1 = 0.5; // View Velocity
  const w2 = 0.3; // Engagement Rate
  const w3 = 0.2; // Audience Retention
  
  // Enhanced Trending Score with all our metrics
  // w1-w6 are the weights
  const w4 = 0.1; // Trend Acceleration
  const w5 = 0.1; // Smoothed View Velocity (approximated as view velocity here)
  const w6 = 0.3; // Virality probability
  const w7 = 0.1; // RSI
  const w8 = 0.1; // Relative Volume
  
  // Calculate initial trending score
  let trendingScore = 
    (w1 * viewVelocity / 1000) + // Scale down for better numbers
    (w2 * engagementRate) + 
    (w3 * audienceRetention * 100) + // Scale to 0-100
    (w4 * Math.max(0, trendAcceleration / 1000)) + // Only count positive acceleration
    (w5 * viewVelocity / 1000) +
    (w7 * rsi / 10) + // Scale RSI
    (w8 * relativeVolume * 10); // Scale RV
  
  // Normalize trending score to 0-100 range
  trendingScore = Math.min(100, Math.max(0, trendingScore));
  
  // Calculate viral probability (sigmoid function ensures result between 0-1)
  const viralProbability = 1 / (1 + Math.exp(-(trendingScore - 50) / 15));
  
  return {
    viewVelocity,
    engagementRate,
    audienceRetention,
    trendingScore,
    viralProbability,
    trendAcceleration,
    rsi,
    relativeVolume
  };
}

/**
 * Calculate RSI (Relative Strength Index)
 */
function calculateRSI(currentVelocity: number, previousVelocity: number): number {
  // Simple RSI calculation
  const change = currentVelocity - previousVelocity;
  const gain = change > 0 ? change : 0;
  const loss = change < 0 ? -change : 0;
  
  // Prevent division by zero
  if (loss === 0) return 100;
  
  const rs = gain / Math.max(0.1, loss);
  const rsi = 100 - (100 / (1 + rs));
  
  return rsi;
}

/**
 * Calculate Fibonacci retracement levels
 */
export function calculateFibonacciRetracement(peakValue: number, currentValue: number): number {
  const decline = peakValue - currentValue;
  const percentDecline = decline / peakValue;
  
  // Key Fibonacci levels
  const levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  
  // Find closest Fibonacci level
  let closestLevel = 0;
  let minDistance = 1;
  
  for (const level of levels) {
    const distance = Math.abs(percentDecline - level);
    if (distance < minDistance) {
      minDistance = distance;
      closestLevel = level;
    }
  }
  
  return closestLevel;
}
