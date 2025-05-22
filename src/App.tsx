
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import pages
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import PayIn from "./pages/PayIn";
import Payout from "./pages/Payout";
import Billings from "./pages/Billings";
import Invoicing from "./pages/Invoicing";
import Reports from "./pages/Reports";
import Reconciliation from "./pages/Reconciliation";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Notifications from "./pages/Notifications";
import SetupBusiness from "./pages/SetupBusiness";
import SetupAccount from "./pages/SetupAccount";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pay-in" element={<PayIn />} />
            <Route path="/payout" element={<Payout />} />
            <Route path="/billings" element={<Billings />} />
            <Route path="/invoicing" element={<Invoicing />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/setup-business" element={<SetupBusiness />} />
            <Route path="/setup-account" element={<SetupAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
