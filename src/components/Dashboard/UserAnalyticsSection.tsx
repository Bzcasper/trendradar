
import { Card } from "@/components/ui/card";
import { BarChart2, Users, MousePointer, LineChart, Brain, Heart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnalyticMetric {
  label: string;
  value: string;
  change: number;
  icon: typeof BarChart2;
  description: string;
}

export const UserAnalyticsSection = () => {
  const metrics: AnalyticMetric[] = [
    {
      label: "Active Users",
      value: "2,847",
      change: 12.5,
      icon: Users,
      description: "Users actively engaging with the platform"
    },
    {
      label: "Click-Through Rate",
      value: "4.2%",
      change: 2.1,
      icon: MousePointer,
      description: "CTA engagement performance"
    },
    {
      label: "Conversion Rate",
      value: "3.8%",
      change: 0.7,
      icon: LineChart,
      description: "Trial conversion effectiveness"
    },
    {
      label: "AI Sentiment Score",
      value: "8.4/10",
      change: 1.2,
      icon: Brain,
      description: "User satisfaction analysis"
    },
    {
      label: "User Engagement",
      value: "76%",
      change: 5.3,
      icon: Heart,
      description: "Overall platform engagement"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Analytics & Feedback</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Real-time analytics
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Data updates every 5 minutes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {metric.label}
                </p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
              </div>
              <metric.icon className="h-5 w-5 text-brand-secondary" />
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
              <span className="text-sm text-muted-foreground">vs. last week</span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {metric.description}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">A/B Testing Results</h3>
        <div className="space-y-4">
          {[
            {
              test: "Hero Headline",
              variant: "Version B",
              improvement: "23% better conversion",
              status: "Running",
            },
            {
              test: "CTA Button Color",
              variant: "Electric Cyan",
              improvement: "12% higher click-through",
              status: "Completed",
            },
            {
              test: "Testimonial Layout",
              variant: "Grid View",
              improvement: "8% more engagement",
              status: "Running",
            },
          ].map((test, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">{test.test}</p>
                <p className="text-sm text-muted-foreground">Testing: {test.variant}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-brand-secondary">
                  {test.improvement}
                </p>
                <p className="text-xs text-muted-foreground">
                  Status: {test.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Feedback Overview</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Heatmap Insights</p>
              <p className="text-xs text-muted-foreground">
                Most clicked: Feature comparison section
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Exit Survey Results</p>
              <p className="text-xs text-muted-foreground">
                Top reason: Need more time to evaluate
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Sentiment Analysis</p>
              <p className="text-xs text-muted-foreground">
                84% positive feedback this week
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
