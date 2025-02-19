
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function About() {
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
        
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="prose max-w-none">
          <p className="mb-6">
            At trendradar.ai, we're passionate about empowering YouTube creators with cutting-edge AI technology 
            to help them grow their channels and engage with their audience more effectively.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to democratize access to advanced analytics and content optimization tools, 
            making it easier for creators of all sizes to succeed on YouTube.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-6">
            We're a team of data scientists, engineers, and content creators working together 
            to build the future of content analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
