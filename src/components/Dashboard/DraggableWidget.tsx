
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { GripVertical, X } from "lucide-react";
import { useState } from "react";

interface DraggableWidgetProps {
  id: string;
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function DraggableWidget({ id, title, onRemove, children }: DraggableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [isHovered, setIsHovered] = useState(false);
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="relative overflow-hidden rounded-[0.618rem] shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 bg-white" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header that slides up on hover */}
      <div 
        className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 py-2 bg-gradient-to-r from-brand-primary/95 to-brand-primary/85 text-white transition-transform duration-300 ease-in-out"
        style={{ 
          transform: isHovered ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <div className="flex items-center">
          <div 
            className="cursor-grab p-1 mr-2 text-white/80 hover:text-white touch-none" 
            {...attributes} 
            {...listeners}
          >
            <GripVertical size={16} />
          </div>
          <h3 className="font-medium text-sm">{title}</h3>
        </div>
        
        {onRemove && (
          <button 
            onClick={onRemove}
            className="p-1 text-white/80 hover:text-white"
          >
            <X size={16} />
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
