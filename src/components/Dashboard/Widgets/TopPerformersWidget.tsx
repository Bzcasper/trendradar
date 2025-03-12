
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ThumbsUp, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import mockTrendData from "@/data/mockTrendData";

export const TopPerformersWidget = () => {
  // Top performing content (from mock data)
  const topPerformers = mockTrendData
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 5);
    
  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {topPerformers.map((video, index) => (
        <Card key={index} className="border border-gray-100 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <img 
                  src={video.thumbnail_url} 
                  alt={video.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium truncate">{video.title}</h3>
                  <Badge 
                    variant={video.trending_score > 75 ? "default" : "outline"}
                    className={`${video.trending_score > 75 ? 'bg-green-100 text-green-800' : ''} ml-2 flex-shrink-0`}
                  >
                    {video.trending_score?.toFixed(1)}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Eye size={12} className="mr-1"/> 
                    {video.views?.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp size={12} className="mr-1"/> 
                    {video.likes?.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={12} className="mr-1"/> 
                    {video.comments?.toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {video.published_at && format(new Date(video.published_at), 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
