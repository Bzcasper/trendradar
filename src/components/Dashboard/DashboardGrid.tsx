
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const [widgetSizes, setWidgetSizes] = useState<Record<string, { width: number, height: number }>>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id && over?.id) {
      onWidgetsChange(widgets.map(item => {
        const oldIndex = widgets.findIndex((item) => item.id === active.id);
        const newIndex = widgets.findIndex((item) => item.id === over.id);
        
        return arrayMove(widgets, oldIndex, newIndex);
      })[0]);
    }
  };

  const handleWidgetResize = (id: string, width: number, height: number) => {
    setWidgetSizes(prev => ({
      ...prev,
      [id]: { width, height }
    }));
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
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
