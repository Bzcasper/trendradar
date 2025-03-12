
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { GripVertical, X } from "lucide-react";
import { useState, useCallback } from "react";

interface DraggableWidgetProps {
  id: string;
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
  isDragging?: boolean;
}

export function DraggableWidget({ id, title, onRemove, children, isDragging = false }: DraggableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    zIndex: isDragging ? 10 : 'auto',
    willChange: 'transform, opacity',
  };
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`relative overflow-hidden rounded-[0.618rem] shadow-sm hover:shadow-md transition-shadow border border-gray-100 bg-white ${isDragging ? 'shadow-lg opacity-80' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-labelledby={`widget-title-${id}`}
    >
      {/* Header that slides down on hover */}
      <div 
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2 bg-brand-primary text-white"
        style={{ 
          transform: isHovered ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.2s ease-out',
          willChange: 'transform',
        }}
      >
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
        
        {onRemove && (
          <button 
            onClick={onRemove}
            className="p-1 text-white hover:text-white transition-colors"
            aria-label={`Remove ${title} widget`}
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </Card>
  );
}
