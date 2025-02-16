
import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface VideoResult {
  id: string;
  title: string;
  views: number;
  engagement_score: number;
  category: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const YouTubeAnalytics = () => {
  const [searchResults, setSearchResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call your YouTube API edge function
      // and store results in Supabase. For now, we'll simulate some results:
      const mockResults = [
        { id: '1', title: 'Video 1', views: 1000000, engagement_score: 0.8, category: 'Gaming' },
        { id: '2', title: 'Video 2', views: 500000, engagement_score: 0.6, category: 'Music' },
        { id: '3', title: 'Video 3', views: 750000, engagement_score: 0.7, category: 'Education' },
      ];
      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search failed:', error);
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

  return (
    <div className="space-y-8">
      <SearchBox onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DashboardCard title="Search Results">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Engagement Score</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchResults.map((video) => (
                <TableRow key={video.id}>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.views.toLocaleString()}</TableCell>
                  <TableCell>{(video.engagement_score * 100).toFixed(1)}%</TableCell>
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
