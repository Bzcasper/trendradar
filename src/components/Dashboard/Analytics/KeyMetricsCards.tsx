
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export function KeyMetricsCards({ 
  totalViews, 
  avgEngagementRate, 
  conversionRate, 
  roi 
}: { 
  totalViews: number;
  avgEngagementRate: number;
  conversionRate: number;
  roi: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="text-gray-600 text-sm uppercase font-medium">TOTAL TRAFFIC</div>
        <div className="mt-2 flex items-end justify-between">
          <div className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</div>
          <div className="flex items-center text-green-500 text-sm font-semibold">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+17.8%</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="text-gray-600 text-sm uppercase font-medium">ENGAGEMENT RATE</div>
        <div className="mt-2 flex items-end justify-between">
          <div className="text-3xl font-bold text-gray-900">{avgEngagementRate.toFixed(1)}%</div>
          <div className="flex items-center text-green-500 text-sm font-semibold">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+2.4%</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="text-gray-600 text-sm uppercase font-medium">CONVERSION RATE</div>
        <div className="mt-2 flex items-end justify-between">
          <div className="text-3xl font-bold text-gray-900">{conversionRate}%</div>
          <div className="flex items-center text-green-500 text-sm font-semibold">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+0.6%</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="text-gray-600 text-sm uppercase font-medium">ROI</div>
        <div className="mt-2 flex items-end justify-between">
          <div className="text-3xl font-bold text-gray-900">{roi}%</div>
          <div className="flex items-center text-green-500 text-sm font-semibold">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            <span>+54%</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
