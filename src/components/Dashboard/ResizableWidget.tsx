
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
}

export function ResizableWidget({ 
  id, 
  title, 
  onRemove, 
  onResize, 
  children,
  initialWidth,
  initialHeight,
  minWidth = 200,
  minHeight = 150
}: ResizableWidgetProps) {
  const [size, setSize] = useState({ width: initialWidth || "100%", height: initialHeight || "auto" });
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
  
  // Resizing handles - follow golden ratio (1.618)
  const handleSize = "0.618rem";
  
  return (
    <div 
      ref={widgetRef}
      className="relative" 
      style={{ 
        width: typeof size.width === 'number' ? `${size.width}px` : size.width, 
        height: typeof size.height === 'number' ? `${size.height}px` : size.height,
        transition: isResizing ? 'none' : 'width 0.3s ease, height 0.3s ease',
      }}
    >
      <DraggableWidget id={id} title={title} onRemove={onRemove}>
        <div className="w-full h-full">
          {children}
        </div>
      </DraggableWidget>
      
      {/* Resize handles */}
      <div 
        className="absolute top-0 right-0 w-[0.618rem] h-[0.618rem] cursor-ne-resize bg-brand-primary/50 hover:bg-brand-primary/80 rounded-tr-[0.382rem] z-20"
        style={{ width: handleSize, height: handleSize }}
        onMouseDown={(e) => handleResizeStart(e, 'ne')}
      />
      <div 
        className="absolute bottom-0 right-0 w-[0.618rem] h-[0.618rem] cursor-se-resize bg-brand-primary/50 hover:bg-brand-primary/80 rounded-br-[0.382rem] z-20"
        style={{ width: handleSize, height: handleSize }}
        onMouseDown={(e) => handleResizeStart(e, 'se')}
      />
      <div 
        className="absolute bottom-0 left-0 w-[0.618rem] h-[0.618rem] cursor-sw-resize bg-brand-primary/50 hover:bg-brand-primary/80 rounded-bl-[0.382rem] z-20"
        style={{ width: handleSize, height: handleSize }}
        onMouseDown={(e) => handleResizeStart(e, 'sw')}
      />
      <div 
        className="absolute top-0 left-0 w-[0.618rem] h-[0.618rem] cursor-nw-resize bg-brand-primary/50 hover:bg-brand-primary/80 rounded-tl-[0.382rem] z-20"
        style={{ width: handleSize, height: handleSize }}
        onMouseDown={(e) => handleResizeStart(e, 'nw')}
      />
    </div>
  );
}
