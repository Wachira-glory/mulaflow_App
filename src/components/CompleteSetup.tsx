// //src/components/CompleteSetup.tsx
// "use client"

// import { useOnboarding } from "../hooks/useOnboarding"

// interface CompleteSetupProps {
//   onComplete?: () => void
// }

// export function CompleteSetup({ onComplete }: CompleteSetupProps) {
//   const { data, completeOnboarding, isLoading, previousStep } = useOnboarding()

//   const handleGoToDashboard = async () => {
//     const success = await completeOnboarding()
//     if (success) {
//       // Use the onComplete callback instead of direct navigation
//       if (onComplete) {
//         onComplete()
//       } else {
//         // Fallback to direct navigation if no callback provided
//         window.location.href = "/dashboard"
//       }
//     } else {
//       alert("Failed to complete onboarding. Please try again.")
//     }
//   }

//   const handleBack = () => {
//     previousStep()
//   }

//   return (
//     <div className="text-center">
//       <div className="mb-8">
//         {/* Success Icon */}
//         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         </div>

//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Complete Setup!</h2>
//         <p className="text-gray-600">
//           Review your information below and click "Go to Dashboard" to finish setting up your Mulaflow account.
//         </p>
//       </div>

//       {/* Summary */}
//       <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
//         <h3 className="font-semibold text-gray-900 mb-4">Setup Summary:</h3>

//         {/* Profile Summary */}
//         <div className="mb-4">
//           <h4 className="font-medium text-gray-800 mb-2">Profile Information</h4>
//           <div className="text-sm text-gray-600 space-y-1">
//             <div>Name: {data.profile.name}</div>
//             <div>Email: {data.profile.email}</div>
//             <div>Phone: {data.profile.phone_number}</div>
//             <div>Use Case: {data.profile.use_case}</div>
//           </div>
//         </div>

//         {/* Business Summary */}
//         <div className="mb-4">
//           <h4 className="font-medium text-gray-800 mb-2">Business Information</h4>
//           <div className="text-sm text-gray-600 space-y-1">
//             <div>Business Name: {data.business.team_name}</div>
//             <div>Industry: {data.business.industry}</div>
//             {data.business.domain && <div>Domain: {data.business.domain}</div>}
//             <div>Billing Plan: {data.business.billing_plan}</div>
//           </div>
//         </div>

//         {/* Payment Channels Summary */}
//         <div className="mb-4">
//           <h4 className="font-medium text-gray-800 mb-2">Payment Channels</h4>
//           {data.paymentChannels.length > 0 ? (
//             <div className="text-sm text-gray-600 space-y-2">
//               {data.paymentChannels.map((channel, index) => (
//                 <div key={index} className="bg-white p-2 rounded border">
//                   <div>
//                     Type: {channel.payment_method} ({channel.channel_type})
//                   </div>
//                   {channel.payment_method === "bank" ? (
//                     <>
//                       <div>Bank: {channel.bank_name}</div>
//                       <div>
//                         Account: {channel.account_name} - {channel.account_number}
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div>M-Pesa: {channel.mpesa_name}</div>
//                       <div>Number: {channel.mpesa_number}</div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-sm text-gray-500">No payment channels added</div>
//           )}
//         </div>

//         {/* Invitations Summary */}
//         <div>
//           <h4 className="font-medium text-gray-800 mb-2">Team Invitations</h4>
//           {data.invitations.length > 0 ? (
//             <div className="text-sm text-gray-600">
//               {data.invitations.map((email, index) => (
//                 <div key={index}>• {email}</div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-sm text-gray-500">No team members invited</div>
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex space-x-4">
//         <button
//           onClick={handleGoToDashboard}
//           disabled={isLoading}
//           className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//         >
//           {isLoading ? "Setting up..." : "Go to Dashboard"}
//         </button>

//         <button
//           onClick={handleBack}
//           disabled={isLoading}
//           className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 font-medium"
//         >
//           Back
//         </button>
//       </div>

//       <p className="text-xs text-gray-500 mt-4">You can always modify these settings later from your dashboard.</p>
//     </div>
//   )
// }

"use client"

import { useOnboarding } from "../hooks/useOnboarding"
import { Link } from "react-router-dom"

interface CompleteSetupProps {
  onComplete?: () => void
}

export function CompleteSetup({ onComplete }: CompleteSetupProps) {
  const { data, isLoading, previousStep } = useOnboarding()

  const handleBack = () => {
    previousStep()
  }

  return (
    <div className="text-center">
      <div className="mb-8">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Complete Setup!</h2>
        <p className="text-gray-600">
          Review your information below and click "Go to Dashboard" to finish setting up your Mulaflow account.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-900 mb-4">Setup Summary:</h3>

        {/* Profile Summary */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Profile Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Name: {data.profile.name}</div>
            <div>Email: {data.profile.email}</div>
            <div>Phone: {data.profile.phone_number}</div>
            <div>Use Case: {data.profile.use_case}</div>
          </div>
        </div>

        {/* Business Summary */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Business Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Business Name: {data.business.team_name}</div>
            <div>Industry: {data.business.industry}</div>
            {data.business.domain && <div>Domain: {data.business.domain}</div>}
            <div>Billing Plan: {data.business.billing_plan}</div>
          </div>
        </div>

        {/* Payment Channels Summary */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Payment Channels</h4>
          {data.paymentChannels.length > 0 ? (
            <div className="text-sm text-gray-600 space-y-2">
              {data.paymentChannels.map((channel, index) => (
                <div key={index} className="bg-white p-2 rounded border">
                  <div>
                    Type: {channel.payment_method} ({channel.channel_type})
                  </div>
                  {channel.payment_method === "bank" ? (
                    <>
                      <div>Bank: {channel.bank_name}</div>
                      <div>
                        Account: {channel.account_name} - {channel.account_number}
                      </div>
                    </>
                  ) : (
                    <>
                      <div>M-Pesa: {channel.mpesa_name}</div>
                      <div>Number: {channel.mpesa_number}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No payment channels added</div>
          )}
        </div>

        {/* Invitations Summary */}
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Team Invitations</h4>
          {data.invitations.length > 0 ? (
            <div className="text-sm text-gray-600">
              {data.invitations.map((email, index) => (
                <div key={index}>• {email}</div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No team members invited</div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/dashboard"
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-center"
        >
          Go to Dashboard
        </Link>

        <button
          onClick={handleBack}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 font-medium"
        >
          Back
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">You can always modify these settings later from your dashboard.</p>
    </div>
  )
}
