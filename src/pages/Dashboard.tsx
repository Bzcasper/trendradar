
import { useState, useEffect, useRef, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import { AnalyticsDashboard } from "@/components/Dashboard/AnalyticsDashboard";
import { DashboardGrid } from "@/components/Dashboard/DashboardGrid";
import { PlatformAnalytics } from "@/components/Dashboard/PlatformAnalytics";
import { AddWidgetDialog } from "@/components/Dashboard/AddWidgetDialog";
import { WidgetSidebar } from "@/components/Dashboard/WidgetSidebar";
import { WidgetData, WidgetType, availableWidgets } from "@/components/Dashboard/types";
import { nanoid } from "nanoid";
import { Navbar } from "@/components/Layout/Navbar";

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
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimer = useRef<number | null>(null);
  
  // Handle scroll events to show/hide navbar with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 10) {
      // Always show navbar at the top of the page
      setShowNavbar(true);
    } else if (currentScrollY < lastScrollY.current) {
      // Show navbar when scrolling up
      setShowNavbar(true);
    } else if (currentScrollY > lastScrollY.current) {
      // Hide navbar when scrolling down
      setShowNavbar(false);
    }
    
    lastScrollY.current = currentScrollY;
  }, []);
  
  // Optimized scroll handler with throttling
  useEffect(() => {
    const throttledScrollHandler = () => {
      if (scrollTimer.current === null) {
        scrollTimer.current = window.setTimeout(() => {
          handleScroll();
          scrollTimer.current = null;
        }, 100); // Throttle to once per 100ms
      }
    };
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, [handleScroll]);
  
  // Handle drag and drop for widgets
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
  
  // Handle adding new widgets
  const handleAddWidget = useCallback((type: WidgetType) => {
    const widget = availableWidgets.find(w => w.type === type);
    if (widget) {
      setDashboardWidgets(prev => [
        ...prev,
        {
          id: `${type}-${nanoid(6)}`,
          type: type,
          title: widget.title,
          size: type === "trafficTrends" || type === "trendHeatmap" || type === "trendPerformance" ? "full" : "medium"
        }
      ]);
      setDialogOpen(false);
    }
  }, []);
  
  // Handle tab change
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);
  
  return (
    <div className="min-h-screen dashboard-bg relative overflow-x-hidden pb-20">
      {/* Custom Navbar Section */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 navbar-fade"
        style={{
          opacity: showNavbar ? 1 : 0,
          transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: showNavbar ? 'auto' : 'none'
        }}
        aria-hidden={!showNavbar}
      >
        <Navbar />
      </div>
      
      {activeTab === "customizable" && (
        <WidgetSidebar onAddWidget={handleAddWidget} />
      )}
      
      <main 
        className={`container mx-auto py-8 px-4 sm:px-6 transition-all ${activeTab === "customizable" ? "ml-12" : "ml-0"}`} 
        style={{ marginTop: '64px' }}
        aria-label="Dashboard content"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-brand-primary">Dashboard</h1>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="glass-morphism rounded-md">
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
          <section className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100" aria-label="Customizable dashboard">
            <DashboardGrid
              widgets={dashboardWidgets}
              onWidgetsChange={setDashboardWidgets}
              onRemoveWidget={(id) => setDashboardWidgets(prev => prev.filter(w => w.id !== id))}
              onOpenAddDialog={() => setDialogOpen(true)}
            />
            <AddWidgetDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onAddWidget={handleAddWidget}
            />
          </section>
        ) : activeTab === "platforms" ? (
          <section className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100" aria-label="Platform analytics">
            <PlatformAnalytics
              currentPlatform={currentPlatform}
              onPlatformChange={setCurrentPlatform}
            />
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <section className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100" aria-label="Analytics dashboard">
              <AnalyticsDashboard />
            </section>
            <section className="shadow-depth-1 bg-white p-6 rounded-md border border-gray-100" aria-label="YouTube analytics">
              <YouTubeAnalytics />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
