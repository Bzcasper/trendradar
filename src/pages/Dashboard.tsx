
import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import { AnalyticsDashboard } from "@/components/Dashboard/AnalyticsDashboard";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DraggableWidget } from "@/components/Dashboard/DraggableWidget";
import { DashboardWidgetContent, WidgetData, WidgetType, availableWidgets } from "@/components/Dashboard/DashboardWidgetFactory";
import { WidgetSidebar } from "@/components/Dashboard/WidgetSidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { nanoid } from "nanoid";
import { PlatformInsights } from "@/components/YouTubeAnalytics/PlatformInsights";
import mockTrendData from "@/data/mockTrendData";

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
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Effect to handle drag events from the sidebar
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

    // Only add listeners when the customizable tab is active
    if (activeTab === "customizable") {
      document.addEventListener("dragover", handleDragOver);
      document.addEventListener("drop", handleDrop);
    }

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, [activeTab]);
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Handle sorting of existing widgets
    if (active.id !== over?.id && over?.id) {
      setDashboardWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  
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
  
  const handleRemoveWidget = (id: string) => {
    setDashboardWidgets(dashboardWidgets.filter(widget => widget.id !== id));
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
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-8">
              <div className="flex justify-end">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Add Widget
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Widget</DialogTitle>
                      <DialogDescription>
                        Select a widget to add to your dashboard
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {availableWidgets.map((widget) => (
                        <Button
                          key={widget.type}
                          variant="outline"
                          className="h-auto py-4 flex flex-col items-center justify-center"
                          onClick={() => handleAddWidget(widget.type)}
                        >
                          <span className="text-sm font-medium">{widget.title}</span>
                        </Button>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <SortableContext items={dashboardWidgets.map(widget => widget.id)} strategy={verticalListSortingStrategy}>
                <div className="grid grid-cols-1 gap-6">
                  {/* Full-width widgets first */}
                  {dashboardWidgets
                    .filter(widget => widget.size === "full")
                    .map((widget) => (
                      <DraggableWidget 
                        key={widget.id} 
                        id={widget.id} 
                        title={widget.title}
                        onRemove={() => handleRemoveWidget(widget.id)}
                      >
                        <DashboardWidgetContent type={widget.type} />
                      </DraggableWidget>
                    ))}
                    
                  {/* Grid for medium and small widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dashboardWidgets
                      .filter(widget => widget.size !== "full")
                      .map((widget) => (
                        <DraggableWidget 
                          key={widget.id} 
                          id={widget.id} 
                          title={widget.title}
                          onRemove={() => handleRemoveWidget(widget.id)}
                        >
                          <DashboardWidgetContent type={widget.type} />
                        </DraggableWidget>
                      ))}
                  </div>
                </div>
              </SortableContext>
            </div>
          </DndContext>
        ) : activeTab === "platforms" ? (
          <div className="space-y-8">
            <Tabs 
              value={currentPlatform} 
              onValueChange={setCurrentPlatform}
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
