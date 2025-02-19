
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingState } from "@/components/ui/loading-state";
import { Navbar } from "@/components/Layout/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import AuthCallback from "@/pages/auth/callback";

export default function App() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
      <Toaster />
    </Suspense>
  );
}
