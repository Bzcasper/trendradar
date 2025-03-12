
import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronLeft, Plus, GripVertical, GripHorizontal, Search, FileBarChart, BarChart2, TrendingUp, Eye, Hash, Zap, Activity, Radio, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { availableWidgets, WidgetType } from "./DashboardWidgetFactory";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface WidgetSidebarProps {
  onAddWidget: (type: WidgetType) => void;
}

// Grouped widgets by category
const WIDGET_CATEGORIES = [
  {
    name: "Analytics",
    icon: FileBarChart,
    widgets: ["trafficTrends", "trafficSources", "conversionFunnel", "platformPerformance"]
  },
  {
    name: "Engagement",
    icon: Activity,
    widgets: ["keyMetrics", "engagementRadar", "topPerformers"]
  },
  {
    name: "Content",
    icon: BookOpen,
    widgets: ["keywordCloud", "viralPotential"]
  }
];

export function WidgetSidebar({ onAddWidget }: WidgetSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(256); // Default expanded width
  const [isResizing, setIsResizing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const minWidth = 256; // Minimum width when expanded
  const maxWidth = 400; // Maximum width
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = Math.max(
        minWidth,
        Math.min(maxWidth, e.clientX)
      );
      
      setWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
    
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);
  
  const startResizing = () => {
    setIsResizing(true);
  };
  
  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Filter widgets based on search query
  const filteredWidgets = searchQuery.trim() === "" 
    ? availableWidgets
    : availableWidgets.filter(widget => 
        widget.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  const getWidgetIcon = (type: WidgetType) => {
    switch (type) {
      case "trafficTrends": return <TrendingUp size={16} className="text-blue-500" />;
      case "trafficSources": return <Radio size={16} className="text-orange-500" />;
      case "conversionFunnel": return <BarChart2 size={16} className="text-green-500" />;
      case "platformPerformance": return <Activity size={16} className="text-purple-500" />;
      case "keyMetrics": return <FileBarChart size={16} className="text-red-500" />;
      case "topPerformers": return <Zap size={16} className="text-yellow-500" />;
      case "engagementRadar": return <Eye size={16} className="text-pink-500" />;
      case "keywordCloud": return <Hash size={16} className="text-indigo-500" />;
      case "viralPotential": return <TrendingUp size={16} className="text-teal-500" />;
      default: return <Plus size={16} className="text-gray-400" />;
    }
  };
  
  return (
    <div 
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r transition-all duration-300 z-10",
        isExpanded ? "" : "w-12"
      )}
      style={{ width: isExpanded ? `${width}px` : '48px' }}
    >
      <div className="flex flex-col h-full relative">
        <div className="flex justify-end p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleSidebar}
            className="rounded-full"
          >
            {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
        
        <Separator />
        
        {isExpanded ? (
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search widgets..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {searchQuery.trim() !== "" ? (
              <div className="space-y-2">
                <h3 className="font-medium mb-2 text-sm text-gray-500">SEARCH RESULTS</h3>
                {filteredWidgets.length > 0 ? (
                  filteredWidgets.map((widget) => (
                    <Card 
                      key={widget.type}
                      className="p-3 cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("widget-type", widget.type);
                      }}
                      onClick={() => onAddWidget(widget.type)}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-gray-400" />
                        {getWidgetIcon(widget.type)}
                        <span className="text-sm">{widget.title}</span>
                        <div className="ml-auto">
                          <Plus size={16} className="text-blue-500" />
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-2">No widgets found</p>
                )}
              </div>
            ) : (
              WIDGET_CATEGORIES.map((category) => (
                <div key={category.name} className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <category.icon size={16} className="text-gray-600" />
                    <h3 className="font-medium text-sm text-gray-500">{category.name.toUpperCase()}</h3>
                  </div>
                  <div className="space-y-2">
                    {availableWidgets
                      .filter(widget => category.widgets.includes(widget.type))
                      .map((widget) => (
                        <Card 
                          key={widget.type}
                          className="p-3 cursor-move hover:shadow-md transition-shadow"
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData("widget-type", widget.type);
                          }}
                          onClick={() => onAddWidget(widget.type)}
                        >
                          <div className="flex items-center gap-2">
                            <GripVertical size={16} className="text-gray-400" />
                            {getWidgetIcon(widget.type)}
                            <span className="text-sm">{widget.title}</span>
                            <div className="ml-auto">
                              <Plus size={16} className="text-blue-500" />
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center pt-4 gap-4">
            {availableWidgets.slice(0, 5).map((widget, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                title={widget.title}
                onClick={() => {
                  setIsExpanded(true);
                }}
              >
                {getWidgetIcon(widget.type)}
              </div>
            ))}
            {availableWidgets.length > 5 && (
              <div 
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                title="More widgets"
                onClick={() => {
                  setIsExpanded(true);
                }}
              >
                <span className="text-xs font-bold">+{availableWidgets.length - 5}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Resize handle */}
        {isExpanded && (
          <div 
            ref={resizeHandleRef}
            className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-blue-100"
            onMouseDown={startResizing}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1">
              <GripHorizontal size={12} className="text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
