
import { supabase } from "@/integrations/supabase/client";

export async function createInitialTasks() {
  const tasks = [
    {
      title: "Update OAuth Redirect URIs",
      description: "Update Google Cloud Console and Supabase authentication settings with new Vercel deployment URLs",
      priority: "high",
      category: "security",
      status: "pending",
      tags: ["auth", "configuration", "security"]
    },
    {
      title: "Implement Token Refresh Mechanism",
      description: "Add automatic token refresh handling for YouTube API authentication",
      priority: "high",
      category: "feature",
      status: "pending",
      tags: ["auth", "youtube-api"]
    },
    {
      title: "Add State Parameter to OAuth Flow",
      description: "Implement state parameter in OAuth flow to prevent CSRF attacks",
      priority: "critical",
      category: "security",
      status: "pending",
      tags: ["auth", "security"]
    },
    {
      title: "Improve Error Handling",
      description: "Enhance error handling and user feedback during authentication process",
      priority: "medium",
      category: "improvement",
      status: "pending",
      tags: ["ux", "error-handling"]
    },
    {
      title: "Add Loading States",
      description: "Implement proper loading states during authentication and API calls",
      priority: "medium",
      category: "improvement",
      status: "pending",
      tags: ["ux"]
    }
  ];

  for (const task of tasks) {
    const { error } = await supabase
      .from('project_tasks')
      .insert([task]);
    
    if (error) {
      console.error('Error creating task:', error);
    }
  }
}
