// //src/api/send-invite.ts
// import { createClient } from "@supabase/supabase-js"

// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!)

// export async function sendInvite(email: string, inviterName: string) {
//   try {
//     console.log("=== SENDING INVITATION ===")
//     console.log("To:", email)
//     console.log("From:", inviterName)

//     // Create invitation link
//     const inviteLink = `${import.meta.env.VITE_SITE_URL}/accept-invite?email=${encodeURIComponent(email)}`
//     console.log("Invite link:", inviteLink)

//     // Send invitation email using Supabase
//     const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
//       redirectTo: inviteLink,
//       data: {
//         inviter_name: inviterName,
//         invite_link: inviteLink,
//       },
//     })

//     if (error) {
//       console.error("❌ Email error:", error)
//       throw new Error(`Failed to send email: ${error.message}`)
//     }

//     console.log("✅ Email sent successfully!")
//     console.log("Data:", data)

//     return {
//       success: true,
//       message: "Invitation sent successfully",
//     }
//   } catch (error: any) {
//     console.error("❌ Send invite failed:", error)
//     throw error
//   }
// }
// src/api/send-invite.ts
import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// Initialize Supabase client with Service Role key (used for server-side inserts)
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
)

// export async function sendInvite(email: string, inviterName: string) {
//   try {
//     console.log("=== SENDING INVITATION ===")
//     console.log("To:", email)
//     console.log("From:", inviterName)

//     // 1. Generate a secure invite token (used as temporary profile.id)
//     const inviteToken = uuidv4()

//     // 2. Insert into `profiles` with token and metadata
//     const { error: insertError } = await supabase.from('profiles').insert({
//       id: inviteToken,              // temp profile ID (used in magic link)
//       auth_id: inviteToken,        // same as ID until user signs in
//       name: email,                 // or you can use a placeholder or inviterName
//       data: {},
//       idata: {
//         status: 'pending',
//         invited_at: new Date().toISOString(),
//         invited_by: inviterName,
//       },
//     })

//     if (insertError) {
//       console.error("❌ Failed to insert profile:", insertError)
//       throw new Error(`Database error: ${insertError.message}`)
//     }

//     // 3. Build redirect link with token → goes to /auth?token=...
//     const inviteLink = `${import.meta.env.VITE_SITE_URL}/auth?token=${inviteToken}`
//     console.log("🔗 Magic invite link:", inviteLink)

//     // 4. Send email invite using Supabase OTP
//     const { error: emailError } = await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         emailRedirectTo: inviteLink,
//       },
//     })

//     if (emailError) {
//       console.error("❌ Failed to send magic link:", emailError)
//       throw new Error(`Email send failed: ${emailError.message}`)
//     }

//     console.log("✅ Magic link sent to:", email)

//     return {
//       success: true,
//       message: "Invitation sent successfully",
//     }
//   } catch (error: any) {
//     console.error("❌ Send invite failed:", error)
//     throw error
//   }
// }


export const sendInvite = async (inviteEmail: string, inviterName: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .insert([
        {
          auth_id: null,
          name: '',
          created_at: new Date().toISOString(),
          data: {
            invite_email: inviteEmail,
            invited_by: inviterName,
            invited_at: new Date().toISOString(),
          },
          idata: {
            status: 'invited',
          },
        },
      ]);

    if (error) {
      console.error('❌ Error inserting invite record:', error);
      return { success: false };
    }

    return { success: true };
  } catch (error: any) {
    console.error('❌ Invite error:', error);
    return { success: false };
  }
};
