
import React from "react";
import { Maximize2, Minimize2, X } from "lucide-react";

interface WidgetControlsProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove?: () => void;
}

export function WidgetControls({ isExpanded, onToggleExpand, onRemove }: WidgetControlsProps) {
  return (
    <div className="flex items-center">
      <button 
        onClick={onToggleExpand}
        className="p-1 text-white hover:text-white transition-colors"
        aria-label={isExpanded ? "Minimize widget" : "Maximize widget"}
      >
        {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
      
      {onRemove && (
        <button 
          onClick={onRemove}
          className="p-1 text-white hover:text-white transition-colors ml-1"
          aria-label="Remove widget"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
