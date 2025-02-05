import { TrendingTopics } from "@/components/TrendingTopics";
import { EngagementMetrics } from "@/components/EngagementMetrics";
import { VideoList } from "@/components/VideoList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube Trends Dashboard</h1>
          <p className="text-gray-600">Track and analyze trending topics and engagement metrics</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TrendingTopics />
          <EngagementMetrics />
        </div>
        
        <VideoList />
      </div>
    </div>
  );
};

export default Index;