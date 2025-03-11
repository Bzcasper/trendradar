
import { useState } from "react";
import { YouTubeAnalytics } from "@/components/YouTubeAnalytics";
import { AnalyticsDashboard } from "@/components/Dashboard/AnalyticsDashboard";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="grid grid-cols-1 gap-8">
        <AnalyticsDashboard />
        <YouTubeAnalytics />
      </div>
    </div>
  );
}
