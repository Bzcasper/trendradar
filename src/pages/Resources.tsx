
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, FileText, HelpCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Resources() {
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
        
        <h1 className="text-4xl font-bold mb-8">Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20">
            <div className="flex items-start mb-4">
              <BookOpen className="mr-4 text-[#48D1CC]" size={24} />
              <h3 className="text-xl font-semibold">Guides & Tutorials</h3>
            </div>
            <p className="text-white/80 mb-6">Comprehensive guides to help you maximize your YouTube channel growth using our analytics tools.</p>
            <Link to="/blog" className="text-[#48D1CC] hover:text-white flex items-center">
              Learn more <ExternalLink size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20">
            <div className="flex items-start mb-4">
              <FileText className="mr-4 text-[#48D1CC]" size={24} />
              <h3 className="text-xl font-semibold">Documentation</h3>
            </div>
            <p className="text-white/80 mb-6">Detailed documentation on all features and how to leverage trendradar.ai for maximum results.</p>
            <Link to="/blog" className="text-[#48D1CC] hover:text-white flex items-center">
              View docs <ExternalLink size={16} className="ml-2" />
            </Link>
          </div>
        </div>
        
        <div className="bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20 mb-12">
          <div className="flex items-start mb-6">
            <HelpCircle className="mr-4 text-[#48D1CC]" size={24} />
            <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-[#48D1CC] mb-2">How does trendradar.ai help YouTube creators?</h4>
              <p className="text-white/80">Our platform uses advanced AI to analyze YouTube trends, viewer behavior, and content performance to provide actionable insights for growth.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#48D1CC] mb-2">Can I connect multiple YouTube channels?</h4>
              <p className="text-white/80">Yes, depending on your subscription plan, you can connect and analyze multiple YouTube channels simultaneously.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#48D1CC] mb-2">How accurate are the trend predictions?</h4>
              <p className="text-white/80">Our AI analyzes millions of data points to provide trend predictions with high accuracy, continuously learning and improving from real-world results.</p>
            </div>
          </div>
          
          <Button 
            onClick={() => navigate('/faq')}
            className="mt-8 bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC]"
          >
            View All FAQs
          </Button>
        </div>
      </div>
    </div>
  );
}
