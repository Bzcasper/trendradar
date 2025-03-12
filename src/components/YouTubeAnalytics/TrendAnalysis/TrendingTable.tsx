
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, MessageSquare, TrendingUp, Clock, Award, Zap } from "lucide-react";
import { format } from "date-fns";
import { TrendingItem } from "@/utils/api/types";
import { 
  formatEngagement, 
  formatNumber, 
  getTrendingIndicator, 
  getViralPotential 
} from "./trendAnalysisUtils";

interface TrendingTableProps {
  searchResults: TrendingItem[];
}

export const TrendingTable = ({ searchResults }: TrendingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Title</TableHead>
            <TableHead className="text-right">Platform</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Engagement</TableHead>
            <TableHead className="text-right">Trending Score</TableHead>
            <TableHead className="text-right">Viral Potential</TableHead>
            <TableHead className="text-right">Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchResults.map((result, index) => {
            const trendingIndicator = getTrendingIndicator(result.trending_score || 0);
            const TrendingIcon = trendingIndicator.icon;
            const viralIndicator = getViralPotential(result.viral_probability || 0);
            const ViralIcon = viralIndicator.icon;
            
            return (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 hidden sm:block">
                      <img 
                        src={result.thumbnail_url} 
                        alt={result.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                    </div>
                    <div>
                      <span className="line-clamp-2">{result.title}</span>
                      <span className="text-xs text-gray-500 block mt-1">
                        {result.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline" className="bg-gray-50">
                    {result.platform || result.category || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span>{formatNumber(result.views)}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Eye size={12} /> 
                      {formatNumber(result.view_velocity || 0)}/hr
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span>{formatEngagement(result.engagement_rate)}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <ThumbsUp size={12} /> {formatNumber(result.likes || 0)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <TrendingIcon className={`h-4 w-4 ${trendingIndicator.color}`} />
                    <span className="font-semibold">
                      {result.trending_score ? result.trending_score.toFixed(1) : '-'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <ViralIcon className={`h-4 w-4 ${viralIndicator.color}`} />
                    <span>
                      {result.viral_probability 
                        ? (result.viral_probability * 100).toFixed(1) + '%' 
                        : '-'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-gray-500">
                  {result.published_at 
                    ? format(new Date(result.published_at), 'MMM dd, yyyy')
                    : '-'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
