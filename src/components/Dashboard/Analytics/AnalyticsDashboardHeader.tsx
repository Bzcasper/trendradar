
import { DashboardTimeframeSelector } from "./DashboardTimeframeSelector";

interface AnalyticsDashboardHeaderProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

export function AnalyticsDashboardHeader({ 
  timeframe, 
  setTimeframe 
}: AnalyticsDashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time insights to optimize your content strategy</p>
      </div>
      
      <DashboardTimeframeSelector 
        timeframe={timeframe} 
        setTimeframe={setTimeframe} 
      />
    </div>
  );
}
