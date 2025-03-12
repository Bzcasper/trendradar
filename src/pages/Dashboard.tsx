
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
          size: type === "trafficTrends" ? "full" : "medium"
        }
      ]);
      setDialogOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background relative">
      {activeTab === "customizable" && (
        <WidgetSidebar onAddWidget={handleAddWidget} />
      )}
      
      <div className={`container mx-auto py-8 space-y-8 transition-all ${activeTab === "customizable" ? "ml-12" : "ml-0"}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="customizable">Customizable</TabsTrigger>
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="platforms">Platform Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === "customizable" ? (
          <>
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
          </>
        ) : activeTab === "platforms" ? (
          <PlatformAnalytics
            currentPlatform={currentPlatform}
            onPlatformChange={setCurrentPlatform}
          />
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <AnalyticsDashboard />
            <YouTubeAnalytics />
          </div>
        )}
      </div>
    </div>
  );
}
