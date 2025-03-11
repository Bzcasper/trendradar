
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingState } from "@/components/ui/loading-state";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { YouTubeAuthProvider } from "@/contexts/YouTubeAuthContext";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import AuthCallback from "@/pages/auth/callback";
import NotFound from "@/pages/NotFound";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import Features from "@/pages/Features";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import FAQ from "@/pages/FAQ";
import HowItWorks from "@/pages/HowItWorks";
import Pricing from "@/pages/Pricing";
import Resources from "@/pages/Resources";

export default function App() {
  return (
    <AuthProvider>
      <YouTubeAuthProvider>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={<LoadingState />}>
            <Navbar />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Index />} />
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
            <Toaster />
          </Suspense>
        </div>
      </YouTubeAuthProvider>
    </AuthProvider>
  );
}
