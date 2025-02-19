
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          ← Back
        </Button>
        
        <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Starter</h3>
            <p className="text-3xl font-bold mb-6">$29<span className="text-lg text-gray-500">/mo</span></p>
            <ul className="space-y-3 mb-8">
              <li>Basic Analytics</li>
              <li>Content Recommendations</li>
              <li>1 Channel</li>
            </ul>
            <Button className="w-full">Get Started</Button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-blue-500">
            <h3 className="text-xl font-semibold mb-4">Pro</h3>
            <p className="text-3xl font-bold mb-6">$79<span className="text-lg text-gray-500">/mo</span></p>
            <ul className="space-y-3 mb-8">
              <li>Advanced Analytics</li>
              <li>AI-Powered Insights</li>
              <li>3 Channels</li>
            </ul>
            <Button className="w-full">Get Started</Button>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
            <p className="text-3xl font-bold mb-6">Custom</p>
            <ul className="space-y-3 mb-8">
              <li>Custom Analytics</li>
              <li>Priority Support</li>
              <li>Unlimited Channels</li>
            </ul>
            <Button className="w-full">Contact Sales</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
