
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingState } from "@/components/ui/loading-state";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { YouTubeAuthProvider } from "@/contexts/YouTubeAuthContext";
import { TaskProvider } from "@/contexts/TaskContext";

// Lazy load pages for better performance
const Navbar = lazy(() => import("@/components/Layout/Navbar").then(module => ({ default: module.Navbar })));
const Footer = lazy(() => import("@/components/Layout/Footer").then(module => ({ default: module.Footer })));
const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Index = lazy(() => import("@/pages/Index"));
const Auth = lazy(() => import("@/pages/Auth"));
const AuthCallback = lazy(() => import("@/pages/auth/callback"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Contact = lazy(() => import("@/pages/Contact"));
const Features = lazy(() => import("@/pages/Features"));
const About = lazy(() => import("@/pages/About"));
const Blog = lazy(() => import("@/pages/Blog"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Resources = lazy(() => import("@/pages/Resources"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <AuthProvider>
      <YouTubeAuthProvider>
        <TaskProvider>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<LoadingState />}>
              <Routes>
                {/* Home and landing pages don't need the fixed navbar */}
                <Route path="/" element={
                  <>
                    <Home />
                    <Footer />
                  </>
                } />
                
                {/* Dashboard has its own navbar handling */}
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Routes with standard layout */}
                <Route path="*" element={
                  <>
                    <Navbar />
                    <main className="flex-1 pt-16">
                      <Routes>
                        <Route path="/trending" element={<Index />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/features" element={<Features />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                } />
              </Routes>
            </Suspense>
            <Toaster />
          </div>
        </TaskProvider>
      </YouTubeAuthProvider>
    </AuthProvider>
  );
}
