
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, Zap, Network, ThumbsUp } from "lucide-react";
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
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#001F3F] to-[#1ABC9C] bg-opacity-15 text-white px-4">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
            Navigate Tomorrow's Trends Today
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Crystal-clear insights that transform content strategy
          </p>
          <div className="space-x-4">
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-[#1ABC9C] hover:bg-[#1ABC9C]/90 border-2 border-white"
            >
              Discover Your Content Potential
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/contact')}
              className="border-2 text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Complexity into Clarity
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Most analytics platforms overwhelm with data but underwhelm with insights. 
              We transform complexity into clarity with actionable trend intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
              <p className="text-gray-600">Identify trends as they emerge, not after they peak.</p>
              <p className="text-sm text-gray-500 mt-2">15-minute refresh cycle ensures timely insights</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Insight Translation</h3>
              <p className="text-gray-600">Receive clear implementation recommendations alongside raw data.</p>
              <p className="text-sm text-gray-500 mt-2">ML-powered analysis converts metrics to strategy</p>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <Network className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cross-Platform Correlation</h3>
              <p className="text-gray-600">Understand how trends connect across different content channels.</p>
              <p className="text-sm text-gray-500 mt-2">Proprietary algorithm identifies pattern relationships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Trusted by Content Leaders
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-3xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                    index === activeTestimonial
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-full"
                  )}
                >
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <ThumbsUp className="h-8 w-8 text-primary mx-auto mb-4" />
                    <p className="text-lg mb-4">{testimonial.quote}</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-primary mt-2">{testimonial.metrics}</div>
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
                    "h-2 w-2 rounded-full transition-all",
                    index === activeTestimonial
                      ? "bg-primary w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/90 to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Begin Your Trend Journey
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of content creators who are already staying ahead of the curve
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Start Free Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="/features" className="opacity-75 hover:opacity-100">Features</a></li>
                <li><a href="/pricing" className="opacity-75 hover:opacity-100">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="opacity-75 hover:opacity-100">About</a></li>
                <li><a href="/contact" className="opacity-75 hover:opacity-100">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/privacy" className="opacity-75 hover:opacity-100">Privacy Policy</a></li>
                <li><a href="/terms" className="opacity-75 hover:opacity-100">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-center opacity-75">
              &copy; {new Date().getFullYear()} lovable.dev. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
