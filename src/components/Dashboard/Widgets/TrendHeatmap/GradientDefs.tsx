
import React from "react";

export const GradientDefs: React.FC = () => {
  return (
    <defs>
      {/* Enhanced background gradient with more depth */}
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      
      {/* Enhanced heatmap gradient with smoother transitions */}
      <linearGradient id="heatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="20%" stopColor="#2563eb" />
        <stop offset="40%" stopColor="#7c3aed" />
        <stop offset="60%" stopColor="#db2777" />
        <stop offset="80%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      
      {/* Enhanced card gradient */}
      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
      </linearGradient>
      
      {/* Enhanced glow effect */}
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
        <feComposite in="SourceGraphic" in2="glow" operator="over" />
      </filter>
      
      {/* Pulse animation */}
      <filter id="pulse" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
      </filter>
    </defs>
  );
};
