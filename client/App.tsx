import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import SarkariDost from "./pages/SarkariDost";
import SevaSummary from "./pages/SevaSummary";
import VidyarthiAI from "./pages/VidyarthiAI";
import StudyPartner from "./pages/StudyPartner";
import StepByStepGuides from "./pages/StepByStepGuides";
import CheckDocuments from "./pages/CheckDocuments";
import ErrorScanner from "./pages/ErrorScanner";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./lib/LanguageContext";
import { AuthProvider } from "./lib/AuthContext";
import { ThemeProvider } from "./lib/ThemeContext";
import { LoadingProvider, useLoading } from "./lib/LoadingContext";
import LoadingSpinner from "./components/LoadingSpinner";

const queryClient = new QueryClient();

// Inner component to use Loading context
const AppRoutes = () => {
  const { isLoading, loadingMessage } = useLoading();

  return (
    <>
      {isLoading && <LoadingSpinner message={loadingMessage} fullScreen />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/sarkari-dost" element={<SarkariDost />} />
          <Route path="/seva-summary" element={<SevaSummary />} />
          <Route path="/vidyarthi-ai" element={<VidyarthiAI />} />
          <Route path="/study-partner" element={<StudyPartner />} />
          <Route path="/step-by-step-guides" element={<StepByStepGuides />} />
          <Route path="/check-documents" element={<CheckDocuments />} />
          <Route path="/error-scanner" element={<ErrorScanner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <LoadingProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </LoadingProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;

// Only create root once to prevent HMR issues
const rootEl = document.getElementById("root")!;
if (!(window as any).__reactRootCreated) {
  (window as any).__reactRootCreated = true;
  createRoot(rootEl).render(<App />);
}
