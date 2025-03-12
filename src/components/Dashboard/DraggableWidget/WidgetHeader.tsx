
import React from "react";
import { GripVertical } from "lucide-react";
import { WidgetType } from "../types";
import { getWidgetIcon } from "./utils";
import { cn } from "@/lib/utils";

interface WidgetHeaderProps {
  title: string;
  type: WidgetType;
  attributes: any;
  listeners: any;
  bg: string;
  children?: React.ReactNode;
}

export function WidgetHeader({ title, type, attributes, listeners, bg, children }: WidgetHeaderProps) {
  return (
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
        {children}
      </div>
    </div>
  );
}
