import { DashboardCard } from "./DashboardCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockVideos = [
  {
    title: "Top 10 Gaming Moments",
    views: "1.2M",
    engagement: "95%",
    trend: "↑",
  },
  {
    title: "Latest Tech News Roundup",
    views: "890K",
    engagement: "87%",
    trend: "↑",
  },
  {
    title: "Music Festival Highlights",
    views: "750K",
    engagement: "92%",
    trend: "↑",
  },
];

export const VideoList = () => {
  return (
    <DashboardCard title="Trending Videos">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Engagement</TableHead>
            <TableHead>Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockVideos.map((video, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{video.title}</TableCell>
              <TableCell>{video.views}</TableCell>
              <TableCell>{video.engagement}</TableCell>
              <TableCell className="text-green-500">{video.trend}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardCard>
  );
};