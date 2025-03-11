
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, HelpCircle, DollarSign } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      title: "Starter",
      description: "Perfect for new creators getting started with analytics",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "Basic Analytics Dashboard",
        "Content Recommendations",
        "1 YouTube Channel",
        "30-Day Trend History",
        "Email Support"
      ],
      ctaText: "Get Started",
      highlighted: false
    },
    {
      title: "Pro",
      description: "For growing creators who need more insights and features",
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        "Advanced Analytics Dashboard",
        "AI-Powered Content Insights",
        "3 YouTube Channels",
        "90-Day Trend History",
        "Competitor Analysis",
        "Priority Support",
        "Weekly Performance Reports"
      ],
      ctaText: "Get Started",
      highlighted: true
    },
    {
      title: "Enterprise",
      description: "Custom solutions for large creators and agencies",
      monthlyPrice: null,
      yearlyPrice: null,
      features: [
        "Custom Analytics Solutions",
        "Unlimited YouTube Channels",
        "Unlimited Trend History",
        "API Access",
        "Dedicated Account Manager",
        "Custom Integrations",
        "24/7 Priority Support"
      ],
      ctaText: "Contact Sales",
      highlighted: false
    }
  ];

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
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
          
          <div className="flex items-center justify-center mt-8 p-1 bg-[#0A2349]/70 w-fit mx-auto rounded-lg border border-[#48D1CC]/20">
            <button
              className={`px-6 py-2 rounded-md transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-[#48D1CC] text-[#0A2349] font-medium'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-[#48D1CC] text-[#0A2349] font-medium'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly <span className="text-xs">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-lg overflow-hidden ${
                plan.highlighted 
                  ? 'bg-gradient-to-b from-[#0A2349] to-[#0F1D3D] border-2 border-[#48D1CC]' 
                  : 'bg-[#0A2349]/70 backdrop-blur-sm border border-[#48D1CC]/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-[#48D1CC] text-[#0A2349] text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-white/70 text-sm mb-6 h-12">{plan.description}</p>
                
                <div className="mb-6">
                  {plan.monthlyPrice !== null ? (
                    <>
                      <div className="text-3xl font-bold">
                        ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                      </div>
                      <div className="text-white/60 text-sm">
                        per {billingPeriod === 'monthly' ? 'month' : 'year'}
                      </div>
                    </>
                  ) : (
                    <div className="text-3xl font-bold flex items-center">
                      <span>Custom</span>
                      <HelpCircle size={16} className="ml-2 text-white/60" />
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className={`mr-2 mt-1 flex-shrink-0 ${plan.highlighted ? 'text-[#48D1CC]' : 'text-green-400'}`} size={16} />
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => navigate('/auth')}
                  className={plan.highlighted 
                    ? "w-full bg-gradient-to-r from-[#48D1CC] to-[#40E0D0] text-[#0A2349] hover:from-[#40E0D0] hover:to-[#48D1CC] shadow-lg shadow-[#48D1CC]/20" 
                    : "w-full bg-[#0A2349] border border-[#48D1CC]/40 hover:bg-[#48D1CC]/10 text-white"
                  }
                >
                  {plan.ctaText === "Contact Sales" ? (
                    <>
                      <DollarSign size={16} className="mr-1" /> {plan.ctaText}
                    </>
                  ) : (
                    plan.ctaText
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-[#0A2349]/70 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-[#48D1CC]/20">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-[#48D1CC]">Do you offer a free trial?</h3>
              <p className="text-white/80">Yes, all our plans come with a 14-day free trial. No credit card required.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-[#48D1CC]">Can I change plans later?</h3>
              <p className="text-white/80">Absolutely! You can upgrade or downgrade your plan at any time.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-[#48D1CC]">What payment methods do you accept?</h3>
              <p className="text-white/80">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-[#48D1CC]">Can I cancel at any time?</h3>
              <p className="text-white/80">Yes, you can cancel your subscription at any time with no hidden fees.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
