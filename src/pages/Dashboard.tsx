import { DashboardCard } from "@/components/DashboardCard";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import { EngagementMetrics } from "@/components/EngagementMetrics";
import { TrendingTopics } from "@/components/TrendingTopics";
import { VideoList } from "@/components/VideoList";
import { UserAnalyticsSection } from "@/components/Dashboard/UserAnalyticsSection";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      
      <UserAnalyticsSection />
    </div>
  );
}
