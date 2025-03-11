
import { 
  BarChart, 
  Bar, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { DashboardCard } from "../DashboardCard";

interface KeywordData {
  keyword: string;
  count: number;
}

interface KeywordAnalysisChartProps {
  keywordData: KeywordData[];
}

export const KeywordAnalysisChart = ({ keywordData }: KeywordAnalysisChartProps) => {
  return (
    <DashboardCard title="Keyword Analysis">
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={keywordData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 120,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="keyword"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} occurrences`, 'Frequency']} />
            <Bar
              dataKey="count"
              name="Occurrences"
              radius={[4, 4, 0, 0]}
            >
              {keywordData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(${(index * 360) / keywordData.length}, 70%, 60%)`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};
