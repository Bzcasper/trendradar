
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTimeframeSelectorProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

export function DashboardTimeframeSelector({ 
  timeframe, 
  setTimeframe 
}: DashboardTimeframeSelectorProps) {
  return (
    <Tabs value={timeframe} onValueChange={setTimeframe} className="mt-4 md:mt-0">
      <TabsList className="bg-blue-100">
        <TabsTrigger value="30days" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
          Last 30 Days
        </TabsTrigger>
        <TabsTrigger value="quarter" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
          Quarter
        </TabsTrigger>
        <TabsTrigger value="custom" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
          Custom
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
