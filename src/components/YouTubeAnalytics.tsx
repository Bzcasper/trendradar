import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { format } from "date-fns";

interface VideoResult {
  id: string;
  video_id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  category: string;
  thumbnail_url: string;
  published_at: string;
  description: string;
  engagement_rate?: number;
  view_velocity?: number;
  trending_score?: number;
  viral_probability?: number;
  keywords?: { keyword: string; count: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface KeywordData {
  keyword: string;
  count: number;
}

export const YouTubeAnalytics = () => {
  const [searchResults, setSearchResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-search', {
        body: { query }
      });

      if (error) throw error;
      setSearchResults(data);
      
      toast({
        title: "Search completed",
        description: `Found ${data.length} results for "${query}"`,
      });
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: "Search failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare data for pie chart
  const categoryData = searchResults.reduce((acc: any[], video) => {
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
    name: video.title?.substring(0, 20) + "..." || 'Untitled',
    views: video.views || 0,
    velocity: video.view_velocity || 0,
  }));

  const engagementData = searchResults.map(video => ({
    name: video.title?.substring(0, 20) + "..." || 'Untitled',
    likes: video.likes || 0,
    comments: video.comments || 0,
    engagement: video.engagement_rate || 0,
    trending: video.trending_score || 0,
    viral: (video.viral_probability || 0) * 100,
  }));

  // Prepare keyword data
  const keywordData = searchResults.reduce((acc: KeywordData[], video) => {
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
  }, []).sort((a, b) => b.count - a.count).slice(0, 15);

  return (
    <div className="space-y-8">
      <SearchBox onSearch={handleSearch} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 gap-8">
        {/* Comprehensive Video Details Table */}
        <DashboardCard title="Video Analysis Results">
          <div className="overflow-auto max-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Title & Preview</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>View Velocity</TableHead>
                  <TableHead>Engagement Rate</TableHead>
                  <TableHead>Trending Score</TableHead>
                  <TableHead>Viral Probability</TableHead>
                  <TableHead>Video Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <img 
                          src={video.thumbnail_url} 
                          alt={video.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <span className="text-sm">{video.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {video.published_at ? 
                        format(new Date(video.published_at), 'MMM dd, yyyy') 
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{video.views?.toLocaleString() || '0'}</TableCell>
                    <TableCell>{video.likes?.toLocaleString() || '0'}</TableCell>
                    <TableCell>{video.comments?.toLocaleString() || '0'}</TableCell>
                    <TableCell>{video.category || 'Uncategorized'}</TableCell>
                    <TableCell>
                      {(video.view_velocity || 0).toFixed(1)} views/hr
                    </TableCell>
                    <TableCell>
                      {(video.engagement_rate || 0).toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      {(video.trending_score || 0).toFixed(1)}
                    </TableCell>
                    <TableCell>
                      {((video.viral_probability || 0) * 100).toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://youtube.com/watch?v=${video.video_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 underline"
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
                  <Tooltip />
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
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Total Views" />
                  <Bar yAxisId="right" dataKey="velocity" fill="#82ca9d" name="View Velocity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Engagement Metrics */}
          <DashboardCard title="Engagement Analysis">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" name="Likes" />
                  <Line type="monotone" dataKey="comments" stroke="#82ca9d" name="Comments" />
                  <Line type="monotone" dataKey="engagement" stroke="#ffc658" name="Engagement Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Trending and Viral Probability */}
          <DashboardCard title="Trend & Viral Analysis">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="trending" stroke="#8884d8" name="Trending Score" />
                  <Line type="monotone" dataKey="viral" stroke="#82ca9d" name="Viral Probability %" />
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="keyword"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#8884d8"
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
