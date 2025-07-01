// "use client"
// import { useState } from "react"
// import type React from "react"

// import { useOnboarding } from "../hooks/useOnboarding"
// import { useAuth } from "@/hooks/useAuth"

// export function InviteMembers() {
//   const { user } = useAuth()
//   const { data, addInvitation, removeInvitation, nextStep, previousStep, currentStep, setCurrentStep } = useOnboarding()

//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [invitationStatus, setInvitationStatus] = useState<{ [key: string]: "pending" | "sent" | "error" }>({})

//   const handleInvite = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!email || !user?.id || data.invitations.includes(email)) return

//     setIsLoading(true)
//     setInvitationStatus((prev) => ({ ...prev, [email]: "pending" }))

//     try {
//       // Fixed: Correct API route path
//       const response = await fetch("/src/api/send-invitation/route.ts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           teamId: data.business.team_id,
//           invitedByUserId: user.id,
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to send invitation")
//       }

//       addInvitation(email)
//       setInvitationStatus((prev) => ({ ...prev, [email]: "sent" }))
//       setEmail("")
//     } catch (error: any) {
//       setInvitationStatus((prev) => ({ ...prev, [email]: "error" }))
//       alert(error.message || "Failed to send invitation. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getInvitationStatusIcon = (email: string) => {
//     const status = invitationStatus[email]
//     switch (status) {
//       case "pending":
//         return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//       case "sent":
//         return (
//           <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         )
//       case "error":
//         return (
//           <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Invite Team Members</h2>
//         <p className="text-gray-600">
//           Add collaborators to your payment management system. They'll receive an email invitation.
//         </p>
//       </div>

//       <form onSubmit={handleInvite} className="space-y-6">
//         <div>
//           <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="memberEmail"
//             placeholder="team.member@example.com"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             disabled={!email || isLoading}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//           >
//             {isLoading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                 Sending Invitation...
//               </>
//             ) : (
//               "Send Invitation"
//             )}
//           </button>
//         </div>

//         {data.invitations.length > 0 && (
//           <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//             <h3 className="font-medium text-gray-900 mb-3">Pending Invitations ({data.invitations.length})</h3>
//             <div className="space-y-3">
//               {data.invitations.map((memberEmail, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center min-w-0">
//                     <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
//                       {memberEmail.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-gray-900 truncate">{memberEmail}</p>
//                       <div className="flex items-center text-xs text-gray-500">
//                         {invitationStatus[memberEmail] === "sent" && "Sent"}
//                         {invitationStatus[memberEmail] === "error" && "Failed"}
//                         {invitationStatus[memberEmail] === "pending" && "Sending..."}
//                         <span className="ml-2">{getInvitationStatusIcon(memberEmail)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeInvitation(memberEmail)}
//                     className="text-red-600 hover:text-red-700 text-sm font-medium"
//                     disabled={invitationStatus[memberEmail] === "pending"}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex space-x-4 pt-4">
//           <button
//             type="button"
//             onClick={previousStep}
//             className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//           >
//             Back
//           </button>
//           <button
//             type="button"
//             onClick={nextStep}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// // src/components/InviteMembers.tsx
// "use client"
// import { useState } from "react"
// import { useAuth } from "@/hooks/useAuth"
// import { sendInvitation } from "@/api/send-invitation"

// export function InviteMembers() {
//   const { user } = useAuth()
//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [message, setMessage] = useState<{text: string, isError: boolean} | null>(null)

//   // const handleInvite = async (e: React.FormEvent) => {
//   //   e.preventDefault()
//   //   if (!email || !user?.id) {
//   //     setMessage({text: "Please enter a valid email", isError: true})
//   //     return
//   //   }

//   //   setIsLoading(true)
//   //   setMessage(null)

//   //   try {
//   //     const result = await sendInvitation(email)
      
//   //     if (result.error) {
//   //       throw new Error(result.error)
//   //     }

//   //     setMessage({text: `Invitation sent to ${email}`, isError: false})
//   //     setEmail("")
      
//   //   } catch (error: any) {
//   //     setMessage({
//   //       text: error.message || "Failed to send invitation", 
//   //       isError: true
//   //     })
//   //     console.error("Invitation error:", error)
//   //   } finally {
//   //     setIsLoading(false)
//   //   }
//   // }
//   const handleInvite = async (e: React.FormEvent) => {
//   e.preventDefault();
  
//   // Simple email validation
//   if (!email || !email.includes('@') || !email.includes('.')) {
//     alert("Please enter a valid email address");
//     return;
//   }

//   // Rest of your invitation logic...
//   setIsLoading(true);
//   try {
//     const response = await fetch('/api/send-invitation', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email })
//     });
//     // ... handle response
//   } catch (error) {
//     alert("Failed to send invitation");
//   } finally {
//     setIsLoading(false);
//   }
// }

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Invite Team Members</h2>
      
//       <form onSubmit={handleInvite} className="space-y-4">
//         <div>
//           <label htmlFor="email" className="block mb-2 text-sm font-medium">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="user@example.com"
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full p-2 rounded text-white ${
//             isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {isLoading ? 'Sending...' : 'Send Invitation'}
//         </button>

//         {message && (
//           <p className={`p-2 rounded ${
//             message.isError 
//               ? 'bg-red-100 text-red-700' 
//               : 'bg-green-100 text-green-700'
//           }`}>
//             {message.text}
//           </p>
//         )}
//       </form>
//     </div>
//   )
// }

// "use client"
// import { useState } from "react"
// import type React from "react"

// import { useOnboarding } from "../hooks/useOnboarding"
// import { useAuth } from "@/hooks/useAuth"

// export function InviteMembers() {
//   const { user } = useAuth()
//   const { data, addInvitation, removeInvitation, nextStep, previousStep, currentStep, setCurrentStep } = useOnboarding()

//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [invitationStatus, setInvitationStatus] = useState<{ [key: string]: "pending" | "sent" | "error" }>({})

//   const handleInvite = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!email || !user?.id || data.invitations.includes(email)) return

//     setIsLoading(true)
//     setInvitationStatus((prev) => ({ ...prev, [email]: "pending" }))

//     try {
//       console.log("Sending invitation to:", email, "for team:", data.business.team_id)

//       // Fixed: Use the correct API route path
//       const response = await fetch("/api/send-invitation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           teamId: data.business.team_id,
//           invitedByUserId: user.id,
//         }),
//       })

//       const responseData = await response.json()
//       console.log("Invitation response:", responseData)

//       if (!response.ok) {
//         throw new Error(responseData.error || "Failed to send invitation")
//       }

//       addInvitation(email)
//       setInvitationStatus((prev) => ({ ...prev, [email]: "sent" }))
//       setEmail("")

//       // Show success message
//       alert(`Invitation sent successfully to ${email}!`)
//     } catch (error: any) {
//       console.error("Invitation error:", error)
//       setInvitationStatus((prev) => ({ ...prev, [email]: "error" }))
//       alert(error.message || "Failed to send invitation. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getInvitationStatusIcon = (email: string) => {
//     const status = invitationStatus[email]
//     switch (status) {
//       case "pending":
//         return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//       case "sent":
//         return (
//           <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         )
//       case "error":
//         return (
//           <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">Invite Team Members</h2>
//         <p className="text-gray-600">
//           Add collaborators to your payment management system. They'll receive an email invitation.
//         </p>
//       </div>

//       <form onSubmit={handleInvite} className="space-y-6">
//         <div>
//           <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700 mb-2">
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="memberEmail"
//             placeholder="team.member@example.com"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             disabled={isLoading}
//             required
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             disabled={!email || isLoading}
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//           >
//             {isLoading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                 Sending Invitation...
//               </>
//             ) : (
//               "Send Invitation"
//             )}
//           </button>
//         </div>

//         {data.invitations.length > 0 && (
//           <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//             <h3 className="font-medium text-gray-900 mb-3">Pending Invitations ({data.invitations.length})</h3>
//             <div className="space-y-3">
//               {data.invitations.map((memberEmail, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center min-w-0">
//                     <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
//                       {memberEmail.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="min-w-0">
//                       <p className="text-sm font-medium text-gray-900 truncate">{memberEmail}</p>
//                       <div className="flex items-center text-xs text-gray-500">
//                         {invitationStatus[memberEmail] === "sent" && "Sent"}
//                         {invitationStatus[memberEmail] === "error" && "Failed"}
//                         {invitationStatus[memberEmail] === "pending" && "Sending..."}
//                         <span className="ml-2">{getInvitationStatusIcon(memberEmail)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeInvitation(memberEmail)}
//                     className="text-red-600 hover:text-red-700 text-sm font-medium"
//                     disabled={invitationStatus[memberEmail] === "pending"}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex space-x-4 pt-4">
//           <button
//             type="button"
//             onClick={previousStep}
//             className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//           >
//             Back
//           </button>
//           <button
//             type="button"
//             onClick={nextStep}
//             className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
