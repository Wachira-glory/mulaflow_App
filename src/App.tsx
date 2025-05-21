
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import pages
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import PayIn from "./pages/PayIn";
import Payout from "./pages/Payout";
import Billings from "./pages/Billings";
import Reports from "./pages/Reports";
import Reconciliation from "./pages/Reconciliation";
import Settings from "./pages/Settings";
import SetupBusiness from "./pages/SetupBusiness";
import SetupAccount from "./pages/SetupAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pay-in" element={<PayIn />} />
          <Route path="/payout" element={<Payout />} />
          <Route path="/billings" element={<Billings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/setup-business" element={<SetupBusiness />} />
          <Route path="/setup-account" element={<SetupAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
