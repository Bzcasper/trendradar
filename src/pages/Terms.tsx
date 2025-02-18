
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Terms() {
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
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using this platform, you accept and agree to be bound by these Terms of Service.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
            <p>You agree to use the service only for lawful purposes and in accordance with these Terms.</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Maintain accurate account information</li>
              <li>Protect your account credentials</li>
              <li>Comply with YouTube's terms of service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Privacy Policy</h2>
            <p>Your use of the service is also governed by our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
