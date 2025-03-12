
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { useState, useCallback } from "react";
import { WidgetHeader } from "./WidgetHeader";

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleToggleExpand = useCallback(() => setIsExpanded(prev => !prev), []);
  
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
        <WidgetHeader 
          id={id}
          title={title}
          // Cast attributes to any here to work around the type issue
          // This is safe because the dnd-kit library is designed to work with the DOM
          attributes={attributes as any}
          listeners={listeners as any}
          isExpanded={isExpanded}
          onToggleExpand={handleToggleExpand}
          onRemove={onRemove}
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </Card>
  );
}
