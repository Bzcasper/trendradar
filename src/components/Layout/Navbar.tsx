
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};
