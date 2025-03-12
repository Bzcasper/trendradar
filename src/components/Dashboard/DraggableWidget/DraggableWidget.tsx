
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { GripVertical, X, Maximize2, Minimize2, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { WidgetType } from "../types";
import { getWidgetIcon, getWidgetColors } from "./utils";
import { cn } from "@/lib/utils";

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
      <div className={cn(
        "border-b p-3 flex items-center justify-between", 
        bg
      )}>
        <div className="flex items-center flex-1 min-w-0">
          <div 
            className="cursor-grab p-1 mr-2 text-gray-500 hover:text-gray-700 touch-none" 
            {...attributes} 
            {...listeners}
          >
            <GripVertical size={18} />
          </div>
          
          <div className="w-6 h-6 mr-2 flex-shrink-0">
            {getWidgetIcon(type)}
          </div>
          
          <h3 className="font-medium truncate">{title}</h3>
        </div>
        
        <div className="flex items-center gap-1">
          <WidgetControls 
            isExpanded={isExpanded} 
            onToggleExpand={toggleExpanded}
            onRemove={onRemove}
          />
        </div>
      </div>
      
      <div className={cn(
        "p-4 transition-all",
        isExpanded ? "h-[500px] overflow-auto" : "h-auto"
      )}>
        {children}
      </div>
    </Card>
  );
}

function WidgetControls({ 
  isExpanded, 
  onToggleExpand, 
  onRemove 
}: { 
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove?: () => void;
}) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-gray-500 hover:text-gray-700"
        onClick={onToggleExpand}
      >
        {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-gray-500 hover:text-gray-700"
          >
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={onToggleExpand}>
            {isExpanded ? "Minimize" : "Maximize"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove} className="text-red-600">
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {onRemove && (
        <Button 
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-7 w-7 text-gray-500 hover:text-red-600"
        >
          <X size={16} />
        </Button>
      )}
    </>
  );
}
