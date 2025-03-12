
import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, ThumbsUp, MessageSquare, TrendingUp, Clock, Award, Zap, BarChart2 } from "lucide-react";
import { format } from "date-fns";

interface TrendAnalysisResultsProps {
  searchResults: any[];
}

export const TrendAnalysisResults = ({ searchResults }: TrendAnalysisResultsProps) => {
  const [view, setView] = useState("table");
  
  if (!searchResults || searchResults.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center justify-center text-center p-8">
            <BarChart2 className="h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No Trends Found</h3>
            <p className="text-gray-500 mt-2">
              Try a different search query or platform to discover trending content.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format engagement rate for display
  const formatEngagement = (value: number) => {
    if (!value && value !== 0) return '-';
    return value.toFixed(1) + '%';
  };

  // Format large numbers with abbreviations (K, M, B)
  const formatNumber = (num: number) => {
    if (!num && num !== 0) return '-';
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Calculate trending indicator based on trending score
  const getTrendingIndicator = (score: number) => {
    if (score > 75) return { icon: TrendingUp, color: "text-green-500", text: "Hot" };
    if (score > 50) return { icon: TrendingUp, color: "text-orange-500", text: "Rising" };
    return { icon: Clock, color: "text-blue-500", text: "Steady" };
  };

  // Calculate viral potential indicator
  const getViralPotential = (probability: number) => {
    if (probability > 0.7) return { icon: Zap, color: "text-purple-500", text: "High" };
    if (probability > 0.4) return { icon: Award, color: "text-yellow-500", text: "Medium" };
    return { icon: Award, color: "text-gray-500", text: "Low" };
  };

  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="p-4 bg-white border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Trend Analysis Results</h3>
          <p className="text-sm text-gray-500">
            Found {searchResults.length} results ranked by trending score
          </p>
        </div>
        
        <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="table" className="m-0">
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
      </TabsContent>
      
      <TabsContent value="cards" className="m-0 p-4">
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
      </TabsContent>
    </Card>
  );
};
