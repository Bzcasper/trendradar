
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Features() {
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
        
        <h1 className="text-4xl font-bold mb-8">Features</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">AI-Powered Analytics</h3>
            <p className="text-gray-600">Advanced analytics powered by artificial intelligence to help you understand your audience better.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Trend Detection</h3>
            <p className="text-gray-600">Real-time trend detection and analysis to keep you ahead of the competition.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Content Optimization</h3>
            <p className="text-gray-600">Smart recommendations to optimize your content for maximum engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
