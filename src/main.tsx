
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "@/contexts/AuthContext";
import { YouTubeAuthProvider } from "@/contexts/YouTubeAuthContext";
import { TaskProvider } from "@/contexts/TaskContext";
import App from './App.tsx'
import './styles/index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <YouTubeAuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </YouTubeAuthProvider>
    </AuthProvider>
  </BrowserRouter>
);
