
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { YouTubeAuthProvider } from "@/contexts/YouTubeAuthContext";
import { TaskProvider } from "@/contexts/TaskContext";
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <YouTubeAuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </YouTubeAuthProvider>
  </BrowserRouter>
);
