import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import "@/styles/responsive.css";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import QuanBenchPage from "./pages/quan-bench";
import NotFound from "./pages/NotFound";
import VibeADE from "./pages/VibeADE";
import VibePricing from "./pages/VibePricing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AgentationBridge } from "./components/AgentationBridge";
import { Helmet } from "react-helmet-async";
import { organizationJsonLd, websiteJsonLd } from "@/seo/schema";
import DashboardOverview from "./pages/dashboard/Overview";
import DashboardBilling from "./pages/dashboard/Billing";
import DashboardApiKeys from "./pages/dashboard/ApiKeys";
import DashboardSettings from "./pages/dashboard/Settings";
import DashboardWorkspaces from "./pages/dashboard/Workspaces";
import DashboardActivity from "./pages/dashboard/Activity";

const queryClient = new QueryClient();

const ScrollToTopWrapper = () => {
  useScrollToTop();
  return null;
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="qs-route-shell">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quan-bench" element={<QuanBenchPage />} />
        <Route path="/products/vibe-ade" element={<VibeADE />} />
        <Route path="/products/vibe-ade/pricing" element={<VibePricing />} />
        
        {/* Auth & Protected Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="billing" element={<DashboardBilling />} />
          <Route path="api-keys" element={<DashboardApiKeys />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="workspaces" element={<DashboardWorkspaces />} />
          <Route path="activity" element={<DashboardActivity />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(organizationJsonLd())}</script>
          <script type="application/ld+json">{JSON.stringify(websiteJsonLd())}</script>
        </Helmet>
        <Toaster />
        {mounted ? <Sonner /> : null}
        <AgentationBridge />
        <ScrollToTopWrapper />
        <AppRoutes />
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
