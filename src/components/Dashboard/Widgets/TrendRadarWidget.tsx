
import React from 'react';

export const TrendRadarWidget = () => {
  return (
    <div className="h-[400px] w-full overflow-hidden relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full h-full">
        <defs>
          {/* Background gradient */}
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          
          {/* Radar Area Gradients */}
          <linearGradient id="currentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4338ca" stopOpacity="0.1" />
          </linearGradient>
          
          <linearGradient id="targetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Grid line pattern */}
          <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        
        {/* Background */}
        <rect width="800" height="600" fill="url(#bgGradient)" />
        <rect width="800" height="600" fill="url(#grid)" />
        
        {/* Title */}
        <text x="50" y="50" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff">Trend Analysis Radar</text>
        <text x="50" y="80" fontFamily="Arial, sans-serif" fontSize="16" fill="#94a3b8">Comparing current metrics with targets</text>
        
        {/* Radar Chart */}
        <g transform="translate(400, 320)">
          {/* Radar Rings */}
          <circle cx="0" cy="0" r="50" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          <circle cx="0" cy="0" r="100" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          <circle cx="0" cy="0" r="150" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          <circle cx="0" cy="0" r="200" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          
          {/* Axis Lines */}
          <line x1="0" y1="-210" x2="0" y2="210" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          <line x1="-210" y1="0" x2="210" y2="0" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          <line x1="-148.49" y1="-148.49" x2="148.49" y2="148.49" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          <line x1="148.49" y1="-148.49" x2="-148.49" y2="148.49" stroke="#ffffff" strokeWidth="1" opacity="0.1" />
          <line x1="0" y1="-200" x2="0" y2="-210" stroke="#ffffff" strokeWidth="2" />
          <line x1="0" y1="200" x2="0" y2="210" stroke="#ffffff" strokeWidth="2" />
          <line x1="-200" y1="0" x2="-210" y2="0" stroke="#ffffff" strokeWidth="2" />
          <line x1="200" y1="0" x2="210" y2="0" stroke="#ffffff" strokeWidth="2" />
          
          {/* Axis Labels */}
          <text x="0" y="-220" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="middle">Engagement</text>
          <text x="0" y="235" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="middle">Conversion</text>
          <text x="-220" y="0" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="end" dominantBaseline="middle">Reach</text>
          <text x="220" y="0" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="start" dominantBaseline="middle">Retention</text>
          <text x="-155" y="-155" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="end" dominantBaseline="middle">Growth</text>
          <text x="155" y="-155" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="start" dominantBaseline="middle">Revenue</text>
          <text x="-155" y="155" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="end" dominantBaseline="middle">Traffic</text>
          <text x="155" y="155" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff" textAnchor="start" dominantBaseline="middle">Virality</text>
          
          {/* Values Labels */}
          <text x="0" y="-205" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">100%</text>
          <text x="0" y="-155" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">75%</text>
          <text x="0" y="-105" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">50%</text>
          <text x="0" y="-55" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8" textAnchor="middle">25%</text>
          
          {/* Target Metrics (Polygon) */}
          <polygon 
            points="0,-180 155.88,-90 155.88,90 0,180 -155.88,90 -155.88,-90" 
            fill="url(#targetGradient)" 
            stroke="#0ea5e9" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            opacity="0.5" />
          
          {/* Current Metrics (Polygon) */}
          <polygon 
            points="0,-130 112.58,-65 112.58,65 0,155 -129.9,75 -77.94,-45" 
            fill="url(#currentGradient)" 
            stroke="#4338ca" 
            strokeWidth="3" 
            filter="url(#glow)" />
          
          {/* Data Points (Current) */}
          <circle cx="0" cy="-130" r="6" fill="#4338ca" />
          <circle cx="112.58" cy="-65" r="6" fill="#4338ca" />
          <circle cx="112.58" cy="65" r="6" fill="#4338ca" />
          <circle cx="0" cy="155" r="6" fill="#4338ca" />
          <circle cx="-129.9" cy="75" r="6" fill="#4338ca" />
          <circle cx="-77.94" cy="-45" r="6" fill="#4338ca" />
          
          {/* Animated Pulse on Peak Points */}
          <circle cx="0" cy="-130" r="8" fill="none" stroke="#4338ca" strokeWidth="2">
            <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
          </circle>
          
          <circle cx="-129.9" cy="75" r="8" fill="none" stroke="#4338ca" strokeWidth="2">
            <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" begin="0.7s" />
            <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" begin="0.7s" />
          </circle>
        </g>
        
        {/* Legend */}
        <g transform="translate(50, 520)">
          <rect x="0" y="0" width="16" height="16" fill="url(#currentGradient)" stroke="#4338ca" strokeWidth="2" />
          <text x="30" y="13" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff">Current</text>
          
          <rect x="120" y="0" width="16" height="16" fill="url(#targetGradient)" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
          <text x="150" y="13" fontFamily="Arial, sans-serif" fontSize="14" fill="#ffffff">Target</text>
        </g>
        
        {/* KPI Cards */}
        <g transform="translate(550, 150)">
          <rect x="0" y="0" width="200" height="70" rx="5" fill="#1e293b" stroke="#4338ca" strokeWidth="2" />
          <text x="15" y="25" fontFamily="Arial, sans-serif" fontSize="14" fill="#94a3b8">ENGAGEMENT SCORE</text>
          <text x="15" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff">65%</text>
          <text x="85" y="55" fontFamily="Arial, sans-serif" fontSize="16" fill="#10b981">+12%</text>
        </g>
        
        <g transform="translate(550, 240)">
          <rect x="0" y="0" width="200" height="70" rx="5" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
          <text x="15" y="25" fontFamily="Arial, sans-serif" fontSize="14" fill="#94a3b8">CONVERSION RATE</text>
          <text x="15" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff">77.5%</text>
          <text x="110" y="55" fontFamily="Arial, sans-serif" fontSize="16" fill="#ef4444">-3.2%</text>
        </g>
        
        <g transform="translate(550, 330)">
          <rect x="0" y="0" width="200" height="70" rx="5" fill="#1e293b" stroke="#4f46e5" strokeWidth="2" />
          <text x="15" y="25" fontFamily="Arial, sans-serif" fontSize="14" fill="#94a3b8">GROWTH INDEX</text>
          <text x="15" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff">84.1%</text>
          <text x="100" y="55" fontFamily="Arial, sans-serif" fontSize="16" fill="#10b981">+5.7%</text>
        </g>
      </svg>
    </div>
  );
};
