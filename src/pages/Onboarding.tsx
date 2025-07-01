// import type React from "react"
// import { OnboardingLayout } from "../components/OnboardingLayout"
// import { SetupProfile } from "../components/SetupProfile"
// import { TeamSetup } from "../components/TeamSetup"
// import { PaymentChannelSetup } from "../components/PaymentChannelSetup"
// import { InviteMembers } from "../components/InviteMembers"
// import { CompleteSetup } from "../components/CompleteSetup"
// import { useOnboarding } from "../hooks/useOnboarding"

// interface OnboardingProps {
//   onComplete: () => void
// }

// export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
//   const { currentStep, completedSteps, loading } = useOnboarding()

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   const renderCurrentStep = () => {
//     switch (currentStep) {
//       case 1:
//         return <SetupProfile />
//       case 2:
//         return <TeamSetup />
//       case 3:
//         return <PaymentChannelSetup />
//       case 4:
//         return <InviteMembers />
//       case 5:
//         return <CompleteSetup onGoToDashboard={onComplete} />
//       default:
//         return <SetupProfile />
//     }
//   }

//   return (
//     <OnboardingLayout currentStep={currentStep} completedSteps={completedSteps}>
//       {renderCurrentStep()}
//     </OnboardingLayout>
//   )
// }

"use client"
import { OnboardingProvider, useOnboarding } from "../hooks/useOnboarding"
import { OnboardingLayout } from "../components/OnboardingLayout"
import { SetupProfile } from "../components/SetupProfile"
import { BusinessSetup } from "../components/BusinessSetup"
import { PaymentChannelSetup } from "../components/PaymentChannelSetup"
// import { InviteForm } from "@/components/invite-form"
import { CompleteSetup } from "../components/CompleteSetup"
import  InviteForm from "../components/invite-form"

interface OnboardingProps {
  onComplete?: () => void
}

function OnboardingContent({ onComplete }: OnboardingProps) {
  const { currentStep } = useOnboarding()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <SetupProfile />
      case 2:
        return <BusinessSetup />
      case 3:
        return <PaymentChannelSetup />
      case 4:
        return <InviteForm />
      case 5:
        return <CompleteSetup onComplete={onComplete} />
      default:
        return <SetupProfile />
    }
  }

  return <OnboardingLayout>{renderStep()}</OnboardingLayout>
}

export function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <OnboardingProvider>
      <OnboardingContent onComplete={onComplete} />
    </OnboardingProvider>
  )
}
