
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { HeroSection } from "@/components/Home/HeroSection";
import { FeaturesSection } from "@/components/Home/FeaturesSection";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* SVG Background */}
      <svg className="fixed inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A"/>
            <stop offset="80%" stopColor="#1E3A8A"/>
            <stop offset="100%" stopColor="#2B4AA0"/>
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF"/>
            <stop offset="100%" stopColor="#00A3FF"/>
          </linearGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur"/>
            <feFlood floodColor="#00D4FF" floodOpacity="0.2" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur"/>
            <feComposite in="SourceGraphic" in2="coloredBlur" operator="over"/>
          </filter>

          <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00D4FF" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>

        {/* Main Background */}
        <rect width="100%" height="100%" fill="url(#backgroundGradient)"/>
        <rect width="100%" height="100%" fill="url(#gridPattern)"/>

        {/* Data Flow Lines */}
        <g opacity="0.3">
          <path d="M-100,400 C200,350 400,450 600,400 S800,300 1000,350 S1200,450 1440,400" 
                stroke="#00D4FF" strokeWidth="1" fill="none"/>
          <path d="M-50,450 C250,400 450,500 650,450 S850,350 1050,400 S1250,500 1490,450" 
                stroke="#00D4FF" strokeWidth="0.75" fill="none"/>
          <path d="M0,500 C300,450 500,550 700,500 S900,400 1100,450 S1300,550 1540,500" 
                stroke="#00D4FF" strokeWidth="0.5" fill="none"/>
        </g>

        {/* Interactive Visualization */}
        <g transform="translate(950, 400)" filter="url(#glow)">
          <circle cx="0" cy="0" r="220" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.2"/>
          <circle cx="0" cy="0" r="170" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.3"/>
          <circle cx="0" cy="0" r="120" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.4"/>
          <circle cx="0" cy="0" r="70" fill="none" stroke="#00D4FF" strokeWidth="1" opacity="0.5"/>
          
          <line x1="-220" y1="0" x2="220" y2="0" stroke="#00D4FF" strokeWidth="0.75" opacity="0.2"/>
          <line x1="0" y1="-220" x2="0" y2="220" stroke="#00D4FF" strokeWidth="0.75" opacity="0.2"/>
          
          <g>
            <path d="M0,0 L170,0" stroke="url(#accentGradient)" strokeWidth="2" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="6s" repeatCount="indefinite"/>
            </path>
            <circle cx="170" cy="0" r="4" fill="#00D4FF" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="6s" repeatCount="indefinite"/>
            </circle>
          </g>
          
          <circle cx="80" cy="-120" r="5" fill="#00D4FF" opacity="0.9">
            <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-100" cy="50" r="4" fill="#00D4FF" opacity="0.8">
            <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="60" cy="130" r="6" fill="#00D4FF" opacity="0.7">
            <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite"/>
          </circle>
          
          <circle cx="0" cy="0" r="10" fill="#00D4FF"/>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
        </g>
      </svg>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-brand-secondary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
