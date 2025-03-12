
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="glass-morphism">
      <TabsList className="p-1">
        <TabsTrigger 
          value="customizable" 
          className="data-[state=active]:bg-brand-primary data-[state=active]:text-white rounded-sm"
        >
          Customizable
        </TabsTrigger>
        <TabsTrigger 
          value="standard" 
          className="data-[state=active]:bg-brand-primary data-[state=active]:text-white rounded-sm"
        >
          Standard
        </TabsTrigger>
        <TabsTrigger 
          value="platforms" 
          className="data-[state=active]:bg-brand-primary data-[state=active]:text-white rounded-sm"
        >
          Platform Analytics
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
