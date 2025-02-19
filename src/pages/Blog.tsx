
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Blog() {
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
        
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Understanding YouTube Analytics</h3>
              <p className="text-gray-600 mb-4">A comprehensive guide to understanding your channel's performance...</p>
              <span className="text-sm text-gray-500">March 15, 2024</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Content Strategy Tips</h3>
              <p className="text-gray-600 mb-4">Learn how to develop a winning content strategy for your channel...</p>
              <span className="text-sm text-gray-500">March 10, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
