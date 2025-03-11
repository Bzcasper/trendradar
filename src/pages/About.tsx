
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Award, Target, Globe } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2349] to-[#0F2D5E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-white hover:text-[#48D1CC]"
        >
          ← Back
        </Button>
        
        <h1 className="text-4xl font-bold mb-12">About trendradar.ai</h1>
        
        <div className="space-y-12">
          <section className="bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20">
            <h2 className="text-2xl font-semibold mb-6 text-[#48D1CC]">Our Story</h2>
            <p className="text-white/90 mb-6 leading-relaxed">
              At trendradar.ai, we're passionate about empowering YouTube creators with cutting-edge AI technology. 
              Founded in 2023 by a team of data scientists and content creators, we set out to solve a common 
              problem: how to predict content trends before they happen.
            </p>
            <p className="text-white/90 leading-relaxed">
              After years of research and development, we created a proprietary algorithm that analyzes millions 
              of data points across YouTube to identify emerging trends and predict viewer behavior with remarkable 
              accuracy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-8 text-[#48D1CC]">Our Mission</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20 flex-1">
                <Target className="mb-4 text-[#48D1CC]" size={32} />
                <h3 className="text-xl font-medium mb-3">Democratize Analytics</h3>
                <p className="text-white/80">Our mission is to democratize access to advanced analytics and content optimization tools, making it easier for creators of all sizes to succeed on YouTube.</p>
              </div>
              
              <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20 flex-1">
                <Globe className="mb-4 text-[#48D1CC]" size={32} />
                <h3 className="text-xl font-medium mb-3">Empower Creators</h3>
                <p className="text-white/80">We believe in empowering creators with data-driven insights that help them create content that resonates with their audience and grows their channel.</p>
              </div>
            </div>
          </section>
          
          <section className="bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20">
            <h2 className="text-2xl font-semibold mb-6 text-[#48D1CC] flex items-center">
              <Users className="mr-3" size={24} /> 
              Our Team
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              We're a diverse team of data scientists, engineers, and content creators working together 
              to build the future of content analytics. With backgrounds ranging from AI research to 
              successful YouTube channels, our team brings a unique perspective to the challenges of 
              content creation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-[#48D1CC]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="text-[#48D1CC]" size={36} />
                </div>
                <h4 className="font-semibold">Data Science Team</h4>
                <p className="text-white/70 text-sm">Building advanced algorithms</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-[#48D1CC]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="text-[#48D1CC]" size={36} />
                </div>
                <h4 className="font-semibold">Engineering Team</h4>
                <p className="text-white/70 text-sm">Creating seamless experiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-[#48D1CC]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="text-[#48D1CC]" size={36} />
                </div>
                <h4 className="font-semibold">Creator Success Team</h4>
                <p className="text-white/70 text-sm">Supporting your growth</p>
              </div>
            </div>
          </section>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] text-lg px-8 py-6 h-auto"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
