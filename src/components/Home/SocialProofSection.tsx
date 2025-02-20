
import { Users, BarChart2, Target, Globe2 } from "lucide-react";

export const SocialProofSection = () => {
  const metrics = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Marketers",
      description: "leveraging TrendRadar.ai"
    },
    {
      icon: Target,
      value: "90%",
      label: "Predictive Accuracy",
      description: "in trend forecasting"
    },
    {
      icon: BarChart2,
      value: "3x",
      label: "Engagement Rate",
      description: "increase for our users"
    },
    {
      icon: Globe2,
      value: "1M+",
      label: "Content Sources",
      description: "tracked daily worldwide"
    }
  ];

  const testimonials = [
    {
      quote: "TrendRadar.ai revolutionized our content strategy—now we anticipate trends before they peak.",
      author: "Marketing Director",
      company: "XYZ Corp"
    },
    {
      quote: "Our engagement increased by 300% thanks to AI-powered insights.",
      author: "Social Media Manager",
      company: "ABC Agency"
    },
    {
      quote: "The AI forecasting helped us refine our editorial calendar for better engagement.",
      author: "Head of Content",
      company: "DEF Publishing"
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-brand-secondary/20 hover:border-brand-secondary/40 transition-all duration-300"
            >
              <metric.icon className="w-10 h-10 text-brand-secondary mb-4" />
              <div className="font-inter font-bold text-4xl text-white mb-2">
                {metric.value}
              </div>
              <div className="text-white/80 font-semibold mb-1">
                {metric.label}
              </div>
              <div className="text-white/60 text-sm">
                {metric.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            See how TrendRadar.ai is transforming content strategy for businesses worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-brand-secondary/20"
            >
              <div className="text-brand-secondary mb-6">"</div>
              <blockquote className="text-white/90 text-lg mb-6">
                {testimonial.quote}
              </blockquote>
              <div className="text-white font-semibold">
                {testimonial.author}
              </div>
              <div className="text-white/60 text-sm">
                {testimonial.company}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-24">
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm uppercase tracking-wider">
              Powering Content Strategy for Leading Brands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-lg h-16 flex items-center justify-center border border-brand-secondary/20"
              >
                <div className="w-24 h-8 bg-white/10 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
