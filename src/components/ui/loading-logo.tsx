
import { cn } from "@/lib/utils";

interface LoadingLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingLogo = ({ className, size = "md" }: LoadingLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A2349"/>
            <stop offset="100%" stopColor="#48D1CC"/>
          </linearGradient>
          
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#48D1CC" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#48D1CC" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Outer Ring */}
        <circle 
          cx="100" 
          cy="100" 
          r="90" 
          className="fill-none" 
          stroke="url(#logoGradient)" 
          strokeWidth="8" 
          opacity="0.9"
        />

        {/* Inner Rings */}
        <circle 
          cx="100" 
          cy="100" 
          r="70" 
          className="fill-none stroke-[#0A2349]" 
          strokeWidth="1" 
          opacity="0.7"
        />
        <circle 
          cx="100" 
          cy="100" 
          r="50" 
          className="fill-none stroke-[#0A2349]" 
          strokeWidth="1" 
          opacity="0.7"
        />
        <circle 
          cx="100" 
          cy="100" 
          r="30" 
          className="fill-none stroke-[#0A2349]" 
          strokeWidth="1" 
          opacity="0.7"
        />

        {/* Grid Lines */}
        <line 
          x1="10" 
          y1="100" 
          x2="190" 
          y2="100" 
          className="stroke-[#0A2349]" 
          strokeWidth="1" 
          opacity="0.5"
        />
        <line 
          x1="100" 
          y1="10" 
          x2="100" 
          y2="190" 
          className="stroke-[#0A2349]" 
          strokeWidth="1" 
          opacity="0.5"
        />

        {/* Diagonal Lines */}
        <line 
          x1="30" 
          y1="30" 
          x2="170" 
          y2="170" 
          className="stroke-[#0A2349]" 
          strokeWidth="1" 
          opacity="0.3"
        />
        <line 
          x1="170" 
          y1="30" 
          x2="30" 
          y2="170" 
          className="stroke-[#0A2349]" 
          strokeWidth="1" 
          opacity="0.3"
        />

        {/* Central Point */}
        <circle cx="100" cy="100" r="8" className="fill-[#0A2349]"/>
        <circle cx="100" cy="100" r="4" className="fill-[#48D1CC]"/>

        {/* Radar Sweep */}
        <g className="origin-center animate-spin" style={{ animationDuration: '4s' }}>
          <path 
            d="M100,100 L170,100" 
            className="stroke-[#48D1CC]" 
            strokeWidth="2.5" 
            opacity="0.8"
          />
          <circle 
            cx="170" 
            cy="100" 
            r="4" 
            className="fill-[#48D1CC]" 
            opacity="0.8"
          />
        </g>

        {/* Data Points */}
        <g>
          <circle 
            cx="150" 
            cy="70" 
            r="4" 
            className="fill-[#48D1CC] animate-pulse" 
            opacity="0.9"
          />
          <circle 
            cx="60" 
            cy="130" 
            r="3" 
            className="fill-[#48D1CC] animate-pulse" 
            opacity="0.8"
          />
          <circle 
            cx="130" 
            cy="160" 
            r="5" 
            className="fill-[#48D1CC] animate-pulse" 
            opacity="0.7"
          />
          <circle 
            cx="40" 
            cy="60" 
            r="3.5" 
            className="fill-[#48D1CC] animate-pulse" 
            opacity="0.75"
          />
        </g>

        {/* Pulse Effect */}
        <circle 
          cx="100" 
          cy="100" 
          r="0" 
          className="fill-none stroke-[url(#pulseGradient)]" 
          strokeWidth="2"
        >
          <animate 
            attributeName="r" 
            values="0;90" 
            dur="3s" 
            repeatCount="indefinite"
          />
          <animate 
            attributeName="opacity" 
            values="0.6;0" 
            dur="3s" 
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};
