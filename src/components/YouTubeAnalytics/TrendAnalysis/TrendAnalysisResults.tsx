
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TrendingItem } from "@/utils/api/types";
import { EmptyState } from "./EmptyState";
import { TrendingTable } from "./TrendingTable";
import { TrendingCards } from "./TrendingCards";

interface TrendAnalysisResultsProps {
  searchResults: TrendingItem[];
}

export const TrendAnalysisResults = ({ searchResults }: TrendAnalysisResultsProps) => {
  const [view, setView] = useState("table");
  
  if (!searchResults || searchResults.length === 0) {
    return <EmptyState />;
  }

  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="p-4 bg-white border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Trend Analysis Results</h3>
          <p className="text-sm text-gray-500">
            Found {searchResults.length} results ranked by trending score
          </p>
        </div>
        
        <Tabs value={view} onValueChange={setView} className="w-full sm:w-auto">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="table" className="m-0">
        <TrendingTable searchResults={searchResults} />
      </TabsContent>
      
      <TabsContent value="cards" className="m-0 p-4">
        <TrendingCards searchResults={searchResults} />
      </TabsContent>
    </Card>
  );
};
