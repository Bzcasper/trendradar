
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Zap, Network, ThumbsUp, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll progress for analytics
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "TechInsights",
      quote: "Lovable.dev transformed our content strategy. We've seen a 40% increase in engagement.",
      metrics: "+40% Engagement",
    },
    {
      name: "Michael Chen",
      role: "Head of Marketing",
      company: "GrowthLabs",
      quote: "The trend predictions are incredibly accurate. It's like having a crystal ball for content.",
      metrics: "+65% View Duration",
    },
    {
      name: "Emily Roberts",
      role: "YouTube Creator",
      company: "TechReviews",
      quote: "Finally, analytics that make sense! Our channel growth has been exponential.",
      metrics: "2x Subscriber Growth",
    },
  ];

  return (
    <div className="min-h-screen bg-primary-ultra-light">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary-mid z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary-dark z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-white font-gilroy text-xl font-bold">
              lovable.dev
            </a>
            <div className="hidden md:flex space-x-8">
              <a href="/features" className="text-white hover:text-primary-light transition-colors">Features</a>
              <a href="/pricing" className="text-white hover:text-primary-light transition-colors">Pricing</a>
              <a href="/about" className="text-white hover:text-primary-light transition-colors">About</a>
              <Button 
                onClick={() => navigate('/auth')}
                className="bg-white text-primary-dark hover:bg-primary-light transition-all duration-200"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 bg-gradient-to-bl from-primary-dark to-primary-light">
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="font-gilroy text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-up tracking-tight">
            Navigate Tomorrow's Trends Today
          </h1>
          <p className="font-inter text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Crystal-clear insights that transform content strategy
          </p>
          <div className="space-x-4">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-white text-primary-dark hover:bg-primary-light hover:scale-105 transform transition-all duration-200 border-2 border-white"
            >
              Discover Your Content Potential
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white hover:bg-white/10 transition-all duration-200"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-primary-ultra-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-gilroy text-4xl font-semibold text-primary-dark mb-4 tracking-tight">
              Transform Complexity into Clarity
            </h2>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
              Most analytics platforms overwhelm with data but underwhelm with insights. 
              We transform complexity into clarity with actionable trend intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Identify trends as they emerge, not after they peak.",
                detail: "15-minute refresh cycle ensures timely insights"
              },
              {
                icon: Zap,
                title: "Insight Translation",
                description: "Receive clear implementation recommendations alongside raw data.",
                detail: "ML-powered analysis converts metrics to strategy"
              },
              {
                icon: Network,
                title: "Cross-Platform Correlation",
                description: "Understand how trends connect across different content channels.",
                detail: "Proprietary algorithm identifies pattern relationships"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-white rounded-lg p-8 shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary-mid" />
                </div>
                <h3 className="font-gilroy text-xl font-medium text-primary-dark mb-3">
                  {feature.title}
                </h3>
                <p className="font-inter text-gray-600 mb-4">
                  {feature.description}
                </p>
                <p className="font-inter text-sm text-primary-mid">
                  {feature.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-gilroy text-4xl font-semibold text-primary-dark text-center mb-16 tracking-tight">
            Trusted by Content Leaders
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-3xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute top-0 left-0 w-full transition-all duration-500 ease-out",
                    index === activeTestimonial
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  )}
                >
                  <div className="bg-primary-ultra-light rounded-lg p-8 shadow-card text-center">
                    <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
                      <ThumbsUp className="h-6 w-6 text-primary-mid" />
                    </div>
                    <p className="font-inter text-lg text-gray-700 mb-6">{testimonial.quote}</p>
                    <div className="font-gilroy font-medium text-primary-dark">{testimonial.name}</div>
                    <div className="font-inter text-sm text-gray-600">{testimonial.role}</div>
                    <div className="font-inter text-sm text-primary-mid mt-2">{testimonial.metrics}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    index === activeTestimonial
                      ? "w-8 bg-primary-mid"
                      : "w-2 bg-primary-light hover:bg-primary-mid"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-dark to-primary-mid text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-gilroy text-4xl font-semibold mb-8 tracking-tight">
            Begin Your Trend Journey
          </h2>
          <p className="font-inter text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of content creators who are already staying ahead of the curve
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-primary-dark hover:bg-primary-light hover:scale-105 transform transition-all duration-200"
          >
            Start Free Analysis
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-gilroy text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 font-inter">
                <li><a href="/features" className="opacity-75 hover:opacity-100 transition-opacity">Features</a></li>
                <li><a href="/pricing" className="opacity-75 hover:opacity-100 transition-opacity">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-gilroy text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 font-inter">
                <li><a href="/about" className="opacity-75 hover:opacity-100 transition-opacity">About</a></li>
                <li><a href="/contact" className="opacity-75 hover:opacity-100 transition-opacity">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-gilroy text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 font-inter">
                <li><a href="/privacy" className="opacity-75 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
                <li><a href="/terms" className="opacity-75 hover:opacity-100 transition-opacity">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-center font-inter opacity-75">
              &copy; {new Date().getFullYear()} lovable.dev. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
