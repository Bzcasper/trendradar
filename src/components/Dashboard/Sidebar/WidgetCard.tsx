
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
  return (
    <Card 
      className="p-3 cursor-move hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("widget-type", type);
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <GripVertical size={16} className="text-gray-400" />
        {getWidgetIcon(type)}
        <span className="text-sm">{title}</span>
        <div className="ml-auto">
          <Plus size={16} className="text-blue-500" />
        </div>
      </div>
    </Card>
  );
};
