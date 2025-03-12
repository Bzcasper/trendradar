
import React from 'react';
import mockTrendData from "@/data/mockTrendData";

export const KeyMetricsWidget = () => {
  // Calculate summary metrics from our existing data
  const totalViews = mockTrendData.reduce((sum, item) => sum + item.views, 0);
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center p-4 bg-blue-50 rounded-lg">
        <div className="text-gray-600 text-sm font-medium">TOTAL VIEWS</div>
        <div className="text-2xl font-bold text-gray-900 mt-1">{totalViews.toLocaleString()}</div>
      </div>
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <div className="text-gray-600 text-sm font-medium">AVG ENGAGEMENT</div>
        <div className="text-2xl font-bold text-gray-900 mt-1">
          {mockTrendData.reduce((sum, item) => sum + (item.engagement_rate || 0), 0) / mockTrendData.length}%
        </div>
      </div>
    </div>
  );
};
