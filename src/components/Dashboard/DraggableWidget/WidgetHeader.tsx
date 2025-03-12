
import React from "react";
import { GripVertical } from "lucide-react";
import { WidgetControls } from "./WidgetControls";

interface WidgetHeaderProps {
  id: string;
  title: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove?: () => void;
  // Use Record<string, any> to allow any attributes from dnd-kit
  attributes: Record<string, any>;
  listeners: Record<string, any>;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  id,
  title,
  isExpanded,
  onToggleExpand,
  onRemove,
  attributes,
  listeners,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div 
          className="cursor-grab p-1 mr-2 text-white hover:text-white touch-none" 
          {...attributes} 
          {...listeners}
          aria-label={`Drag ${title}`}
        >
          <GripVertical size={16} aria-hidden="true" />
        </div>
        <h3 id={`widget-title-${id}`} className="font-medium text-sm">{title}</h3>
      </div>
      
      {/* Make sure to use onToggleExpand prop here, not onToggleExpanded */}
      <WidgetControls
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
        onRemove={onRemove}
      />
    </div>
  );
};
