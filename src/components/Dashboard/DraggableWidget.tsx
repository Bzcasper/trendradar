
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
  
  // Golden ratio: 1.618
  const headerHeight = "2.618rem";
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`bg-gradient-to-r from-brand-primary/90 to-brand-primary/80 text-white absolute inset-x-0 top-0 z-10 flex items-center justify-between px-3 transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100 h-10' : 'opacity-0 h-0 overflow-hidden'}`}
        style={{ height: isHovered ? headerHeight : '0' }}
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
      
      <div className={`p-4 transition-all duration-300 ${isHovered ? 'pt-[calc(2.618rem+1rem)]' : 'pt-4'}`}>
        {children}
      </div>
    </Card>
  );
}
