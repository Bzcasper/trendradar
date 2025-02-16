
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube Analytics Dashboard</h1>
          <p className="text-gray-600">Search and analyze YouTube trends</p>
        </div>
        <YouTubeAnalytics />
      </div>
    </div>
  );
};

export default Index;
