
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
            <h2 className="text-2xl font-semibold mb-4">1. Information Collection</h2>
            <p>At trendradar.ai, we collect and process the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Account information (email, name)</li>
              <li>YouTube channel data and analytics</li>
              <li>Usage data and preferences</li>
              <li>Authentication tokens for YouTube API access</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Data</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide YouTube analytics and trend analysis</li>
              <li>Improve our AI-driven content recommendations</li>
              <li>Enhance your experience with personalized insights</li>
              <li>Send important updates about our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
            <p>We implement industry-standard security measures to protect your data, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security audits</li>
              <li>Compliance with data protection regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p>We integrate with the following third-party services:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>YouTube Data API</li>
              <li>Google Authentication</li>
              <li>Analytics providers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p>For privacy-related inquiries, please contact us at:</p>
            <p>Email: privacy@trendradar.ai</p>
            <p>Or visit our <a href="/contact" className="text-blue-600 hover:underline">Contact Page</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
