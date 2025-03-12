
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { WidgetType } from "../types";
import { getWidgetColors } from "./utils";
import { cn } from "@/lib/utils";
import { WidgetHeader } from "./WidgetHeader";
import { WidgetControls } from "./WidgetControls";

interface DraggableWidgetProps {
  id: string;
  title: string;
  type: WidgetType;
  onRemove?: () => void;
  onMaximize?: () => void;
  children: React.ReactNode;
}

export function DraggableWidget({ 
  id, 
  title, 
  type,
  onRemove, 
  onMaximize,
  children 
}: DraggableWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { bg, border } = getWidgetColors(type);
  
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    isDragging
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (onMaximize) onMaximize();
  };
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={cn(
        "overflow-hidden border-2 transition-all duration-200", 
        border,
        isDragging ? "shadow-lg ring-2 ring-blue-300 z-50" : "shadow-sm hover:shadow-md",
        isExpanded ? "col-span-full row-span-2" : ""
      )} 
    >
      <WidgetHeader 
        title={title}
        type={type}
        attributes={attributes}
        listeners={listeners}
        bg={bg}
      >
        <WidgetControls
          isExpanded={isExpanded}
          onToggleExpand={toggleExpanded}
          onRemove={onRemove}
        />
      </WidgetHeader>
      
      <div className={cn(
        "p-4 transition-all",
        isExpanded ? "h-[500px] overflow-auto" : "h-auto"
      )}>
        {children}
      </div>
    </Card>
  );
}
