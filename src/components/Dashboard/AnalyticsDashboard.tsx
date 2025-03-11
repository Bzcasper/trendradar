
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import mockTrendData from "@/data/mockTrendData";

export function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("30days");
  
  // Calculate summary metrics from our existing data
  const totalViews = mockTrendData.reduce((sum, item) => sum + item.views, 0);
  const avgEngagementRate = (mockTrendData.reduce((sum, item) => sum + (item.engagement_rate || 0), 0) / mockTrendData.length);
  const conversionRate = 3.8; // Example value
  const roi = 312; // Example value
  
  // Create traffic trends data for line chart
  const trafficTrendsData = [
    { date: "Oct 1", organic: 6000, referral: 4000 },
    { date: "Oct 8", organic: 8000, referral: 6000 },
    { date: "Oct 15", organic: 12000, referral: 7000 },
    { date: "Oct 22", organic: 14000, referral: 8000 },
    { date: "Oct 29", organic: 16000, referral: 9000 },
    { date: "Nov 5", organic: 18000, referral: 10000 }
  ];
  
  // Create traffic sources data for pie chart
  const trafficSourcesData = [
    { name: "Organic Search", value: 42, color: "#4263EB" },
    { name: "Social Media", value: 28, color: "#F86A6A" },
    { name: "Referral", value: 19, color: "#FF8F3F" },
    { name: "Direct", value: 8, color: "#FFC541" },
    { name: "Other", value: 3, color: "#A3AED0" }
  ];
  
  // Create funnel data
  const funnelData = [
    { name: "Visitors", value: totalViews, color: "#4263EB" },
    { name: "Leads", value: Math.floor(totalViews * 0.28), color: "#6E8AFA" },
    { name: "Qualified Leads", value: Math.floor(totalViews * 0.12), color: "#9BABFC" },
    { name: "Opportunities", value: Math.floor(totalViews * 0.05), color: "#BDD0FE" }
  ];
  
  // Top performing content (using our existing data)
  const topContent = mockTrendData
    .sort((a, b) => (b.trending_score || 0) - (a.trending_score || 0))
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      views: item.views,
      avg_time: (Math.random() * 4 + 2).toFixed(2), // Example value in minutes
      engagement: (item.engagement_rate || 0).toFixed(1) + "%",
      conversions: Math.floor(item.views * (Math.random() * 0.01)),
    }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time insights to optimize your content strategy</p>
        </div>
        
        <Tabs value={timeframe} onValueChange={setTimeframe} className="mt-4 md:mt-0">
          <TabsList className="bg-blue-100">
            <TabsTrigger value="30days" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Last 30 Days
            </TabsTrigger>
            <TabsTrigger value="quarter" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Quarter
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Custom
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key Metrics Cards */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic Trends Chart */}
        <Card className="p-4 hover:shadow-md transition-shadow">
          <div className="font-semibold text-gray-900 mb-1">Traffic Trends</div>
          <div className="text-sm text-gray-600 mb-4">Daily visitors over the selected period</div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficTrendsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="organic" stroke="#4263EB" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Organic" />
                <Line type="monotone" dataKey="referral" stroke="#F86A6A" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Referral" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Traffic Sources & Conversion Funnel */}
        <div className="grid grid-cols-1 gap-6">
          {/* Traffic Sources Pie Chart */}
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="font-semibold text-gray-900 mb-4">Traffic Sources</div>
            <div className="flex items-center">
              <div className="h-[140px] w-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {trafficSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="ml-4 flex-1">
                <div className="text-xl font-semibold flex items-center justify-center">
                  <span className="text-brand-primary">{totalViews.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 ml-1">total</span>
                </div>
                <div className="mt-4 space-y-2">
                  {trafficSourcesData.map((source, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: source.color }}></div>
                      <div className="text-gray-600">{source.name}</div>
                      <div className="ml-auto font-medium">{source.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Conversion Funnel */}
          <Card className="p-4 hover:shadow-md transition-shadow">
            <div className="font-semibold text-gray-900 mb-4">Conversion Funnel</div>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={funnelData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" fontSize={12} stroke="#888" />
                  <YAxis type="category" dataKey="name" fontSize={12} stroke="#888" width={100} />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Top Performing Content Table */}
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="font-semibold text-gray-900 mb-4">Top Performing Content</div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left pb-3 text-gray-600 text-sm font-medium">TITLE</th>
                <th className="text-right pb-3 text-gray-600 text-sm font-medium">VIEWS</th>
                <th className="text-right pb-3 text-gray-600 text-sm font-medium">AVG. TIME</th>
                <th className="text-right pb-3 text-gray-600 text-sm font-medium">ENGAGEMENT</th>
                <th className="text-right pb-3 text-gray-600 text-sm font-medium">CONVERSIONS</th>
                <th className="text-right pb-3 text-gray-600 text-sm font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {topContent.map((content, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-gray-900 font-medium">{content.title.length > 40 ? content.title.substring(0, 40) + '...' : content.title}</td>
                  <td className="py-4 text-right text-gray-700">{content.views.toLocaleString()}</td>
                  <td className="py-4 text-right text-gray-700">{content.avg_time}</td>
                  <td className="py-4 text-right">
                    <span className="text-emerald-600 font-medium">{content.engagement}</span>
                  </td>
                  <td className="py-4 text-right text-gray-700">{content.conversions}</td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
