
import { Card } from "@/components/ui/card";

interface TopContent {
  title: string;
  views: number;
  avg_time: string;
  engagement: string;
  conversions: number;
}

interface TopPerformingTableProps {
  content: TopContent[];
}

export function TopPerformingTable({ content }: TopPerformingTableProps) {
  return (
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
            {content.map((item, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 text-gray-900 font-medium">
                  {item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title}
                </td>
                <td className="py-4 text-right text-gray-700">{item.views.toLocaleString()}</td>
                <td className="py-4 text-right text-gray-700">{item.avg_time}</td>
                <td className="py-4 text-right">
                  <span className="text-emerald-600 font-medium">{item.engagement}</span>
                </td>
                <td className="py-4 text-right text-gray-700">{item.conversions}</td>
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
  );
}
