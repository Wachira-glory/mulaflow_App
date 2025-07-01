// /src/api/accept-invite/route.ts


import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: Request) {
  try {
    const { teamId, email } = await request.json()

    console.log("=== ACCEPTING INVITATION ===")
    console.log("Team ID:", teamId)
    console.log("Email:", email)

    // Get the authorization header from the request
    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      console.error("No authorization header found")
      throw new Error("Authorization header required")
    }

    // Extract the token from the Bearer header
    const token = authHeader.replace("Bearer ", "")
    console.log("Token extracted, length:", token.length)

    // Get user using the token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token)

    if (userError || !user?.email) {
      console.error("Authentication error:", userError)
      throw new Error("Authentication required - please log in first")
    }

    console.log("User authenticated:", user.email)

    // Use the email from the request or fall back to user email
    const inviteEmail = email || user.email

    // 1. Verify pending invitation exists
    const { data: invitation, error: inviteError } = await supabase
      .from("invitations")
      .select("*")
      .eq("email", inviteEmail)
      .eq("team_id", teamId)
      .eq("status", "pending")
      .single()

    if (inviteError || !invitation) {
      console.error("Invitation not found:", inviteError)
      console.log("Searched for invitation with:", {
        email: inviteEmail,
        team_id: teamId,
        status: "pending",
      })

      // Let's also check what invitations exist for this email
      const { data: allInvites } = await supabase.from("invitations").select("*").eq("email", inviteEmail)

      console.log("All invitations for this email:", allInvites)

      throw new Error("No valid invitation found for this email and team")
    }

    console.log("Valid invitation found:", invitation.id)

    // 2. Check if user is already a team member
    const { data: existingMember } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", teamId)
      .eq("user_id", user.id)
      .single()

    if (existingMember) {
      console.log("User is already a team member")
      // Update invitation status anyway
      await supabase.from("invitations").update({ status: "accepted" }).eq("id", invitation.id)

      return NextResponse.json({
        success: true,
        message: "You are already a member of this team",
      })
    }

    // 3. Add user to team
    const { error: teamError } = await supabase.from("team_members").insert({
      team_id: teamId,
      user_id: user.id,
      role: "member",
    })

    if (teamError) {
      console.error("Team member insert error:", teamError)
      throw new Error(`Failed to add user to team: ${teamError.message}`)
    }

    console.log("User added to team successfully")

    // 4. Update invitation status
    const { error: updateError } = await supabase
      .from("invitations")
      .update({ status: "accepted" })
      .eq("id", invitation.id)

    if (updateError) {
      console.error("Invitation update error:", updateError)
      // Don't throw here, as the main action (adding to team) succeeded
    }

    console.log("Invitation marked as accepted")
    console.log("=== INVITATION ACCEPTED SUCCESSFULLY ===")

    return NextResponse.json({
      success: true,
      message: "Successfully joined the team!",
      teamId,
      userId: user.id,
    })
  } catch (error: any) {
    console.error("=== ACCEPT INVITE FAILED ===")
    console.error("Error:", error)
    return NextResponse.json(
      {
        error: error.message || "Failed to accept invitation",
        details: error.toString(),
      },
      { status: 500 },
    )
  }
}
