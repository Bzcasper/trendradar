
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={`fade-in relative overflow-hidden rounded-[0.618rem] shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 bg-white ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="absolute inset-x-0 top-0 z-10 flex items-center px-4 py-2 bg-gradient-to-r from-brand-primary/95 to-brand-primary/85 text-white transition-transform duration-300 ease-in-out"
        style={{ 
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
