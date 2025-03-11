
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HelpCircle, Search, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const navigate = useNavigate();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "What is trendradar.ai?",
      answer: "trendradar.ai is an AI-powered analytics platform designed specifically for YouTube creators to help them understand their audience, identify emerging trends, and optimize their content for maximum impact and growth."
    },
    {
      id: 2,
      question: "How does it work?",
      answer: "We analyze your YouTube channel data using advanced AI algorithms to provide insights, detect trends, and suggest optimizations for your content. Our platform connects to your YouTube account via secure APIs, analyzes your performance data, and provides actionable recommendations."
    },
    {
      id: 3,
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties, and all YouTube data access is read-only and compliant with YouTube's Terms of Service."
    },
    {
      id: 4,
      question: "Can I connect multiple YouTube channels?",
      answer: "Yes, depending on your subscription plan, you can connect and analyze multiple YouTube channels simultaneously. Our Pro plan allows for up to 3 channels, while our Enterprise plan supports unlimited channels."
    },
    {
      id: 5,
      question: "How accurate are the trend predictions?",
      answer: "Our AI analyzes millions of data points to provide trend predictions with high accuracy, continuously learning and improving from real-world results. While no prediction can be 100% accurate, our system has demonstrated strong predictive capabilities that improve over time."
    },
    {
      id: 6,
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial on all our plans, allowing you to experience the full features of our platform before committing to a subscription."
    },
    {
      id: 7,
      question: "How is trendradar.ai different from YouTube Analytics?",
      answer: "While YouTube Analytics provides valuable data about your past performance, trendradar.ai goes beyond by offering predictive insights, identifying emerging trends across the platform, and providing specific, actionable recommendations to optimize your content strategy."
    },
    {
      id: 8,
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged for the next period."
    }
  ];

  const categories = [
    "General", "Pricing", "Features", "Security", "Technical"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2349] to-[#0F2D5E] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-white hover:text-[#48D1CC]"
        >
          ← Back
        </Button>
        
        <div className="text-center mb-12">
          <HelpCircle className="mx-auto mb-4 text-[#48D1CC]" size={48} />
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about trendradar.ai and how it can help you grow your YouTube channel.
          </p>
        </div>
        
        <div className="flex items-center mb-8 bg-[#0A2349]/70 backdrop-blur-sm rounded-lg border border-[#48D1CC]/20 p-2">
          <Search className="text-[#48D1CC] ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Search FAQs..." 
            className="bg-transparent border-none w-full p-2 focus:outline-none text-white"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="border-[#48D1CC]/40 text-white hover:bg-[#48D1CC]/10"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="space-y-4 mb-12">
          {faqs.map(faq => (
            <div 
              key={faq.id} 
              className="bg-[#0A2349]/70 backdrop-blur-sm rounded-lg shadow-lg border border-[#48D1CC]/20 overflow-hidden"
            >
              <button 
                onClick={() => toggleQuestion(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between font-medium"
              >
                <span>{faq.question}</span>
                {openQuestion === faq.id ? (
                  <ChevronUp className="text-[#48D1CC]" size={20} />
                ) : (
                  <ChevronDown className="text-[#48D1CC]" size={20} />
                )}
              </button>
              {openQuestion === faq.id && (
                <div className="px-6 py-4 text-white/80 border-t border-[#48D1CC]/10 bg-[#0A2349]/50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20 text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-white/80 mb-6">Our support team is here to help with any questions you might have.</p>
          <Button 
            onClick={() => navigate('/contact')}
            className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC]"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
