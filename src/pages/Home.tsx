import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play, Radar, Brain, BarChart2, Bell, PieChart, Devices } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
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
            <stop offset="0%" stopColor="#0A2349"/>
            <stop offset="80%" stopColor="#0D2B5A"/>
            <stop offset="100%" stopColor="#153A72"/>
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#48D1CC"/>
            <stop offset="100%" stopColor="#20B2AA"/>
          </linearGradient>
          
          <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48D1CC"/>
            <stop offset="100%" stopColor="#40E0D0"/>
          </linearGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur"/>
            <feFlood floodColor="#48D1CC" floodOpacity="0.2" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur"/>
            <feComposite in="SourceGraphic" in2="coloredBlur" operator="over"/>
          </filter>

          <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#48D1CC" strokeWidth="0.5" opacity="0.1"/>
          </pattern>
        </defs>

        {/* Main Background */}
        <rect width="100%" height="100%" fill="url(#backgroundGradient)"/>
        <rect width="100%" height="100%" fill="url(#gridPattern)"/>

        {/* Data Flow Lines */}
        <g opacity="0.3">
          <path d="M-100,400 C200,350 400,450 600,400 S800,300 1000,350 S1200,450 1440,400" 
                stroke="#48D1CC" strokeWidth="1" fill="none"/>
          <path d="M-50,450 C250,400 450,500 650,450 S850,350 1050,400 S1250,500 1490,450" 
                stroke="#48D1CC" strokeWidth="0.75" fill="none"/>
          <path d="M0,500 C300,450 500,550 700,500 S900,400 1100,450 S1300,550 1540,500" 
                stroke="#48D1CC" strokeWidth="0.5" fill="none"/>
        </g>

        {/* Radar Visualization */}
        <g transform="translate(950, 400)" filter="url(#glow)">
          <circle cx="0" cy="0" r="220" fill="none" stroke="#48D1CC" strokeWidth="1" opacity="0.2"/>
          <circle cx="0" cy="0" r="170" fill="none" stroke="#48D1CC" strokeWidth="1" opacity="0.3"/>
          <circle cx="0" cy="0" r="120" fill="none" stroke="#48D1CC" strokeWidth="1" opacity="0.4"/>
          <circle cx="0" cy="0" r="70" fill="none" stroke="#48D1CC" strokeWidth="1" opacity="0.5"/>
          
          {/* Grid Lines */}
          <line x1="-220" y1="0" x2="220" y2="0" stroke="#48D1CC" strokeWidth="0.75" opacity="0.2"/>
          <line x1="0" y1="-220" x2="0" y2="220" stroke="#48D1CC" strokeWidth="0.75" opacity="0.2"/>
          
          {/* Radar Sweep */}
          <g>
            <path d="M0,0 L170,0" stroke="url(#accentGradient)" strokeWidth="2" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="6s" repeatCount="indefinite"/>
            </path>
            <circle cx="170" cy="0" r="4" fill="#48D1CC" opacity="0.8">
              <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="6s" repeatCount="indefinite"/>
            </circle>
          </g>
          
          {/* Data Points */}
          <circle cx="80" cy="-120" r="5" fill="#48D1CC" opacity="0.9">
            <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx="-100" cy="50" r="4" fill="#48D1CC" opacity="0.8">
            <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="60" cy="130" r="6" fill="#48D1CC" opacity="0.7">
            <animate attributeName="r" values="6;8;6" dur="3s" repeatCount="indefinite"/>
          </circle>
          
          {/* Central Point */}
          <circle cx="0" cy="0" r="10" fill="#48D1CC"/>
          <circle cx="0" cy="0" r="5" fill="#FFFFFF"/>
        </g>
      </svg>

      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#48D1CC] z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0A2349]/90 backdrop-blur-sm z-40 border-b border-[#48D1CC]/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <circle cx="24" cy="24" r="24" className="fill-none stroke-[#48D1CC] stroke-2"/>
                <path d="M24,8 A16,16 0 0 1 40,24 L24,24 Z" className="fill-[#48D1CC]"/>
              </div>
              <span className="text-white font-gilroy text-xl font-bold">
                trend<span className="text-[#48D1CC]">radar</span>.ai
              </span>
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/features" className="text-white/80 hover:text-[#48D1CC] transition-colors">Features</a>
              <a href="/how-it-works" className="text-white/80 hover:text-[#48D1CC] transition-colors">How It Works</a>
              <a href="/pricing" className="text-white/80 hover:text-[#48D1CC] transition-colors">Pricing</a>
              <a href="/resources" className="text-white/80 hover:text-[#48D1CC] transition-colors">Resources</a>
              <a href="/contact" className="text-white/80 hover:text-[#48D1CC] transition-colors">Contact</a>
              
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="text-white hover:text-[#48D1CC] hover:bg-[#48D1CC]/10"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] shadow-lg shadow-[#48D1CC]/20"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 pt-32 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="font-gilroy text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight animate-fade-up">
              Predict Trends<br/>Before They Emerge
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl animate-fade-up delay-100">
              Leverage AI-powered analytics to identify emerging trends and make data-driven content decisions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-up delay-200">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] shadow-lg shadow-[#48D1CC]/20 text-lg h-[60px] px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/demo')}
                className="border-2 border-white text-white hover:bg-white/10 text-lg h-[60px] px-8"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Section */}
            <div className="mt-24 animate-fade-up delay-300">
              <p className="text-white/60 text-sm mb-6 uppercase tracking-wider">Trusted by leading brands</p>
              <div className="flex flex-wrap gap-4">
                <div className="w-28 h-[35px] bg-white/10 rounded"></div>
                <div className="w-28 h-[35px] bg-white/10 rounded"></div>
                <div className="w-28 h-[35px] bg-white/10 rounded"></div>
                <div className="w-28 h-[35px] bg-white/10 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A2349] to-[#153A72]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.7' fill='%2348D1CC' opacity='0.2'/%3E%3C/svg%3E")`,
          }}/>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-up">
            <h3 className="text-[#48D1CC] font-semibold text-lg tracking-wider uppercase mb-4">
              Powerful Capabilities
            </h3>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Key Features of TrendRadar.ai
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              Our platform combines advanced AI with intuitive design to deliver actionable trend insights that keep you ahead of the competition.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Real-Time Trend Monitoring */}
            <div className="feature-card">
              <div className="icon-wrapper">
                <Radar className="feature-icon" />
              </div>
              <h3 className="feature-title">Real-Time Trend Monitoring</h3>
              <p className="feature-description">
                Detect emerging topics across social media, news sites, and blogs in real-time with our continuous scanning technology.
              </p>
              <div className="feature-tag">Never Miss a Trend</div>
            </div>

            {/* Feature 2: AI-Powered Analytics */}
            <div className="feature-card">
              <div className="icon-wrapper">
                <Brain className="feature-icon" />
              </div>
              <h3 className="feature-title">AI-Powered Analytics</h3>
              <p className="feature-description">
                Advanced machine learning algorithms analyze patterns and predict which trends will gain significant traction.
              </p>
              <div className="feature-tag">90% Prediction Accuracy</div>
            </div>

            {/* Feature 3: Competitive Benchmarking */}
            <div className="feature-card">
              <div className="icon-wrapper">
                <BarChart2 className="feature-icon" />
              </div>
              <h3 className="feature-title">Competitive Benchmarking</h3>
              <p className="feature-description">
                Compare your content performance against competitors and identify strategic opportunities in your market niche.
              </p>
              <div className="feature-tag">Strategic Advantage</div>
            </div>

            {/* Feature 4: Custom Alerts */}
            <div className="feature-card">
              <div className="icon-wrapper">
                <Bell className="feature-icon" />
              </div>
              <h3 className="feature-title">Custom Alerts</h3>
              <p className="feature-description">
                Get notified immediately when relevant trends emerge in your industry with customizable real-time alerts.
              </p>
              <div className="feature-tag">Real-Time Notifications</div>
            </div>

            {/* Feature 5: Interactive Visualizations */}
            <div className="feature-card">
              <div className="icon-wrapper">
                <PieChart className="feature-icon" />
              </div>
              <h3 className="feature-title">Interactive Visualizations</h3>
              <p className="feature-description">
                Explore trend data through intuitive, interactive charts and heatmaps for deeper insights and pattern recognition.
              </p>
              <div className="feature-tag">Visual Data Exploration</div>
            </div>

            {/* Feature 6: Cross-Platform Tracking */}
            <div className="feature-card">
              <div className="icon-wrapper">
                <Devices className="feature-icon" />
              </div>
              <h3 className="feature-title">Cross-Platform Tracking</h3>
              <p className="feature-description">
                Analyze trends across social media, search engines, news outlets, and forums from a single, unified dashboard.
              </p>
              <div className="feature-tag">Comprehensive Coverage</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-32 text-center">
            <div className="bg-white/5 rounded-3xl p-16 backdrop-blur-sm">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
                Ready to stay ahead of the competition?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Start identifying emerging trends before they peak
              </p>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] shadow-lg shadow-[#48D1CC]/20 text-lg h-[60px] px-8"
              >
                Start Your Free 14-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
