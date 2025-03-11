
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoadingLogo } from "@/components/ui/loading-logo";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  return (
    <nav className="fixed top-0 w-full bg-[#0A2349]/90 backdrop-blur-sm z-40 border-b border-[#48D1CC]/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <LoadingLogo size="sm" />
            <span className="text-white font-gilroy text-xl font-bold">
              trend<span className="text-[#48D1CC]">radar</span>.ai
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-white/80 hover:text-[#48D1CC] transition-colors">Features</Link>
            <Link to="/how-it-works" className="text-white/80 hover:text-[#48D1CC] transition-colors">How It Works</Link>
            <Link to="/pricing" className="text-white/80 hover:text-[#48D1CC] transition-colors">Pricing</Link>
            <Link to="/resources" className="text-white/80 hover:text-[#48D1CC] transition-colors">Resources</Link>
            <Link to="/contact" className="text-white/80 hover:text-[#48D1CC] transition-colors">Contact</Link>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button 
                    variant="ghost"
                    onClick={() => navigate('/dashboard')}
                    className="text-white hover:text-[#48D1CC] hover:bg-[#48D1CC]/10"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    onClick={() => signOut()}
                    className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] shadow-lg shadow-[#48D1CC]/20"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost"
                    onClick={() => navigate('/auth')}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
