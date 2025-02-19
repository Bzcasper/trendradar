
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
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
        
        <h1 className="text-4xl font-bold mb-8">How It Works</h1>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Connect Your Channel</h2>
            <p className="text-gray-600">
              Simply connect your YouTube channel to get started. We'll securely access your channel's 
              analytics through YouTube's official API.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. AI Analysis</h2>
            <p className="text-gray-600">
              Our AI algorithms analyze your content, audience behavior, and engagement patterns to 
              identify trends and opportunities.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Get Insights</h2>
            <p className="text-gray-600">
              Receive detailed insights and actionable recommendations to improve your content and 
              grow your channel.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
