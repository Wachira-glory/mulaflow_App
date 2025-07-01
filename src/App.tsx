
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "@/hooks/useAuth";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import './App.css';


// // Import pages
// import Landing from "./pages/Landing";
// import Auth from "./pages/Auth";
// import Welcome from "./pages/Welcome";
// import Dashboard from "./pages/Dashboard";
// import PayIn from "./pages/PayIn";
// import Accounts from "./pages/Accounts";
// import DisbursementConfirmPage from './pages/DisbursementConfirmPage'; // Import the new page
// import Payout from "./pages/Payout";
// import Billings from "./pages/Billings";
// import Invoicing from "./pages/Invoicing";
// import Reports from "./pages/Reports";
// import Reconciliation from "./pages/Reconciliation";
// import Settings from "./pages/Settings";
// import Support from "./pages/Support";
// import Notifications from "./pages/Notifications";
// import SetupBusiness from "./pages/SetupBusiness";
// import SetupAccount from "./pages/SetupAccount";
// // import { Onboarding } from "./pages/OnboardingLayout"
// import Onboarding from "./pages/Onboarding";
// // import Dashboard from "./pages/Dashboard";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false
//     }
//   }
// });

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/landing" element={<Landing />} />
//             <Route path="/auth" element={<Auth />} />
// <Route path="/onboarding" element={<Onboarding onComplete={handleOnboardingComplete} />} />           
//  <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/pay-in" element={<PayIn />} />
//              <Route path="/accounts" element={<Accounts />} />
//             {/* <Route path="/accounts" element={<AccountsTable accounts={[]} />} /> */}
//             <Route path="/disbursement-confirm/:paymentId" element={<DisbursementConfirmPage />} /> {/* <-- NEW ROUTE */}
//              <Route path="/payout" element={<Payout />} />
//             <Route path="/billings" element={<Billings />} />
//             <Route path="/invoicing" element={<Invoicing />} />
//             <Route path="/reports" element={<Reports />} />
//             <Route path="/reconciliation" element={<Reconciliation />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/support" element={<Support />} />
//             <Route path="/notifications" element={<Notifications />} />
//             <Route path="/setup-business" element={<SetupBusiness />} />
//             <Route path="/setup-account" element={<SetupAccount />} />
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
// function handleOnboardingComplete(): void {
//   throw new Error("Function not implemented.");
// }

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { AuthProvider } from "@/hooks/useAuth"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import "./App.css"

// Import pages
import Landing from "./pages/Landing"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import PayIn from "./pages/PayIn"
import Accounts from "./pages/Accounts"
import DisbursementConfirmPage from "./pages/DisbursementConfirmPage"
import Payout from "./pages/Payout"
import Billings from "./pages/Billings"
import Invoicing from "./pages/Invoicing"
import Reports from "./pages/Reports"
import Reconciliation from "./pages/Reconciliation"
import Settings from "./pages/Settings"
import Support from "./pages/Support"
import Notifications from "./pages/Notifications"
import SetupBusiness from "./pages/SetupBusiness"
import SetupAccount from "./pages/SetupAccount"
import { Onboarding } from "./pages/Onboarding"

// Import the new onboarding system
// import { Onboarding } from "./src/pages/Onboarding"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

// Component to handle onboarding completion
function OnboardingWrapper() {
  const navigate = useNavigate()

  const handleOnboardingComplete = () => {
    navigate("/dashboard")
  }

  return <Onboarding onComplete={handleOnboardingComplete} />
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
              {/* <Route path="/debug" element={<Debug />} />  */}
            <Route path="/onboarding" element={<OnboardingWrapper />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pay-in" element={<PayIn />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/disbursement-confirm/:paymentId" element={<DisbursementConfirmPage />} />
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
)

export default App
