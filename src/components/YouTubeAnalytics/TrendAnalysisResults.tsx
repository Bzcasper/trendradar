
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TrendingUp, TrendingDown, ExternalLink, Eye, ThumbsUp, MessageSquare, BarChart } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { Tooltip } from "../ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

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
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="min-w-[200px]">Title & Preview</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>Views</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <BarChart className="h-4 w-4" />
                  <span>Engagement</span>
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-brand-secondary" />
                  <span>View Velocity</span>
                </div>
              </TableHead>
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
              <TableRow key={video.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-16 h-16 rounded-md object-cover border border-gray-200"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-medium line-clamp-2">{video.title}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {video.description?.substring(0, 60)}...
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {video.published_at ? 
                    format(new Date(video.published_at), 'MMM dd, yyyy') 
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{video.views?.toLocaleString() || '0'}</span>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {video.likes?.toLocaleString() || '0'}
                      <MessageSquare className="h-3 w-3 ml-2 mr-1" />
                      {video.comments?.toLocaleString() || '0'}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div 
                              className={`h-2.5 rounded-full ${
                                (video.engagement_rate || 0) > 8 
                                  ? 'bg-green-500' 
                                  : (video.engagement_rate || 0) > 5 
                                    ? 'bg-brand-accent' 
                                    : 'bg-orange-500'
                              }`}
                              style={{ width: `${Math.min(100, (video.engagement_rate || 0) * 10)}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs font-medium">{(video.engagement_rate || 0).toFixed(1)}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Engagement rate compared to channel average</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`
                    ${video.category === 'Gaming' ? 'bg-purple-50 text-purple-800 border-purple-200' : ''}
                    ${video.category === 'Music' ? 'bg-pink-50 text-pink-800 border-pink-200' : ''}
                    ${video.category === 'Entertainment' ? 'bg-blue-50 text-blue-800 border-blue-200' : ''}
                    ${video.category === 'Education' ? 'bg-green-50 text-green-800 border-green-200' : ''}
                    ${video.category === 'HowTo' ? 'bg-amber-50 text-amber-800 border-amber-200' : ''}
                    ${!['Gaming', 'Music', 'Entertainment', 'Education', 'HowTo'].includes(video.category || '') ? 'bg-gray-50 text-gray-800 border-gray-200' : ''}
                  `}>
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
                    <span className="font-medium">{(video.view_velocity || 0).toFixed(0)}</span>
                    <span className="text-xs text-gray-500 ml-1">v/hr</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <div 
                      className={`h-3 w-3 rounded-full ${
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                          <span className="ml-2 text-xs font-medium">
                            {((video.viral_probability || 0) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Probability of reaching viral status (>100k views in 48h)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://youtube.com/watch?v=${video.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-secondary hover:text-brand-secondary/80 flex items-center gap-1 text-sm"
                  >
                    <ExternalLink size={14} />
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
