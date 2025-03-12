
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableWidget } from "./DraggableWidget";
import { DashboardWidgetContent } from "./DashboardWidgetFactory";
import { WidgetData } from "./types";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

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

  // Golden ratio spacing: 1.618rem
  const spacing = "1.618rem";

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCenter} 
      onDragEnd={handleDragEnd}
    >
      <div style={{ gap: spacing }} className="space-y-0">
        <div className="flex justify-end mb-6">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1 bg-brand-primary text-white hover:bg-brand-primary/90 border-brand-primary rounded-[0.618rem] px-[1.618rem] py-[0.618rem]" 
            onClick={onOpenAddDialog}
          >
            <Plus className="h-4 w-4" />
            Add Widget
          </Button>
        </div>
        
        <SortableContext items={widgets.map(widget => widget.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 gap-[1.618rem]">
            {/* Full-width widgets first */}
            <div style={{ gap: spacing }} className="space-y-0 mb-[1.618rem]">
              {widgets
                .filter(widget => widget.size === "full")
                .map((widget) => (
                  <DraggableWidget 
                    key={widget.id} 
                    id={widget.id} 
                    title={widget.title}
                    onRemove={() => onRemoveWidget(widget.id)}
                  >
                    <DashboardWidgetContent type={widget.type} />
                  </DraggableWidget>
                ))}
            </div>
              
            {/* Responsive grid for smaller widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.618rem]">
              {widgets
                .filter(widget => widget.size !== "full")
                .map((widget) => (
                  <DraggableWidget 
                    key={widget.id} 
                    id={widget.id} 
                    title={widget.title}
                    onRemove={() => onRemoveWidget(widget.id)}
                  >
                    <DashboardWidgetContent type={widget.type} />
                  </DraggableWidget>
                ))}
            </div>
          </div>
        </SortableContext>
      </div>
    </DndContext>
  );
}
