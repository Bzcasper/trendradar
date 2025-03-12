
import React from "react";
import { Maximize2, Minimize2, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface WidgetControlsProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove?: () => void;
}

export function WidgetControls({ isExpanded, onToggleExpand, onRemove }: WidgetControlsProps) {
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
          {onRemove && (
            <DropdownMenuItem onClick={onRemove} className="text-red-600">
              Remove
            </DropdownMenuItem>
          )}
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
