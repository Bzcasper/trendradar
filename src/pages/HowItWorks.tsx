
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Link, 
  TrendingUp, 
  BarChart, 
  Zap, 
  DollarSign,
  Youtube, 
  Search,
  PieChart,
  MessageSquare
} from "lucide-react";

export default function HowItWorks() {
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
        
        <h1 className="text-4xl font-bold mb-4 text-center">How trendradar.ai Works</h1>
        <p className="text-white/80 text-lg text-center mb-16 max-w-3xl mx-auto">
          Our AI-powered platform analyzes millions of data points to help you create content that resonates with your audience and grows your channel.
        </p>
        
        <div className="space-y-24">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#48D1CC]/20 p-3 rounded-lg mb-4">
                <Youtube className="text-[#48D1CC]" size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-6">1. Connect Your Channel</h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Simply connect your YouTube channel to get started. We'll securely access your channel's 
                analytics through YouTube's official API. This gives us the data we need to provide 
                personalized insights without compromising your account security.
              </p>
              <div className="bg-[#0A2349]/70 backdrop-blur-sm p-4 rounded-lg border border-[#48D1CC]/20">
                <h3 className="font-medium text-[#48D1CC] mb-2">Security First</h3>
                <p className="text-white/80 text-sm">
                  We never store your YouTube credentials and only request read-only access to your analytics. Your data is encrypted and secure.
                </p>
              </div>
            </div>
            <div className="bg-[#0A2349]/40 border border-[#48D1CC]/20 rounded-lg p-8 shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#48D1CC]/10 rounded-full"></div>
              <div className="absolute right-20 bottom-20 w-20 h-20 bg-[#48D1CC]/10 rounded-full"></div>
              <div className="relative z-10">
                <div className="w-full h-12 bg-[#0A2349]/60 rounded-t-lg mb-4 flex items-center px-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center mb-4">
                    <Youtube className="text-[#48D1CC] mr-3" size={24} />
                    <span className="text-lg font-medium">Connect YouTube Channel</span>
                  </div>
                  <div className="w-full h-10 bg-[#0A2349]/60 rounded flex items-center px-4">
                    <span className="text-white/60">Select your channel</span>
                  </div>
                  <Button className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] w-full hover:from-[#40E0D0] hover:to-[#48D1CC]">
                    Authorize Access
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-[#0A2349]/40 border border-[#48D1CC]/20 rounded-lg p-8 shadow-lg relative overflow-hidden">
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#48D1CC]/10 rounded-full"></div>
                <div className="absolute left-20 bottom-20 w-20 h-20 bg-[#48D1CC]/10 rounded-full"></div>
                <div className="relative z-10 space-y-4">
                  <div className="w-full h-48 bg-[#0A2349]/60 rounded flex items-center justify-center">
                    <BarChart className="text-[#48D1CC] opacity-50" size={64} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0A2349]/60 rounded p-3">
                      <div className="text-xs text-white/60 mb-1">View Velocity</div>
                      <div className="text-lg text-[#48D1CC] font-medium">+23.4%</div>
                    </div>
                    <div className="bg-[#0A2349]/60 rounded p-3">
                      <div className="text-xs text-white/60 mb-1">Engagement Rate</div>
                      <div className="text-lg text-[#48D1CC] font-medium">18.7%</div>
                    </div>
                    <div className="bg-[#0A2349]/60 rounded p-3">
                      <div className="text-xs text-white/60 mb-1">Trend Score</div>
                      <div className="text-lg text-[#48D1CC] font-medium">72.5</div>
                    </div>
                    <div className="bg-[#0A2349]/60 rounded p-3">
                      <div className="text-xs text-white/60 mb-1">Growth Rate</div>
                      <div className="text-lg text-[#48D1CC] font-medium">+15.2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-[#48D1CC]/20 p-3 rounded-lg mb-4">
                <Search className="text-[#48D1CC]" size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-6">2. AI Analysis</h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Our AI algorithms analyze your content, audience behavior, and engagement patterns to 
                identify trends and opportunities. We process millions of data points to uncover actionable 
                insights that would be impossible to discover manually.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <TrendingUp className="text-[#48D1CC] mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Trend Detection</h3>
                    <p className="text-white/70 text-sm">Our algorithms identify emerging trends in your niche before they go mainstream.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PieChart className="text-[#48D1CC] mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Performance Analysis</h3>
                    <p className="text-white/70 text-sm">We analyze what's working and what's not across your content library.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MessageSquare className="text-[#48D1CC] mr-3 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium">Audience Understanding</h3>
                    <p className="text-white/70 text-sm">Gain deeper insights into your audience preferences and behaviors.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#48D1CC]/20 p-3 rounded-lg mb-4">
                <Zap className="text-[#48D1CC]" size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-6">3. Get Actionable Insights</h2>
              <p className="text-white/90 mb-6 leading-relaxed">
                Receive detailed insights and actionable recommendations to improve your content and 
                grow your channel. Our platform translates complex data into clear, practical steps 
                you can take immediately.
              </p>
              <div className="bg-[#0A2349]/70 backdrop-blur-sm p-4 rounded-lg border border-[#48D1CC]/20 mb-6">
                <h3 className="font-medium text-[#48D1CC] mb-2">Real Results</h3>
                <p className="text-white/80 text-sm">
                  Creators using trendradar.ai see an average 32% increase in views and 27% growth in subscriber count within 3 months.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC]"
              >
                <DollarSign size={16} className="mr-1" /> See Pricing Plans
              </Button>
            </div>
            <div className="bg-[#0A2349]/40 border border-[#48D1CC]/20 rounded-lg p-8 shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#48D1CC]/10 rounded-full"></div>
              <div className="absolute right-20 bottom-20 w-20 h-20 bg-[#48D1CC]/10 rounded-full"></div>
              <div className="relative z-10 space-y-4">
                <div className="bg-[#0A2349]/60 p-4 rounded">
                  <h3 className="text-[#48D1CC] font-medium mb-2">Recommended Topics</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      AI tools for video editing (Trending Up)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      Budget-friendly camera setups (High Demand)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      Mobile filmmaking techniques (Steady)
                    </li>
                  </ul>
                </div>
                <div className="bg-[#0A2349]/60 p-4 rounded">
                  <h3 className="text-[#48D1CC] font-medium mb-2">Content Optimization</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#48D1CC] rounded-full mr-2 mt-1.5"></div>
                      Include "beginner friendly" in titles for higher CTR
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#48D1CC] rounded-full mr-2 mt-1.5"></div>
                      Create videos between 8-12 minutes for optimal retention
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to grow your YouTube channel?</h2>
          <p className="text-white/80 mb-8 text-lg">Join thousands of creators who are using trendradar.ai to find their next viral video idea.</p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] text-lg px-8 py-6 h-auto"
          >
            Get Started Free
          </Button>
          <p className="text-white/60 mt-4 text-sm">No credit card required • 14-day free trial</p>
        </div>
      </div>
    </div>
  );
}
