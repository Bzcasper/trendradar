
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DashboardCard } from "../DashboardCard";

interface SearchResult {
  id: string;
  video_id: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
  thumbnail_url: string;
  published_at: string;
  category: string;
  engagement_rate?: number;
  view_velocity?: number;
  trending_score?: number;
  viral_probability?: number;
}

interface TrendAnalysisResultsProps {
  searchResults: SearchResult[];
}

export const TrendAnalysisResults = ({ searchResults }: TrendAnalysisResultsProps) => {
  return (
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
  );
};
