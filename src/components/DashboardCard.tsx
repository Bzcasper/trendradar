
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardId = `card-${title.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <Card 
      className={`fade-in relative overflow-hidden rounded-[0.618rem] shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 bg-white ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-labelledby={cardId}
    >
      <div 
        className="absolute inset-x-0 top-0 z-10 flex items-center px-4 py-2 bg-brand-primary text-white transition-transform duration-300 ease-in-out"
        style={{ 
          transform: isHovered ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <h3 id={cardId} className="text-sm font-medium">{title}</h3>
      </div>
      
      <CardContent className="p-4">
        {children}
      </CardContent>
    </Card>
  );
};
