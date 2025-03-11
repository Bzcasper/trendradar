
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Shield, AlertTriangle } from "lucide-react";

export default function Terms() {
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
          <FileText className="text-[#48D1CC] mr-4" size={32} />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
        
        <div className="bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20 mb-8">
          <p className="text-white/80 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC]">1. Acceptance of Terms</h2>
              <p className="text-white/80 mb-3">By accessing and using trendradar.ai, you accept and agree to be bound by these Terms of Service and our Privacy Policy.</p>
              <p className="text-white/80">If you do not agree to these terms, please do not use our service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC]">2. Use of Service</h2>
              <p className="text-white/80 mb-3">You agree to use the service only for lawful purposes and in accordance with these Terms.</p>
              <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                <h3 className="font-medium mb-2 flex items-center">
                  <Shield className="text-[#48D1CC] mr-2" size={16} /> Your Responsibilities
                </h3>
                <ul className="list-disc pl-6 text-white/80 space-y-1">
                  <li>Maintain accurate account information</li>
                  <li>Protect your account credentials</li>
                  <li>Comply with YouTube's terms of service</li>
                  <li>Use the data and insights responsibly</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC]">3. Account Registration</h2>
              <p className="text-white/80 mb-3">When you register for an account, you must provide accurate and complete information. You are responsible for maintaining the security of your account.</p>
              <div className="bg-[#0A2349]/50 p-4 rounded-lg border border-[#48D1CC]/10">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertTriangle className="text-[#48D1CC] mr-2" size={16} /> Important Notice
                </h3>
                <p className="text-white/80">You are responsible for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC]">4. YouTube Data</h2>
              <p className="text-white/80 mb-3">Our service accesses and analyzes data from your YouTube account with your permission. We comply with YouTube's API Services Terms of Service.</p>
              <p className="text-white/80">We do not store your YouTube credentials and only access the data necessary to provide our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#48D1CC]">5. Privacy Policy</h2>
              <p className="text-white/80 mb-3">Your use of the service is also governed by our Privacy Policy, which describes how we collect, use, and protect your data.</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/privacy')}
                className="border-[#48D1CC]/40 text-white hover:bg-[#48D1CC]/10"
              >
                View Privacy Policy
              </Button>
            </section>
          </div>
        </div>
        
        <div className="text-center text-white/60 text-sm">
          <p>If you have any questions about these Terms, please <a href="/contact" className="text-[#48D1CC] hover:underline">contact us</a>.</p>
        </div>
      </div>
    </div>
  );
}
