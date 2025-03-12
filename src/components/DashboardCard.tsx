
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
      className={`fade-in relative overflow-hidden widget-card ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="widget-header absolute inset-x-0 top-0 z-10 flex items-center px-4 transition-transform duration-300 ease-in-out"
        style={{ 
          height: headerHeight,
          transform: isHovered ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
};
