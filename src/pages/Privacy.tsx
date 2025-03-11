
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Database, ExternalLink, UserCheck } from "lucide-react";

export default function Privacy() {
  const navigate = useNavigate();

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
        
        <div className="flex items-center mb-8">
          <Lock className="text-[#48D1CC] mr-4" size={32} />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
        
        <div className="bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20 mb-8">
          <p className="text-white/80 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC] flex items-center">
                <Database className="mr-3" size={20} />
                1. Information Collection
              </h2>
              <p className="text-white/80 mb-4">At trendradar.ai, we collect and process the following types of information:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">Account Information</h3>
                  <p className="text-white/70 text-sm">Email address, name, and account preferences</p>
                </div>
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">YouTube Data</h3>
                  <p className="text-white/70 text-sm">Channel analytics, video performance, audience demographics</p>
                </div>
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">Usage Data</h3>
                  <p className="text-white/70 text-sm">How you interact with our platform, features used, preferences</p>
                </div>
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">Authentication Tokens</h3>
                  <p className="text-white/70 text-sm">Secure tokens for YouTube API access</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC] flex items-center">
                <Shield className="mr-3" size={20} />
                2. How We Use Your Data
              </h2>
              <p className="text-white/80 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-white/80 space-y-2 mb-4">
                <li>Provide YouTube analytics and trend analysis</li>
                <li>Improve our AI-driven content recommendations</li>
                <li>Enhance your experience with personalized insights</li>
                <li>Send important updates about our service</li>
                <li>Process payments and manage subscriptions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC] flex items-center">
                <Lock className="mr-3" size={20} />
                3. Data Protection
              </h2>
              <p className="text-white/80 mb-4">We implement industry-standard security measures to protect your data, including:</p>
              <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10 mb-4">
                <h3 className="font-medium mb-2">Security Measures</h3>
                <ul className="list-disc pl-6 text-white/80 space-y-1">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Secure authentication mechanisms</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Compliance with data protection regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC] flex items-center">
                <ExternalLink className="mr-3" size={20} />
                4. Third-Party Services
              </h2>
              <p className="text-white/80 mb-4">We integrate with the following third-party services:</p>
              <ul className="list-disc pl-6 text-white/80 space-y-2 mb-4">
                <li>YouTube Data API</li>
                <li>Google Authentication</li>
                <li>Analytics providers</li>
                <li>Payment processors</li>
              </ul>
              <p className="text-white/80">Each of these services has its own privacy policy, and we encourage you to review them.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC] flex items-center">
                <UserCheck className="mr-3" size={20} />
                5. Your Rights
              </h2>
              <p className="text-white/80 mb-4">You have the right to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">Access</h3>
                  <p className="text-white/70 text-sm">Request a copy of your personal data</p>
                </div>
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">Correction</h3>
                  <p className="text-white/70 text-sm">Request correction of inaccurate data</p>
                </div>
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">Deletion</h3>
                  <p className="text-white/70 text-sm">Request deletion of your personal data</p>
                </div>
                <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                  <h3 className="font-medium mb-2">Portability</h3>
                  <p className="text-white/70 text-sm">Receive your data in a structured format</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC]">6. Contact Us</h2>
              <p className="text-white/80 mb-4">For privacy-related inquiries, please contact us at:</p>
              <p className="text-[#48D1CC]">Email: privacy@trendradar.ai</p>
              <Button 
                onClick={() => navigate('/contact')}
                className="mt-4 bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC]"
              >
                Contact Us
              </Button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
