
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import { AnalyticsDashboard } from "@/components/Dashboard/AnalyticsDashboard";
import { DashboardGrid } from "@/components/Dashboard/DashboardGrid";
import { PlatformAnalytics } from "@/components/Dashboard/PlatformAnalytics";
import { AddWidgetDialog } from "@/components/Dashboard/AddWidgetDialog";
import { WidgetSidebar } from "@/components/Dashboard/WidgetSidebar";
import { WidgetData, WidgetType, availableWidgets } from "@/components/Dashboard/types";
import { nanoid } from "nanoid";

export default function Dashboard() {
  const [dashboardWidgets, setDashboardWidgets] = useState<WidgetData[]>([
    { id: "traffic-trends", type: "trafficTrends", title: "Traffic Trends", size: "full" },
    { id: "platform-performance", type: "platformPerformance", title: "Platform Performance" },
    { id: "conversion-funnel", type: "conversionFunnel", title: "Conversion Funnel" },
    { id: "traffic-sources", type: "trafficSources", title: "Traffic Sources" },
    { id: "trend-heatmap", type: "trendHeatmap", title: "Trend Heatmap", size: "full" },
    { id: "trend-radar", type: "trendRadar", title: "Trend Analysis Radar", size: "full" },
  ]);
  
  const [activeTab, setActiveTab] = useState<string>("customizable");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState<string>("all");
  
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const widgetType = e.dataTransfer?.getData("widget-type") as WidgetType;
      if (widgetType) {
        handleAddWidget(widgetType);
      }
    };

    if (activeTab === "customizable") {
      document.addEventListener("dragover", handleDragOver);
      document.addEventListener("drop", handleDrop);
    }

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, [activeTab]);
  
  const handleAddWidget = (type: WidgetType) => {
    const widget = availableWidgets.find(w => w.type === type);
    if (widget) {
      setDashboardWidgets([
        ...dashboardWidgets,
        {
          id: `${type}-${nanoid(6)}`,
          type: type,
          title: widget.title,
          size: type === "trafficTrends" || type === "trendHeatmap" || type === "trendPerformance" ? "full" : "medium"
        }
      ]);
      setDialogOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen dashboard-bg relative overflow-x-hidden">
      {activeTab === "customizable" && (
        <WidgetSidebar onAddWidget={handleAddWidget} />
      )}
      
      <div className={`container mx-auto py-8 px-4 sm:px-6 transition-all ${activeTab === "customizable" ? "ml-12" : "ml-0"}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-brand-primary">Dashboard</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="glass-morphism rounded-md">
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
        </div>

        {activeTab === "customizable" ? (
          <div className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100">
            <DashboardGrid
              widgets={dashboardWidgets}
              onWidgetsChange={setDashboardWidgets}
              onRemoveWidget={(id) => setDashboardWidgets(dashboardWidgets.filter(w => w.id !== id))}
              onOpenAddDialog={() => setDialogOpen(true)}
            />
            <AddWidgetDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onAddWidget={handleAddWidget}
            />
          </div>
        ) : activeTab === "platforms" ? (
          <div className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100">
            <PlatformAnalytics
              currentPlatform={currentPlatform}
              onPlatformChange={setCurrentPlatform}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <div className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100">
              <AnalyticsDashboard />
            </div>
            <div className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100">
              <YouTubeAnalytics />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
