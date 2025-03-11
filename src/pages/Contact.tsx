
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A2349] to-[#0F2D5E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-white hover:text-[#48D1CC]"
        >
          ← Back
        </Button>
        
        <h1 className="text-4xl font-bold mb-4 text-center">Get in Touch</h1>
        <p className="text-white/80 text-lg text-center mb-12 max-w-xl mx-auto">
          We'd love to hear from you. Whether you have a question about our features, pricing, or anything else, our team is ready to answer all your questions.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#48D1CC]/20 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-[#48D1CC]" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-white/80 mb-4">For general inquiries and support</p>
            <a href="mailto:hello@trendradar.ai" className="text-[#48D1CC] hover:underline">hello@trendradar.ai</a>
          </div>
          
          <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#48D1CC]/20 rounded-full flex items-center justify-center mb-4">
              <Phone className="text-[#48D1CC]" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-white/80 mb-4">Monday-Friday, 9am-5pm EST</p>
            <a href="tel:+15551234567" className="text-[#48D1CC] hover:underline">+1 (555) 123-4567</a>
          </div>
          
          <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#48D1CC]/20 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-[#48D1CC]" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-white/80 mb-4">Our headquarters</p>
            <address className="text-[#48D1CC] not-italic">
              350 Innovation Drive<br />
              San Francisco, CA 94103
            </address>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            <div className="bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <MessageSquare className="mr-3 text-[#48D1CC]" size={24} />
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    required 
                    className="bg-[#0A2349]/50 border-[#48D1CC]/30 focus:border-[#48D1CC] text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    className="bg-[#0A2349]/50 border-[#48D1CC]/30 focus:border-[#48D1CC] text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-1">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    required 
                    className="bg-[#0A2349]/50 border-[#48D1CC]/30 focus:border-[#48D1CC] text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    required 
                    className="min-h-[150px] bg-[#0A2349]/50 border-[#48D1CC]/30 focus:border-[#48D1CC] text-white"
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] w-full"
                >
                  <Send size={16} className="mr-2" /> Send Message
                </Button>
              </form>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20">
                <h3 className="text-lg font-medium mb-2 text-[#48D1CC]">How quickly will I receive a response?</h3>
                <p className="text-white/80">
                  We aim to respond to all inquiries within 24 hours during business days.
                </p>
              </div>
              
              <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20">
                <h3 className="text-lg font-medium mb-2 text-[#48D1CC]">Do you offer demo calls?</h3>
                <p className="text-white/80">
                  Yes! We'd be happy to schedule a personalized demo to show you how trendradar.ai can help your specific YouTube channel.
                </p>
              </div>
              
              <div className="bg-[#0A2349]/70 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-[#48D1CC]/20">
                <h3 className="text-lg font-medium mb-2 text-[#48D1CC]">I need help with my account, what should I do?</h3>
                <p className="text-white/80">
                  For account-specific issues, please email support@trendradar.ai with your account details and a description of the problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
