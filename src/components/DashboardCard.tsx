
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Golden ratio: 1.618
  const headerHeight = "2.618rem";
  
  return (
    <Card 
      className={`fade-in relative overflow-hidden ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`bg-gradient-to-r from-brand-primary/90 to-brand-primary/80 text-white absolute inset-x-0 top-0 z-10 flex items-center px-4 transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
        style={{ height: isHovered ? headerHeight : '0' }}
      >
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      
      <CardContent className={`transition-all duration-300 ${isHovered ? 'pt-[calc(2.618rem+1rem)]' : 'pt-4'}`}>
        {children}
      </CardContent>
    </Card>
  );
};
