
import { useState, useRef, useEffect } from "react";
import { DraggableWidget } from "./DraggableWidget";

interface ResizableWidgetProps {
  id: string;
  title: string;
  onRemove?: () => void;
  onResize?: (id: string, width: number, height: number) => void;
  children: React.ReactNode;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  isDragging?: boolean;
}

export function ResizableWidget({ 
  id, 
  title, 
  onRemove, 
  onResize, 
  children,
  initialWidth,
  initialHeight = 250,
  minWidth = 200,
  minHeight = 150,
  isDragging = false
}: ResizableWidgetProps) {
  const [size, setSize] = useState({ width: initialWidth || "100%", height: initialHeight });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  
  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    startPos.current = { x: e.clientX, y: e.clientY };
    
    if (widgetRef.current) {
      startSize.current = {
        width: widgetRef.current.offsetWidth,
        height: widgetRef.current.offsetHeight
      };
    }
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
  };
  
  // Handle resize
  const handleResize = (e: MouseEvent) => {
    if (!isResizing || !resizeDirection) return;
    
    e.preventDefault();
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    
    let newWidth = startSize.current.width;
    let newHeight = startSize.current.height;
    
    if (resizeDirection.includes('e')) {
      newWidth = Math.max(startSize.current.width + deltaX, minWidth);
    } else if (resizeDirection.includes('w')) {
      newWidth = Math.max(startSize.current.width - deltaX, minWidth);
    }
    
    if (resizeDirection.includes('s')) {
      newHeight = Math.max(startSize.current.height + deltaY, minHeight);
    } else if (resizeDirection.includes('n')) {
      newHeight = Math.max(startSize.current.height - deltaY, minHeight);
    }
    
    setSize({
      width: newWidth,
      height: newHeight
    });
    
    if (onResize) {
      onResize(id, newWidth, newHeight);
    }
  };
  
  // Handle resize end
  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizeDirection(null);
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', handleResizeEnd);
  };
  
  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);
  
  // Based on golden ratio (1.618)
  const handleSize = "0.618rem";
  
  return (
    <div 
      ref={widgetRef}
      className={`relative mb-4 ${isDragging ? 'opacity-75' : ''}`}
      style={{ 
        width: typeof size.width === 'number' ? `${size.width}px` : size.width, 
        height: typeof size.height === 'number' ? `${size.height}px` : size.height,
        transition: isResizing || isDragging ? 'none' : 'width 0.3s ease, height 0.3s ease',
      }}
    >
      <DraggableWidget id={id} title={title} onRemove={onRemove} isDragging={isDragging}>
        <div className="w-full h-full overflow-hidden">
          {children}
        </div>
      </DraggableWidget>
      
      {/* Resize handles */}
      <div 
        className="resizable-handle resizable-handle-ne w-2 h-2"
        onMouseDown={(e) => handleResizeStart(e, 'ne')}
      />
      <div 
        className="resizable-handle resizable-handle-se w-2 h-2"
        onMouseDown={(e) => handleResizeStart(e, 'se')}
      />
      <div 
        className="resizable-handle resizable-handle-sw w-2 h-2"
        onMouseDown={(e) => handleResizeStart(e, 'sw')}
      />
      <div 
        className="resizable-handle resizable-handle-nw w-2 h-2"
        onMouseDown={(e) => handleResizeStart(e, 'nw')}
      />
    </div>
  );
}
