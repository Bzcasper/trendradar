
import { supabase } from "@/integrations/supabase/client";

// Define types to match the database schema
type TaskCategory = "issue" | "improvement" | "feature" | "bug" | "security" | "performance";
type TaskPriority = "low" | "medium" | "high" | "critical";
type TaskStatus = "pending" | "in_progress" | "completed" | "blocked";

interface InitialTask {
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  status: TaskStatus;
  tags: string[];
}

export async function createInitialTasks() {
  const tasks: InitialTask[] = [
    {
      title: "Update OAuth Redirect URIs",
      description: "Update Google Cloud Console and Supabase authentication settings with new Vercel deployment URLs",
      priority: "high",
      category: "security",
      status: "pending",
      tags: ["auth", "configuration", "security"]
    } as InitialTask,
    {
      title: "Implement Token Refresh Mechanism",
      description: "Add automatic token refresh handling for YouTube API authentication",
      priority: "high",
      category: "feature",
      status: "pending",
      tags: ["auth", "youtube-api"]
    } as InitialTask,
    {
      title: "Add State Parameter to OAuth Flow",
      description: "Implement state parameter in OAuth flow to prevent CSRF attacks",
      priority: "critical",
      category: "security",
      status: "pending",
      tags: ["auth", "security"]
    } as InitialTask,
    {
      title: "Improve Error Handling",
      description: "Enhance error handling and user feedback during authentication process",
      priority: "medium",
      category: "improvement",
      status: "pending",
      tags: ["ux", "error-handling"]
    } as InitialTask,
    {
      title: "Add Loading States",
      description: "Implement proper loading states during authentication and API calls",
      priority: "medium",
      category: "improvement",
      status: "pending",
      tags: ["ux"]
    } as InitialTask
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
