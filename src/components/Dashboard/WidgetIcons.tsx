
import React from 'react';

// Traffic Trends Widget Icon
export const TrafficTrendsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#EBF8FF" stroke="#4263EB" strokeWidth="2"/>
    
    {/* Graph Lines */}
    <path d="M20,150 C50,100 80,120 110,80 C140,60 180,30 180,30" stroke="#4263EB" strokeWidth="3" fill="none"/>
    <path d="M20,150 C60,130 100,140 140,110 C160,90 180,70 180,70" stroke="#F86A6A" strokeWidth="3" fill="none" strokeDasharray="2"/>
    
    {/* Dots */}
    <circle cx="110" cy="80" r="4" fill="#4263EB"/>
    <circle cx="140" cy="110" r="4" fill="#F86A6A"/>
    
    {/* Grid Lines */}
    <line x1="20" y1="40" x2="180" y2="40" stroke="#E2E8F0" strokeWidth="1"/>
    <line x1="20" y1="80" x2="180" y2="80" stroke="#E2E8F0" strokeWidth="1"/>
    <line x1="20" y1="120" x2="180" y2="120" stroke="#E2E8F0" strokeWidth="1"/>
    <line x1="20" y1="160" x2="180" y2="160" stroke="#E2E8F0" strokeWidth="1"/>
    
    {/* Y-axis */}
    <line x1="20" y1="30" x2="20" y2="160" stroke="#CBD5E0" strokeWidth="2"/>
    
    {/* X-axis */}
    <line x1="20" y1="160" x2="180" y2="160" stroke="#CBD5E0" strokeWidth="2"/>
  </svg>
);

// Traffic Sources Widget Icon
export const TrafficSourcesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#FFF5F5" stroke="#F86A6A" strokeWidth="2"/>
    
    {/* Pie Chart */}
    <path d="M100,80 L100,20 A60,60 0 0,1 153,50 Z" fill="#4263EB"/>
    <path d="M100,80 L153,50 A60,60 0 0,1 140,120 Z" fill="#F86A6A"/>
    <path d="M100,80 L140,120 A60,60 0 0,1 70,130 Z" fill="#FF8F3F"/>
    <path d="M100,80 L70,130 A60,60 0 0,1 30,90 Z" fill="#FFC541"/>
    <path d="M100,80 L30,90 A60,60 0 0,1 100,20 Z" fill="#A3AED0"/>
    
    {/* Legend */}
    <rect x="25" y="150" width="12" height="12" fill="#4263EB"/>
    <text x="45" y="160" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A5568">Organic</text>
    
    <rect x="95" y="150" width="12" height="12" fill="#F86A6A"/>
    <text x="115" y="160" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A5568">Social</text>
    
    <rect x="155" y="150" width="12" height="12" fill="#FF8F3F"/>
    <text x="175" y="160" fontFamily="Inter, sans-serif" fontSize="11" fill="#4A5568">Direct</text>
  </svg>
);

// Conversion Funnel Widget Icon
export const ConversionFunnelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#EBF8FF" stroke="#4263EB" strokeWidth="2"/>
    
    {/* Funnel */}
    <path d="M40,30 L160,30 L140,70 L60,70 Z" fill="#4263EB"/>
    <path d="M60,70 L140,70 L120,110 L80,110 Z" fill="#6E8AFA"/>
    <path d="M80,110 L120,110 L110,150 L90,150 Z" fill="#9BABFC"/>
    <path d="M90,150 L110,150 L105,170 L95,170 Z" fill="#BDD0FE"/>
    
    {/* Labels */}
    <text x="100" y="55" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" fill="white">Visitors</text>
    <text x="100" y="95" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle" fill="white">Leads</text>
    <text x="100" y="135" fontFamily="Inter, sans-serif" fontSize="9" textAnchor="middle" fill="white">Qualified</text>
    <text x="100" y="165" fontFamily="Inter, sans-serif" fontSize="8" textAnchor="middle" fill="white">Sales</text>
  </svg>
);

// Platform Performance Widget Icon
export const PlatformPerformanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#F0FFF4" stroke="#48BB78" strokeWidth="2"/>
    
    {/* Horizontal Bar Chart */}
    <rect x="60" y="40" width="120" height="20" fill="#4263EB" rx="2"/>
    <rect x="60" y="70" width="100" height="20" fill="#4263EB" rx="2"/>
    <rect x="60" y="100" width="80" height="20" fill="#4263EB" rx="2"/>
    <rect x="60" y="130" width="50" height="20" fill="#4263EB" rx="2"/>
    
    {/* Y-axis Labels */}
    <text x="55" y="55" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="end" fill="#4A5568">YouTube</text>
    <text x="55" y="85" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="end" fill="#4A5568">TikTok</text>
    <text x="55" y="115" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="end" fill="#4A5568">Twitter</text>
    <text x="55" y="145" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="end" fill="#4A5568">Reddit</text>
  </svg>
);

// Key Metrics Widget Icon
export const KeyMetricsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#EBF8FF" stroke="#4263EB" strokeWidth="2"/>
    
    {/* Metrics Cards */}
    <rect x="20" y="35" width="75" height="60" rx="5" fill="#4263EB" opacity="0.2"/>
    <rect x="105" y="35" width="75" height="60" rx="5" fill="#48BB78" opacity="0.2"/>
    <rect x="20" y="105" width="75" height="60" rx="5" fill="#F86A6A" opacity="0.2"/>
    <rect x="105" y="105" width="75" height="60" rx="5" fill="#F6AD55" opacity="0.2"/>
    
    {/* Metric Values */}
    <text x="57.5" y="65" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#4263EB">1.5M</text>
    <text x="142.5" y="65" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#48BB78">8.2%</text>
    <text x="57.5" y="135" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#F86A6A">4.3%</text>
    <text x="142.5" y="135" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#F6AD55">32%</text>
    
    {/* Metric Labels */}
    <text x="57.5" y="80" fontFamily="Inter, sans-serif" fontSize="8" textAnchor="middle" fill="#4A5568">VIEWS</text>
    <text x="142.5" y="80" fontFamily="Inter, sans-serif" fontSize="8" textAnchor="middle" fill="#4A5568">ENGAGEMENT</text>
    <text x="57.5" y="150" fontFamily="Inter, sans-serif" fontSize="8" textAnchor="middle" fill="#4A5568">CONVERSION</text>
    <text x="142.5" y="150" fontFamily="Inter, sans-serif" fontSize="8" textAnchor="middle" fill="#4A5568">GROWTH</text>
  </svg>
);

// Engagement Radar Widget Icon
export const EngagementRadarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#FEEBC8" stroke="#F6AD55" strokeWidth="2"/>
    
    {/* Radar Chart */}
    <polygon points="100,60 130,80 120,115 80,115 70,80" fill="#8884D8" fillOpacity="0.3" stroke="#8884D8" strokeWidth="1.5"/>
    <polygon points="100,50 140,75 135,120 65,120 60,75" fill="#82CA9D" fillOpacity="0.2" stroke="#82CA9D" strokeWidth="1.5" strokeDasharray="3"/>
    
    {/* Axes */}
    <line x1="100" y1="30" x2="100" y2="150" stroke="#E2E8F0" strokeWidth="1"/>
    <line x1="40" y1="90" x2="160" y2="90" stroke="#E2E8F0" strokeWidth="1"/>
    <line x1="65" y1="50" x2="135" y2="130" stroke="#E2E8F0" strokeWidth="1"/>
    <line x1="65" y1="130" x2="135" y2="50" stroke="#E2E8F0" strokeWidth="1"/>
    
    {/* Points */}
    <circle cx="100" cy="60" r="3" fill="#8884D8"/>
    <circle cx="130" cy="80" r="3" fill="#8884D8"/>
    <circle cx="120" cy="115" r="3" fill="#8884D8"/>
    <circle cx="80" cy="115" r="3" fill="#8884D8"/>
    <circle cx="70" cy="80" r="3" fill="#8884D8"/>
    
    {/* Legend */}
    <rect x="35" y="160" width="10" height="5" fill="#8884D8"/>
    <text x="50" y="165" fontFamily="Inter, sans-serif" fontSize="8" fill="#4A5568">Current</text>
    
    <rect x="95" y="160" width="10" height="5" fill="#82CA9D"/>
    <text x="110" y="165" fontFamily="Inter, sans-serif" fontSize="8" fill="#4A5568">Target</text>
  </svg>
);

// Keyword Cloud Widget Icon
export const KeywordCloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#EDF2F7" stroke="#718096" strokeWidth="2"/>
    
    {/* Word Cloud */}
    <text x="100" y="65" fontFamily="Inter, sans-serif" fontSize="20" textAnchor="middle" fontWeight="bold" fill="#4263EB">Analytics</text>
    <text x="60" y="90" fontFamily="Inter, sans-serif" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#F86A6A">AI</text>
    <text x="150" y="100" fontFamily="Inter, sans-serif" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#48BB78">Content</text>
    <text x="40" y="120" fontFamily="Inter, sans-serif" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#F6AD55">Social</text>
    <text x="110" y="120" fontFamily="Inter, sans-serif" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#A3AED0">Marketing</text>
    <text x="170" y="135" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#9F7AEA">Strategy</text>
    <text x="65" y="140" fontFamily="Inter, sans-serif" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#FF8F3F">Trends</text>
    <text x="130" y="150" fontFamily="Inter, sans-serif" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#2C5282">Performance</text>
  </svg>
);

// Viral Potential Widget Icon
export const ViralPotentialIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#FEF9C3" stroke="#ECC94B" strokeWidth="2"/>
    
    {/* Scatter Plot */}
    <circle cx="45" cy="140" r="5" fill="#8884D8" opacity="0.7"/>
    <circle cx="70" cy="120" r="4" fill="#8884D8" opacity="0.7"/>
    <circle cx="95" cy="90" r="6" fill="#82CA9D" opacity="0.8"/>
    <circle cx="120" cy="70" r="3" fill="#8884D8" opacity="0.7"/>
    <circle cx="140" cy="100" r="4" fill="#8884D8" opacity="0.7"/>
    <circle cx="160" cy="50" r="7" fill="#82CA9D" opacity="0.8"/>
    
    {/* Grid Lines */}
    <line x1="30" y1="40" x2="30" y2="150" stroke="#CBD5E0" strokeWidth="2"/>
    <line x1="30" y1="150" x2="170" y2="150" stroke="#CBD5E0" strokeWidth="2"/>
    
    <line x1="30" y1="130" x2="170" y2="130" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2"/>
    <line x1="30" y1="110" x2="170" y2="110" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2"/>
    <line x1="30" y1="90" x2="170" y2="90" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2"/>
    <line x1="30" y1="70" x2="170" y2="70" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2"/>
    <line x1="30" y1="50" x2="170" y2="50" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2"/>
    
    {/* Trend Line */}
    <path d="M30,130 Q100,110 170,40" stroke="#FF8F3F" strokeWidth="2" fill="none" strokeDasharray="4"/>
  </svg>
);

// Top Performers Widget Icon
export const TopPerformersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <rect x="0" y="0" width="200" height="200" rx="10" fill="#E6FFFA" stroke="#38B2AC" strokeWidth="2"/>
    
    {/* Performance Cards */}
    <rect x="20" y="30" width="160" height="35" rx="5" fill="#38B2AC" opacity="0.2"/>
    <rect x="20" y="75" width="160" height="35" rx="5" fill="#38B2AC" opacity="0.1"/>
    <rect x="20" y="120" width="160" height="35" rx="5" fill="#38B2AC" opacity="0.05"/>
    
    {/* Top Performer Icons */}
    <circle cx="40" cy="47.5" r="10" fill="#38B2AC"/>
    <text x="40" y="51" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle" fill="white">1</text>
    
    <circle cx="40" cy="92.5" r="10" fill="#38B2AC" opacity="0.7"/>
    <text x="40" y="96" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle" fill="white">2</text>
    
    <circle cx="40" cy="137.5" r="10" fill="#38B2AC" opacity="0.5"/>
    <text x="40" y="141" fontFamily="Inter, sans-serif" fontSize="12" textAnchor="middle" fill="white">3</text>
    
    {/* Metrics */}
    <text x="155" y="47.5" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="end" fontWeight="bold" fill="#38B2AC">98.5</text>
    <text x="155" y="92.5" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="end" fontWeight="bold" fill="#38B2AC">85.3</text>
    <text x="155" y="137.5" fontFamily="Inter, sans-serif" fontSize="10" textAnchor="end" fontWeight="bold" fill="#38B2AC">76.7</text>
  </svg>
);
