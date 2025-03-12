
import React from 'react';

export const TrendPerformanceChart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" className="w-full h-full">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        
        <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <clipPath id="waveClip">
          <path d="M0,300 C100,250 200,350 300,200 C400,50 500,100 600,150 C700,200 800,100 800,100 L800,400 L0,400 Z" />
        </clipPath>
      </defs>
      
      <rect width="800" height="400" fill="url(#bgGradient)" />
      
      <g opacity="0.1" stroke="#fff">
        <line x1="0" y1="100" x2="800" y2="100" strokeWidth="1" />
        <line x1="0" y1="200" x2="800" y2="200" strokeWidth="1" />
        <line x1="0" y1="300" x2="800" y2="300" strokeWidth="1" />
        
        <line x1="100" y1="0" x2="100" y2="400" strokeWidth="1" />
        <line x1="200" y1="0" x2="200" y2="400" strokeWidth="1" />
        <line x1="300" y1="0" x2="300" y2="400" strokeWidth="1" />
        <line x1="400" y1="0" x2="400" y2="400" strokeWidth="1" />
        <line x1="500" y1="0" x2="500" y2="400" strokeWidth="1" />
        <line x1="600" y1="0" x2="600" y2="400" strokeWidth="1" />
        <line x1="700" y1="0" x2="700" y2="400" strokeWidth="1" />
      </g>
      
      <g clipPath="url(#waveClip)">
        <rect x="0" y="0" width="800" height="400" fill="url(#waveGradient)" />
      </g>
      
      <path 
        d="M0,300 C100,250 200,350 300,200 C400,50 500,100 600,150 C700,200 800,100 800,100" 
        fill="none" 
        stroke="url(#trendGradient)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        filter="url(#glow)" 
      />
      
      <circle cx="0" cy="300" r="6" fill="#3b82f6" />
      <circle cx="100" cy="250" r="6" fill="#4f46e5" />
      <circle cx="200" cy="350" r="6" fill="#8b5cf6" />
      <circle cx="300" cy="200" r="6" fill="#a855f7" />
      <circle cx="400" cy="50" r="6" fill="#d946ef" />
      <circle cx="500" cy="100" r="6" fill="#ec4899" />
      <circle cx="600" cy="150" r="6" fill="#f43f5e" />
      <circle cx="700" cy="200" r="6" fill="#f43f5e" />
      <circle cx="800" cy="100" r="6" fill="#f43f5e" />
      
      <circle cx="400" cy="50" r="10" fill="none" stroke="#d946ef" strokeWidth="2" opacity="0.8">
        <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="800" cy="100" r="10" fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.8">
        <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" begin="0.5s" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" begin="0.5s" />
      </circle>
      
      <text x="20" y="30" fill="#fff" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">Trend Performance</text>
      <text x="20" y="55" fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="14">Real-time performance metrics</text>
      
      <g transform="translate(400, 25)">
        <text x="0" y="0" fill="#d946ef" fontFamily="Arial, sans-serif" fontSize="14" textAnchor="middle">Peak</text>
        <line x1="0" y1="5" x2="0" y2="15" stroke="#d946ef" strokeWidth="2" strokeDasharray="2" />
      </g>
      
      <g transform="translate(750, 120)">
        <text x="0" y="0" fill="#f43f5e" fontFamily="Arial, sans-serif" fontSize="14" textAnchor="end">+48.2%</text>
        <path d="M-50,-15 L-40,-25 L-30,-15" fill="none" stroke="#f43f5e" strokeWidth="2" />
      </g>
      
      <g fill="#a1a1aa" fontFamily="Arial, sans-serif" fontSize="12">
        <text x="0" y="380" textAnchor="middle">Jan</text>
        <text x="100" y="380" textAnchor="middle">Feb</text>
        <text x="200" y="380" textAnchor="middle">Mar</text>
        <text x="300" y="380" textAnchor="middle">Apr</text>
        <text x="400" y="380" textAnchor="middle">May</text>
        <text x="500" y="380" textAnchor="middle">Jun</text>
        <text x="600" y="380" textAnchor="middle">Jul</text>
        <text x="700" y="380" textAnchor="middle">Aug</text>
        <text x="800" y="380" textAnchor="middle">Sep</text>
      </g>
    </svg>
  );
};
