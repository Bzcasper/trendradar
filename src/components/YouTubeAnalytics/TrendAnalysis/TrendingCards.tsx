
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, MessageSquare, Clock } from "lucide-react";
import { format } from "date-fns";
import { TrendingItem } from "@/utils/api/types";
import { 
  formatNumber, 
  getTrendingIndicator, 
  getViralPotential 
} from "./trendAnalysisUtils";

interface TrendingCardsProps {
  searchResults: TrendingItem[];
}

export const TrendingCards = ({ searchResults }: TrendingCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {searchResults.map((result, index) => {
        const trendingIndicator = getTrendingIndicator(result.trending_score || 0);
        const TrendingIcon = trendingIndicator.icon;
        const viralIndicator = getViralPotential(result.viral_probability || 0);
        const ViralIcon = viralIndicator.icon;
        
        return (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video relative overflow-hidden bg-gray-100">
              <img 
                src={result.thumbnail_url} 
                alt={result.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-gray-900/70 text-white border-0">
                  {result.platform || result.category || "Unknown"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-medium line-clamp-2 mb-2">{result.title}</h4>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm mb-3">
                <div className="flex items-center gap-1 text-gray-600">
                  <Eye size={14} />
                  <span>{formatNumber(result.views)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <ThumbsUp size={14} />
                  <span>{formatNumber(result.likes || 0)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MessageSquare size={14} />
                  <span>{formatNumber(result.comments || 0)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock size={14} />
                  <span>{result.published_at 
                    ? format(new Date(result.published_at), 'MMM dd')
                    : '-'}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-2 border-t">
                <div className="flex items-center gap-1">
                  <TrendingIcon className={`h-4 w-4 ${trendingIndicator.color}`} />
                  <span className={`text-sm font-medium ${trendingIndicator.color}`}>
                    {trendingIndicator.text}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ViralIcon className={`h-4 w-4 ${viralIndicator.color}`} />
                  <span className={`text-sm font-medium ${viralIndicator.color}`}>
                    {viralIndicator.text} Viral Potential
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
