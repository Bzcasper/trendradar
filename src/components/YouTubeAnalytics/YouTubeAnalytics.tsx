
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { fetchMultiPlatformTrends } from "@/utils/apiService";
import mockTrendData from "@/data/mockTrendData";
import { calculateTrendingScore } from "@/utils/trendingAlgorithm";
import { ShieldAlert } from "lucide-react";
import { SearchBox } from "../SearchBox";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import { TrendAnalysisResults } from "./TrendAnalysisResults";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { KeywordAnalysisChart } from "./KeywordAnalysisChart";

export const YouTubeAnalytics = () => {
  const [searchResults, setSearchResults] = useState(mockTrendData);
  const [isLoading, setIsLoading] = useState(false);
  const [platform, setPlatform] = useState("all");
  const [timeframe, setTimeframe] = useState("week");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSearch = async (query: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in first to use the trending analysis tool",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, we would call our multi-platform API service
      // For now, we'll simulate this with mock data and our algorithm
      let results;
      
      if (query.trim() === "") {
        results = mockTrendData;
      } else {
        // Try to fetch from public APIs if possible, otherwise filter mock data
        try {
          results = await fetchMultiPlatformTrends(query, platform, timeframe);
        } catch (apiError) {
          console.log("API fetch failed, using filtered mock data", apiError);
          
          // Filter mock data as fallback
          results = mockTrendData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
          );
        }
      }
      
      // Apply our trending algorithm to each result
      const processedResults = results.map(item => {
        // Calculate scores based on our algorithm
        const trendingMetrics = calculateTrendingScore(
          item.views,
          item.likes,
          item.comments,
          new Date(item.published_at),
          item.engagement_rate || 0
        );
        
        return {
          ...item,
          view_velocity: trendingMetrics.viewVelocity,
          engagement_rate: trendingMetrics.engagementRate,
          trending_score: trendingMetrics.trendingScore,
          viral_probability: trendingMetrics.viralProbability,
          trend_acceleration: trendingMetrics.trendAcceleration,
          rsi: trendingMetrics.rsi,
          relative_volume: trendingMetrics.relativeVolume
        };
      });
      
      // Sort by trending score descending
      processedResults.sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0));
      
      setSearchResults(processedResults);
      
      toast({
        title: "Analysis Complete",
        description: `Found and analyzed ${processedResults.length} results for "${query}"`,
      });
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: "Search failed",
        description: "An error occurred while analyzing trends",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle platform selection
  const handlePlatformChange = (newPlatform: string) => {
    setPlatform(newPlatform);
    // Re-run search with new platform if there was a previous search
    if (searchResults.length > 0 && searchResults !== mockTrendData) {
      handleSearch("");
    }
  };

  // Prepare data for charts (used by child components)
  const prepareChartData = () => {
    // Prepare data for pie chart
    const categoryData = searchResults.reduce((acc, video) => {
      const existingCategory = acc.find(item => item.name === video.category);
      if (existingCategory) {
        existingCategory.value += 1;
      } else {
        acc.push({ name: video.category || 'Uncategorized', value: 1 });
      }
      return acc;
    }, []);

    // Prepare data for charts
    const viewsData = searchResults.map(video => ({
      name: video.title?.substring(0, 15) + "..." || 'Untitled',
      views: video.views || 0,
      velocity: video.view_velocity || 0,
    })).slice(0, 8);

    const engagementData = searchResults.map(video => ({
      name: video.title?.substring(0, 15) + "..." || 'Untitled',
      likes: video.likes || 0,
      comments: video.comments || 0,
      engagement: video.engagement_rate || 0,
      trending: video.trending_score || 0,
      viral: (video.viral_probability || 0) * 100,
    })).slice(0, 8);

    // Prepare keyword data
    const keywordData = searchResults.reduce((acc, video) => {
      if (video.keywords) {
        video.keywords.forEach(({ keyword, count }) => {
          const existing = acc.find(k => k.keyword === keyword);
          if (existing) {
            existing.count += count;
          } else {
            acc.push({ keyword, count });
          }
        });
      }
      return acc;
    }, []).sort((a, b) => b.count - a.count).slice(0, 12);

    return {
      categoryData,
      viewsData,
      engagementData,
      keywordData
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="space-y-8">
      {!user && (
        <div className="bg-brand-primary/10 border-l-4 border-brand-primary p-4 mb-8 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <ShieldAlert className="h-5 w-5 text-brand-primary" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-primary">
                Please sign in to access the full features of TrendRadar.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid gap-4 md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1">
          <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Tabs 
            defaultValue="all" 
            value={platform} 
            onValueChange={handlePlatformChange}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="youtube">YouTube</TabsTrigger>
              <TabsTrigger value="reddit">Reddit</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleSearch("")}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Trend Analysis Results Table */}
        <TrendAnalysisResults searchResults={searchResults} />

        {/* Charts Section */}
        <AnalyticsCharts 
          categoryData={chartData.categoryData}
          viewsData={chartData.viewsData}
          engagementData={chartData.engagementData}
        />

        {/* Keyword Analysis Chart */}
        <KeywordAnalysisChart keywordData={chartData.keywordData} />
      </div>
    </div>
  );
};
