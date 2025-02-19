
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          ← Back
        </Button>
        
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">What is trendradar.ai?</h3>
            <p className="text-gray-600">
              trendradar.ai is an AI-powered analytics platform designed specifically for YouTube creators 
              to help them understand their audience and optimize their content.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">How does it work?</h3>
            <p className="text-gray-600">
              We analyze your YouTube channel data using advanced AI algorithms to provide insights, 
              detect trends, and suggest optimizations for your content.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Is my data secure?</h3>
            <p className="text-gray-600">
              Yes, we take data security seriously. We use industry-standard encryption and security 
              measures to protect your data. See our Privacy Policy for more details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
