
import React from "react";
import { GripVertical, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { WidgetType } from "../types";
import { getWidgetIcon } from "./WidgetIcon";

interface WidgetCardProps {
  type: WidgetType;
  title: string;
  onClick: () => void;
}

export const WidgetCard = ({ type, title, onClick }: WidgetCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
      e.preventDefault();
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("widget-type", type);
  };
  
  return (
    <Card 
      className="p-3 cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={handleDragStart}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Add ${title} widget`}
    >
      <div className="flex items-center gap-2">
        <GripVertical size={16} className="text-gray-400" aria-hidden="true" />
        <div aria-hidden="true">{getWidgetIcon(type)}</div>
        <span className="text-sm">{title}</span>
        <div className="ml-auto" aria-hidden="true">
          <Plus size={16} className="text-blue-500" />
        </div>
      </div>
    </Card>
  );
};
