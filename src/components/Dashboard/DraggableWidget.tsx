
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { GripVertical, X } from "lucide-react";

interface DraggableWidgetProps {
  id: string;
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}

export function DraggableWidget({ id, title, onRemove, children }: DraggableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="overflow-hidden" 
    >
      <div className="bg-gray-50 border-b p-3 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="cursor-grab p-1 mr-2 text-gray-500 hover:text-gray-700 touch-none" 
            {...attributes} 
            {...listeners}
          >
            <GripVertical size={18} />
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        
        {onRemove && (
          <button 
            onClick={onRemove}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        )}
      </div>
      <div className="p-4">
        {children}
      </div>
    </Card>
  );
}
