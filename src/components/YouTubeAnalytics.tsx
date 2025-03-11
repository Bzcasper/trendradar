
import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { useToast } from "./ui/use-toast";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import mockTrendData from "@/data/mockTrendData";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Search, RefreshCw, ShieldAlert } from "lucide-react";
import { calculateTrendingScore } from "@/utils/trendingAlgorithm";
import { fetchMultiPlatformTrends } from "@/utils/apiService";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Using static mock data to avoid needing private API keys
const COLORS = ['#1E3A8A', '#00D4FF', '#FF8F3F', '#10B981', '#8B5CF6'];

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
        {/* Comprehensive Video Details Table */}
        <DashboardCard title="Trend Analysis Results">
          <div className="overflow-auto max-h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Title & Preview</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>View Velocity</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Trend Score</span>
                      <TrendingUp className="h-4 w-4 text-brand-secondary" />
                    </div>
                  </TableHead>
                  <TableHead>Viral Probability</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((video) => (
                  <TableRow key={video.id} className="hover-scale">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img 
                          src={video.thumbnail_url} 
                          alt={video.title}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-medium">{video.title}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {video.description.substring(0, 60)}...
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {video.published_at ? 
                        format(new Date(video.published_at), 'MMM dd, yyyy') 
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{video.views?.toLocaleString() || '0'}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div 
                            className="bg-brand-accent h-2.5 rounded-full" 
                            style={{ width: `${Math.min(100, (video.engagement_rate || 0) * 10)}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">{(video.engagement_rate || 0).toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-background/60">
                        {video.category || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {(video.view_velocity || 0) > 4000 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-orange-500 mr-1" />
                        )}
                        {(video.view_velocity || 0).toFixed(0)} v/hr
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <div 
                          className={`h-2 w-2 rounded-full ${
                            (video.trending_score || 0) > 75 
                              ? 'bg-green-500' 
                              : (video.trending_score || 0) > 50 
                                ? 'bg-yellow-500' 
                                : 'bg-orange-500'
                          }`}
                        ></div>
                        <span className="font-medium">
                          {(video.trending_score || 0).toFixed(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div 
                            className={`h-2.5 rounded-full ${
                              (video.viral_probability || 0) > 0.7 
                                ? 'bg-green-500' 
                                : (video.viral_probability || 0) > 0.5 
                                  ? 'bg-yellow-500' 
                                  : 'bg-orange-500'
                            }`}
                            style={{ width: `${(video.viral_probability || 0) * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">
                          {((video.viral_probability || 0) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://youtube.com/watch?v=${video.video_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-secondary hover:text-brand-secondary/80 underline text-sm"
                      >
                        Watch
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Distribution Pie Chart */}
          <DashboardCard title="Category Distribution">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} videos`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Views and Velocity Comparison */}
          <DashboardCard title="Views & Velocity Analysis">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="views" fill="#1E3A8A" name="Total Views" />
                  <Bar yAxisId="right" dataKey="velocity" fill="#00D4FF" name="View Velocity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Engagement Metrics */}
          <DashboardCard title="Engagement Analysis">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#1E3A8A" name="Likes" />
                  <Line type="monotone" dataKey="comments" stroke="#00D4FF" name="Comments" />
                  <Line type="monotone" dataKey="engagement" stroke="#FF8F3F" name="Engagement Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Trending and Viral Probability */}
          <DashboardCard title="Trend & Viral Analysis">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
                  <Legend />
                  <Line type="monotone" dataKey="trending" stroke="#1E3A8A" name="Trending Score" />
                  <Line type="monotone" dataKey="viral" stroke="#FF8F3F" name="Viral Probability %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>
        </div>

        {/* Add the new Keyword Analysis chart at the bottom */}
        <DashboardCard title="Keyword Analysis">
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={keywordData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 120,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="keyword"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} occurrences`, 'Frequency']} />
                <Bar
                  dataKey="count"
                  name="Occurrences"
                  radius={[4, 4, 0, 0]}
                >
                  {keywordData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${(index * 360) / keywordData.length}, 70%, 60%)`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};
