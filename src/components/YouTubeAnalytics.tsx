
import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

interface VideoResult {
  id: string;
  video_id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  category: string;
  engagement_score: number;
  thumbnail_url: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
      acc.push({ name: video.category, value: 1 });
    }
    return acc;
  }, []);

  const engagementData = searchResults.map(video => ({
    name: video.title.substring(0, 30) + "...",
    engagement: video.engagement_score,
    views: video.views,
    likes: video.likes,
    comments: video.comments,
  }));

  return (
    <div className="space-y-8">
      <SearchBox onSearch={handleSearch} isLoading={isLoading} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DashboardCard title="Search Results">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Category</TableHead>
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
                      <span>{video.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{video.views.toLocaleString()}</TableCell>
                  <TableCell>{video.engagement_score.toFixed(2)}%</TableCell>
                  <TableCell>{video.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DashboardCard>

        <DashboardCard title="Category Distribution">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
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
      </div>
    </div>
  );
};
