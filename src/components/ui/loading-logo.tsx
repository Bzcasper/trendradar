
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
      {/* Logo Container */}
      <div className="absolute inset-0">
        {/* Outer Circle */}
        <svg className="w-full h-full" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="23"
            className="stroke-[#48D1CC] stroke-2 fill-none"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 150;150 150;150 0"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              values="0;-150;-150"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Inner Radar Sweep */}
        <svg 
          className="absolute inset-0 w-full h-full animate-spin"
          viewBox="0 0 50 50"
          style={{ animationDuration: '3s' }}
        >
          <path
            d="M25,25 L25,5 A20,20 0 0,1 45,25 Z"
            className="fill-[#48D1CC]"
            opacity="0.9"
          >
            <animate
              attributeName="opacity"
              values="0.9;0.4;0.9"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          <circle
            cx="25"
            cy="25"
            r="3"
            className="fill-[#48D1CC]"
          />
        </svg>
      </div>
    </div>
  );
};
