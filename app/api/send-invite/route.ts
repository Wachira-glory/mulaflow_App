// // pages/api/send-invitation.ts

// // pages/api/send-invitation.ts
// import { createClient } from "@supabase/supabase-js"
// import type { NextApiRequest, NextApiResponse } from "next"

// // HARDCODE YOUR VALUES TEMPORARILY TO TEST
// const supabase = createClient(
//   "https://zvwscspmoihnlotnuzdg.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2d3Njc3Btb2lobmxvdG51emRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY0NjE4OSwiZXhwIjoyMDYzMjIyMTg5fQ.7QQ3RpMbx8sdWU4WSxp-AqwMkXRZUoi4T7Mkt3iir9g"
// )

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const { email } = req.body
    
//     console.log("Attempting to invite:", email) // Add this line
    
//     const { error } = await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         shouldCreateUser: false,
//         emailRedirectTo: "http://localhost:8080/dashboard"
//       }
//     })

//     if (error) throw error

//     return res.json({ success: true })
    
//   } catch (error: any) {
//     console.error("ERROR:", error) // Add this line
//     return res.status(500).json({ error: error.message })
//   }
// }


// src/api/send-invite/route.ts
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const { email, inviterName } = await request.json()

    console.log("=== SENDING INVITATION ===")
    console.log("To:", email)
    console.log("From:", inviterName)

    // Create invitation link
    const inviteLink = `http://localhost:8080/accept-invite?email=${encodeURIComponent(email)}`
    console.log("Invite link:", inviteLink)

    // Send invitation email using Supabase
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      redirectTo: inviteLink,
      data: {
        inviter_name: inviterName,
        invite_link: inviteLink,
      },
    })

    if (error) {
      console.error("❌ Email error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    console.log("✅ Email sent successfully!")
    console.log("Data:", data)

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully",
    })
  } catch (error: any) {
    console.error("❌ Send invite failed:", error)
    return NextResponse.json({ error: error.message || "Failed to send invitation" }, { status: 500 })
  }
}
