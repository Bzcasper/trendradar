
import React from "react";
import { GripVertical } from "lucide-react";
import { WidgetControls } from "./WidgetControls";
import { WidgetType } from "../types";
import { getWidgetIcon, getWidgetColors } from "./utils";
import { cn } from "@/lib/utils";

interface WidgetHeaderProps {
  id: string;
  title: string;
  type: WidgetType;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onRemove?: () => void;
  // Replace any with proper types
  attributes: Record<string, unknown>;
  listeners: Record<string, unknown>;
}

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  id,
  title,
  type,
  isExpanded,
  onToggleExpanded,
  onRemove,
  attributes,
  listeners,
}) => {
  const { bg } = getWidgetColors(type);
  
  return (
    <div className={cn("border-b p-3 flex items-center justify-between", bg)}>
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

      <WidgetControls
        isExpanded={isExpanded}
        onToggleExpanded={onToggleExpanded}
        onRemove={onRemove}
      />
    </div>
  );
};
