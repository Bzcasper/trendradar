
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Radar, Brain, BarChart2, Bell, PieChart, Monitor } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Radar,
      title: "Real-Time Trend Monitoring",
      description: "Detect emerging topics across social media, news sites, and blogs in real-time with our continuous scanning technology.",
      tag: "Never Miss a Trend"
    },
    {
      icon: Brain,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze patterns and predict which trends will gain significant traction.",
      tag: "90% Prediction Accuracy"
    },
    {
      icon: BarChart2,
      title: "Competitive Benchmarking",
      description: "Compare your content performance against competitors and identify strategic opportunities in your market niche.",
      tag: "Strategic Advantage"
    },
    {
      icon: Bell,
      title: "Custom Alerts",
      description: "Get notified immediately when relevant trends emerge in your industry with customizable real-time alerts.",
      tag: "Real-Time Notifications"
    },
    {
      icon: PieChart,
      title: "Interactive Visualizations",
      description: "Explore trend data through intuitive, interactive charts and heatmaps for deeper insights and pattern recognition.",
      tag: "Visual Data Exploration"
    },
    {
      icon: Monitor,
      title: "Cross-Platform Tracking",
      description: "Analyze trends across social media, search engines, news outlets, and forums from a single, unified dashboard.",
      tag: "Comprehensive Coverage"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2349] to-[#153A72]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='0.7' fill='%2348D1CC' opacity='0.2'/%3E%3C/svg%3E")`,
        }}/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

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
  );
};
