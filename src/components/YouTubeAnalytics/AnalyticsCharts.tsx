
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { DashboardCard } from "../DashboardCard";

// Colors for the charts
const COLORS = ['#1E3A8A', '#00D4FF', '#FF8F3F', '#10B981', '#8B5CF6'];

interface CategoryData {
  name: string;
  value: number;
}

interface ViewsData {
  name: string;
  views: number;
  velocity: number;
}

interface EngagementData {
  name: string;
  likes: number;
  comments: number;
  engagement: number;
  trending: number;
  viral: number;
}

interface AnalyticsChartsProps {
  categoryData: CategoryData[];
  viewsData: ViewsData[];
  engagementData: EngagementData[];
}

export const AnalyticsCharts = ({ 
  categoryData, 
  viewsData, 
  engagementData 
}: AnalyticsChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Category Distribution Pie Chart */}
      <DashboardCard title="Category Distribution">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} videos`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      {/* Views and Velocity Comparison */}
      <DashboardCard title="Views & Velocity Analysis">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={viewsData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
              <Legend />
              <Bar yAxisId="left" dataKey="views" fill="#1E3A8A" name="Total Views" />
              <Bar yAxisId="right" dataKey="velocity" fill="#00D4FF" name="View Velocity" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      {/* Engagement Metrics */}
      <DashboardCard title="Engagement Analysis">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
              <Legend />
              <Line type="monotone" dataKey="likes" stroke="#1E3A8A" name="Likes" />
              <Line type="monotone" dataKey="comments" stroke="#00D4FF" name="Comments" />
              <Line type="monotone" dataKey="engagement" stroke="#FF8F3F" name="Engagement Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      {/* Trending and Viral Probability */}
      <DashboardCard title="Trend & Viral Analysis">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), '']} />
              <Legend />
              <Line type="monotone" dataKey="trending" stroke="#1E3A8A" name="Trending Score" />
              <Line type="monotone" dataKey="viral" stroke="#FF8F3F" name="Viral Probability %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>
  );
};
