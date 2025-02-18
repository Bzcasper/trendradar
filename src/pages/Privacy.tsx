
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
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
        
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account information (name, email, etc.)</li>
              <li>YouTube channel data</li>
              <li>Analytics preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the collected information for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing analytics services</li>
              <li>Improving our platform</li>
              <li>Communicating with you</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your data.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
