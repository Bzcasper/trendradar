
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { availableWidgets, WidgetType } from "../types";
import { WIDGET_CATEGORIES } from "./WidgetCategories";
import { WidgetCard } from "./WidgetCard";
import { getWidgetIcon } from "./WidgetIcon";

interface WidgetSidebarProps {
  onAddWidget: (type: WidgetType) => void;
}

export function WidgetSidebar({ onAddWidget }: WidgetSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [width, setWidth] = useState(256); // Default expanded width
  const [isResizing, setIsResizing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const minWidth = 256; // Minimum width when expanded
  const maxWidth = 400; // Maximum width
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse move during resize
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const newWidth = Math.max(
      minWidth,
      Math.min(maxWidth, e.clientX)
    );
    
    setWidth(newWidth);
  }, [isResizing, minWidth, maxWidth]);
  
  // Handle mouse up to end resize
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);
  
  // Effect for adding/removing event listeners
  useEffect(() => {
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
  }, [isResizing, handleMouseMove, handleMouseUp]);
  
  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);
  
  const handleToggleSidebar = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  // Handle search query change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Filter widgets based on search query
  const filteredWidgets = searchQuery.trim() === "" 
    ? availableWidgets
    : availableWidgets.filter(widget => 
        widget.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <aside 
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r transition-all duration-300 z-10",
        isExpanded ? "" : "w-12"
      )}
      style={{ width: isExpanded ? `${width}px` : '48px' }}
      aria-label="Widget sidebar"
    >
      <div className="flex flex-col h-full relative">
        <div className="flex justify-end p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleSidebar}
            className="rounded-full"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? <ChevronLeft size={18} aria-hidden="true" /> : <ChevronRight size={18} aria-hidden="true" />}
          </Button>
        </div>
        
        <Separator />
        
        {isExpanded ? (
          <ExpandedSidebar 
            searchQuery={searchQuery}
            setSearchQuery={handleSearchChange}
            filteredWidgets={filteredWidgets}
            onAddWidget={onAddWidget}
          />
        ) : (
          <CollapsedSidebar 
            onExpand={() => setIsExpanded(true)} 
          />
        )}
        
        {/* Resize handle */}
        {isExpanded && (
          <div 
            ref={resizeHandleRef}
            className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-blue-100"
            onMouseDown={startResizing}
            aria-label="Resize sidebar"
            role="separator"
          />
        )}
      </div>
    </aside>
  );
}

interface ExpandedSidebarProps {
  searchQuery: string;
  setSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredWidgets: Array<{ type: WidgetType, title: string }>;
  onAddWidget: (type: WidgetType) => void;
}

function ExpandedSidebar({ 
  searchQuery, 
  setSearchQuery, 
  filteredWidgets, 
  onAddWidget 
}: ExpandedSidebarProps) {
  return (
    <div className="p-4 flex-1 overflow-y-auto">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Search widgets..."
            className="pl-8"
            value={searchQuery}
            onChange={setSearchQuery}
            aria-label="Search widgets"
          />
        </div>
      </div>
      
      {searchQuery.trim() !== "" ? (
        <div className="space-y-2">
          <h3 className="font-medium mb-2 text-sm text-gray-700">SEARCH RESULTS</h3>
          {filteredWidgets.length > 0 ? (
            filteredWidgets.map((widget) => (
              <WidgetCard
                key={widget.type}
                type={widget.type}
                title={widget.title}
                onClick={() => onAddWidget(widget.type)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-700 py-2">No widgets found</p>
          )}
        </div>
      ) : (
        WIDGET_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5" aria-hidden="true">
                <category.icon />
              </div>
              <h3 className="font-medium text-sm text-gray-700">{category.name.toUpperCase()}</h3>
            </div>
            <div className="space-y-2">
              {availableWidgets
                .filter(widget => category.widgets.includes(widget.type))
                .map((widget) => (
                  <WidgetCard
                    key={widget.type}
                    type={widget.type}
                    title={widget.title}
                    onClick={() => onAddWidget(widget.type)}
                  />
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function CollapsedSidebar({ onExpand }: { onExpand: () => void }) {
  return (
    <div className="flex flex-col items-center pt-4 gap-4">
      {availableWidgets.slice(0, 5).map((widget, index) => (
        <div 
          key={index}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
          title={widget.title}
          onClick={onExpand}
          role="button"
          aria-label={`${widget.title} widget - click to expand sidebar`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onExpand();
              e.preventDefault();
            }
          }}
        >
          {getWidgetIcon(widget.type)}
        </div>
      ))}
      {availableWidgets.length > 5 && (
        <div 
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
          title="More widgets"
          onClick={onExpand}
          role="button"
          aria-label="More widgets - click to expand sidebar"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onExpand();
              e.preventDefault();
            }
          }}
        >
          <span className="text-xs font-bold">+{availableWidgets.length - 5}</span>
        </div>
      )}
    </div>
  );
}
