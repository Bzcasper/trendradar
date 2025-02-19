
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
              Get Started Free
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
  );
};
