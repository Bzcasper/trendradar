
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingState } from "@/components/ui/loading-state";
import { Navbar } from "@/components/Layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import AuthCallback from "@/pages/auth/callback";
import NotFound from "@/pages/NotFound";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";

export default function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Suspense>
  );
}
