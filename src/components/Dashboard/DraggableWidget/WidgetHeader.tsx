import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { ChevronDown, ChevronUp, Grip, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WidgetHeaderProps {
  id: string;
  title: string;
  isDragging?: boolean;
  isExpanded: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  onToggleExpand: () => void;
  onRemove: () => void;
}

export function WidgetHeader({
  id,
  title,
  isDragging,
  isExpanded,
  attributes,
  listeners,
  onToggleExpand,
  onRemove
}: WidgetHeaderProps) {
  return (
    <div 
      className={`widget-header flex items-center justify-between p-3 bg-white border-b ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-2">
        <Grip className="h-4 w-4 text-gray-400" />
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={onToggleExpand}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:text-red-500"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
