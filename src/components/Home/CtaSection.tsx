
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Mail, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 md:p-16 border border-brand-secondary/20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of marketers and content creators who are staying ahead of trends with TrendRadar.ai
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-brand-secondary text-brand-primary hover:bg-brand-secondary/90 w-full sm:w-auto text-lg h-[60px] px-8 font-semibold"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/demo')}
              className="border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto text-lg h-[60px] px-8"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/consultation')}
              className="border border-white/40 text-white/80 hover:bg-white/5 w-full sm:w-auto h-[50px] px-6"
            >
              <Mail className="mr-2 h-5 w-5" />
              Request Consultation
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/subscribe')}
              className="border border-white/40 text-white/80 hover:bg-white/5 w-full sm:w-auto h-[50px] px-6"
            >
              <Bell className="mr-2 h-5 w-5" />
              Subscribe to Trend Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
