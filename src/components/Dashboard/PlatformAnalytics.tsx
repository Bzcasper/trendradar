
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformInsights } from "@/components/YouTubeAnalytics/PlatformInsights";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import mockTrendData from "@/data/mockTrendData";

interface PlatformAnalyticsProps {
  currentPlatform: string;
  onPlatformChange: (platform: string) => void;
}

export function PlatformAnalytics({ currentPlatform, onPlatformChange }: PlatformAnalyticsProps) {
  return (
    <div className="space-y-8">
      <Tabs 
        value={currentPlatform} 
        onValueChange={onPlatformChange}
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-6 bg-muted/50">
          <TabsTrigger value="all">All Platforms</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
          <TabsTrigger value="twitter">Twitter</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          <TabsTrigger value="reddit">Reddit</TabsTrigger>
          <TabsTrigger value="newsapi">News</TabsTrigger>
          <TabsTrigger value="wikipedia">Wikipedia</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <PlatformInsights 
        data={mockTrendData.map(item => ({
          ...item,
          platform: item.category || "YouTube"
        }))} 
        platform={currentPlatform} 
      />
      
      <YouTubeAnalytics />
    </div>
  );
}
