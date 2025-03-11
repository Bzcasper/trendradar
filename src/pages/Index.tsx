
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to auth page if not authenticated
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">You need to sign in to access the dashboard</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">YouTube Analytics Dashboard</h1>
          <p className="text-gray-600">Search and analyze YouTube trends</p>
        </div>
        <YouTubeAnalytics />
      </div>
    </div>
  );
};

export default Index;
