
import { useState } from "react";
import { ChevronRight, ChevronLeft, Plus, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { availableWidgets, WidgetType } from "./DashboardWidgetFactory";
import { cn } from "@/lib/utils";

interface WidgetSidebarProps {
  onAddWidget: (type: WidgetType) => void;
}

export function WidgetSidebar({ onAddWidget }: WidgetSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={cn(
      "fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r transition-all duration-300 z-10",
      isExpanded ? "w-64" : "w-12"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full"
          >
            {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
        
        <Separator />
        
        {isExpanded ? (
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-medium mb-3">Available Widgets</h3>
            <div className="space-y-2">
              {availableWidgets.map((widget) => (
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
                    <span className="text-sm">{widget.title}</span>
                    <div className="ml-auto">
                      <Plus size={16} className="text-blue-500" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
                <span className="text-xs font-bold">{widget.title.charAt(0)}</span>
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
      </div>
    </div>
  );
}
