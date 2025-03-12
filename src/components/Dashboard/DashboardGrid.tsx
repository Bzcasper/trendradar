
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ResizableWidget } from "./ResizableWidget";
import { DashboardWidgetContent } from "./DashboardWidgetFactory";
import { WidgetData } from "./types";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

interface DashboardGridProps {
  widgets: WidgetData[];
  onWidgetsChange: (widgets: WidgetData[]) => void;
  onRemoveWidget: (id: string) => void;
  onOpenAddDialog: () => void;
}

export function DashboardGrid({ widgets, onWidgetsChange, onRemoveWidget, onOpenAddDialog }: DashboardGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [widgetSizes, setWidgetSizes] = useState<Record<string, { width: number, height: number }>>({});
  
  // Create more sensitive sensors for smoother dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reduced distance for activation (more sensitive)
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (active.id !== over?.id && over?.id) {
      const oldIndex = widgets.findIndex((item) => item.id === active.id);
      const newIndex = widgets.findIndex((item) => item.id === over.id);
      
      const newWidgets = arrayMove(widgets, oldIndex, newIndex);
      onWidgetsChange(newWidgets);
    }
  };

  const handleWidgetResize = (id: string, width: number, height: number) => {
    setWidgetSizes(prev => ({
      ...prev,
      [id]: { width, height }
    }));
  };
  
  // Find the active widget
  const activeWidget = activeId ? widgets.find(widget => widget.id === activeId) : null;

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-6">
        <div className="flex justify-end mb-6">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1 bg-brand-primary text-white hover:bg-brand-primary/90 border-none rounded-md px-4 py-2" 
            onClick={onOpenAddDialog}
          >
            <Plus className="h-4 w-4" />
            Add Widget
          </Button>
        </div>
        
        <SortableContext items={widgets.map(widget => widget.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 gap-6">
            {/* Full-width widgets with resizing */}
            <div className="space-y-6">
              {widgets
                .filter(widget => widget.size === "full")
                .map((widget) => (
                  <ResizableWidget 
                    key={widget.id} 
                    id={widget.id} 
                    title={widget.title}
                    onRemove={() => onRemoveWidget(widget.id)}
                    onResize={handleWidgetResize}
                    initialHeight={300}
                    isDragging={widget.id === activeId}
                  >
                    <DashboardWidgetContent type={widget.type} />
                  </ResizableWidget>
                ))}
            </div>
              
            {/* Responsive grid for smaller widgets with resizing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {widgets
                .filter(widget => widget.size !== "full")
                .map((widget) => (
                  <ResizableWidget 
                    key={widget.id} 
                    id={widget.id} 
                    title={widget.title}
                    onRemove={() => onRemoveWidget(widget.id)}
                    onResize={handleWidgetResize}
                    initialHeight={250}
                    isDragging={widget.id === activeId}
                  >
                    <DashboardWidgetContent type={widget.type} />
                  </ResizableWidget>
                ))}
            </div>
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}
