
import React, { useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell, ZAxis, ReferenceLine } from "recharts";
import mockTrendData from "@/data/mockTrendData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#0088FE', '#00C49F'];

export const ViralPotentialWidget = () => {
  const [activeTab, setActiveTab] = useState("potential");
  
  // Calculate viral potential metrics
  const viralPotentialData = mockTrendData.map(item => ({
    title: item.title.substring(0, 30) + (item.title.length > 30 ? '...' : ''),
    engagementRate: item.engagement_rate || 0,
    viewVelocity: (item.views || 0) / ((new Date().getTime() - new Date(item.published_at).getTime()) / (1000 * 60 * 60)),
    trending: item.trending_score || 0,
    views: item.views,
    topic: item.category || 'General',
    viralProbability: item.viral_probability || Math.random() * 100,
    size: item.views > 500000 ? 800 : item.views > 100000 ? 400 : 200,
  }));
  
  // Sort data by trending score for the table view
  const sortedData = [...viralPotentialData].sort((a, b) => b.trending - a.trending);
  
  // Calculate category averages for comparison
  const categoryData = viralPotentialData.reduce((acc, item) => {
    if (!acc[item.topic]) {
      acc[item.topic] = {
        topic: item.topic,
        count: 0,
        totalEngagement: 0,
        totalVelocity: 0,
        totalTrending: 0,
      };
    }
    
    acc[item.topic].count += 1;
    acc[item.topic].totalEngagement += item.engagementRate;
    acc[item.topic].totalVelocity += item.viewVelocity;
    acc[item.topic].totalTrending += item.trending;
    
    return acc;
  }, {});
  
  const categoryAverages = Object.values(categoryData).map(cat => ({
    topic: cat.topic,
    avgEngagement: cat.totalEngagement / cat.count,
    avgVelocity: cat.totalVelocity / cat.count,
    avgTrending: cat.totalTrending / cat.count,
  }));
  
  const getViralLabel = (score) => {
    if (score > 80) return ["Highly Viral", "bg-green-500"];
    if (score > 60) return ["Viral", "bg-green-400"];
    if (score > 40) return ["Potential", "bg-yellow-400"];
    if (score > 20) return ["Low", "bg-orange-400"];
    return ["Unlikely", "bg-red-400"];
  };
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const [viralLabel, viralClass] = getViralLabel(data.trending);
      
      return (
        <Card className="p-3 shadow-lg border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="p-2">
            <CardTitle className="text-sm">{data.title}</CardTitle>
            <CardDescription className="text-xs flex items-center gap-1">
              <Badge className={viralClass}>{viralLabel}</Badge>
              <span className="text-muted-foreground">Score: {data.trending.toFixed(1)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0">
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div>Engagement Rate:</div>
              <div className="font-medium">{data.engagementRate.toFixed(1)}%</div>
              <div>View Velocity:</div>
              <div className="font-medium">{(data.viewVelocity / 1000).toFixed(1)}k/hr</div>
              <div>Views:</div>
              <div className="font-medium">{(data.views / 1000).toFixed(0)}k</div>
              <div>Category:</div>
              <div className="font-medium">{data.topic}</div>
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  };
  
  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Viral Potential Analysis</h3>
          <div className="group relative">
            <InfoIcon size={16} className="text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-0 mb-2 w-60 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
              Measures content's viral potential based on engagement rate and view velocity.
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="potential" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-3 h-8">
            <TabsTrigger value="potential" className="text-xs">Scatterplot</TabsTrigger>
            <TabsTrigger value="categories" className="text-xs">Categories</TabsTrigger>
            <TabsTrigger value="trending" className="text-xs">Top Trending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="potential" className="mt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                type="number" 
                dataKey="engagementRate" 
                name="Engagement Rate" 
                unit="%" 
                domain={[0, 'dataMax + 1']}
                label={{ value: 'Engagement Rate (%)', position: 'insideBottom', offset: -15, fontSize: 12 }}
              />
              <YAxis 
                type="number" 
                dataKey="viewVelocity" 
                name="View Velocity" 
                unit="/hr"
                domain={[0, 'dataMax + 1000']}
                label={{ value: 'View Velocity (views/hr)', angle: -90, position: 'insideLeft', offset: 0, fontSize: 12 }}
              />
              <ZAxis type="number" dataKey="size" range={[50, 400]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Reference lines for viral thresholds */}
              <ReferenceLine y={10000} strokeDasharray="3 3" stroke="#82ca9d" />
              <ReferenceLine x={5} strokeDasharray="3 3" stroke="#82ca9d" />
              
              <Scatter 
                name="Content" 
                data={viralPotentialData} 
                fill="#8884d8"
              >
                {viralPotentialData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.trending > 70 ? "#4ade80" : entry.trending > 50 ? "#facc15" : entry.trending > 30 ? "#fb923c" : "#f87171"} 
                    fillOpacity={0.7}
                    stroke={entry.trending > 70 ? "#22c55e" : entry.trending > 50 ? "#eab308" : entry.trending > 30 ? "#ea580c" : "#ef4444"}
                    strokeWidth={1}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      
      <TabsContent value="categories" className="mt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                type="number" 
                dataKey="avgEngagement" 
                name="Avg. Engagement Rate" 
                unit="%" 
                label={{ value: 'Avg. Engagement Rate (%)', position: 'insideBottom', offset: -15, fontSize: 12 }}
              />
              <YAxis 
                type="number" 
                dataKey="avgVelocity" 
                name="Avg. View Velocity" 
                unit="/hr"
                label={{ value: 'Avg. View Velocity (views/hr)', angle: -90, position: 'insideLeft', offset: 0, fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Scatter 
                name="Categories" 
                data={categoryAverages} 
                fill="#8884d8"
              >
                {categoryAverages.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      
      <TabsContent value="trending" className="mt-0">
        <div className="h-[300px] overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left">Content</th>
                <th className="px-2 py-2 text-right">Trend Score</th>
                <th className="px-2 py-2 text-right">Engagement</th>
                <th className="px-2 py-2 text-right">Velocity</th>
                <th className="px-2 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.slice(0, 10).map((item, index) => {
                const [viralLabel, viralClass] = getViralLabel(item.trending);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-2 py-2 max-w-[150px] truncate">{item.title}</td>
                    <td className="px-2 py-2 text-right font-medium">{item.trending.toFixed(1)}</td>
                    <td className="px-2 py-2 text-right">{item.engagementRate.toFixed(1)}%</td>
                    <td className="px-2 py-2 text-right">{(item.viewVelocity / 1000).toFixed(1)}k/hr</td>
                    <td className="px-2 py-2">
                      <Badge className={viralClass}>{viralLabel}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </div>
  );
};
