
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export const EmptyState = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center text-center p-8">
          <BarChart2 className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No Trends Found</h3>
          <p className="text-gray-500 mt-2">
            Try a different search query or platform to discover trending content.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
