// // /src/app/accept-invite/page.tsx
// "use client"
// import { useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"

// export default function AcceptInvitePage() {
//   const searchParams = useSearchParams()
//   const email = searchParams.get("email")
//   const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

//   useEffect(() => {
//     if (!email) {
//       setStatus("error")
//       return
//     }

//     console.log("Processing invitation for:", email)

//     // Simulate processing
//     setTimeout(() => {
//       setStatus("success")
//       console.log("✅ Invitation accepted for:", email)
//     }, 2000)
//   }, [email])

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <h1 className="text-2xl font-bold mb-2">Processing Invitation...</h1>
//           <p className="text-gray-600">Welcome {email}!</p>
//         </div>
//       </div>
//     )
//   }

//   if (status === "error") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Invitation</h1>
//           <p className="text-gray-600 mb-4">This invitation link is not valid.</p>
//           <button onClick={() => (window.location.href = "/")} className="bg-blue-600 text-white px-4 py-2 rounded-md">
//             Go Home
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center p-8 bg-white rounded-lg shadow-md">
//         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//         </div>
//         <h1 className="text-2xl font-bold text-green-600 mb-4">Welcome to the Team!</h1>
//         <p className="text-gray-600 mb-4">Your invitation has been accepted successfully.</p>
//         <p className="text-sm text-gray-500 mb-4">Email: {email}</p>
//         <button
//           onClick={() => (window.location.href = "/")}
//           className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   )
// }


// src/api/send-invite.ts

import { createClient } from "@supabase/supabase-js"
// import { v4 as uuidv4 } from "uuid"
import { v4 as uuidv4 } from "uuid"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
)

export async function sendInvite(email: string, inviterName: string) {
  try {
    console.log("=== SENDING INVITATION ===")
    console.log("To:", email)
    console.log("From:", inviterName)

    // 1. Generate unique invite token (used as profile.id)
    const inviteToken = uuidv4()

    // 2. Create a record in `profiles`
    const { error: insertError } = await supabase.from("profiles").insert({
      id: inviteToken,
      name: null,
      auth_id: null,
      data: {
        email,
      },
      idata: {
        invited_by: inviterName,
        status: "pending",
      },
    })

    if (insertError) {
      console.error("❌ Failed to insert profile:", insertError)
      throw new Error(`DB insert failed: ${insertError.message}`)
    }

    // 3. Create the invite link
    const inviteLink = `${import.meta.env.VITE_SITE_URL}/accept-invite?token=${inviteToken}`

    // 4. Send magic link to user's email
    const { error: emailError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: inviteLink, // where user goes after clicking email link
      },
    })

    if (emailError) {
      console.error("❌ Failed to send magic link:", emailError)
      throw new Error(`Magic link send failed: ${emailError.message}`)
    }

    console.log("✅ Magic link sent successfully to:", email)

    return {
      success: true,
      message: "Invitation sent successfully",
    }
  } catch (error: any) {
    console.error("❌ sendInvite error:", error)
    throw error
  }
}
