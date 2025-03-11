
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
        <div className="glass-morphism p-8 rounded-xl max-w-md w-full">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Authentication Required</h1>
            <p className="text-muted-foreground mb-4">Sign in to access the TrendRadar dashboard</p>
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            <span className="text-gradient-primary">TrendRadar</span> Analytics
          </h1>
          <p className="text-muted-foreground">Search and analyze trends across multiple platforms</p>
        </div>
        <YouTubeAnalytics />
      </div>
    </div>
  );
};

export default Index;
