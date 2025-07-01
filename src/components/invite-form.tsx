// "use client"
// import { useState } from "react"
// import type React from "react"

// import { useAuth } from "@/hooks/useAuth"
// import { sendInvite } from "@/api/send-invite"
// // import { sendInvite } from "@/api/send-invite"

// export function InviteForm() {
//   const { user } = useAuth()
//   // const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [message, setMessage] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!email || !user) return

//     setIsLoading(true)
//     setMessage("")

//     try {
//       console.log("=== SENDING INVITATION ===")
//       console.log("From:", user.email)
//       console.log("To:", email)

//      const inviterName = user?.name || user?.email || 'Someone'

//       // Call the Supabase function directly (no API route needed)
//       const result = await sendInvite(email, inviterName)

//       if (result.success) {
//         setMessage(`✅ Invitation sent to ${email}!`)
//         setEmail("")
//       } else {
//         setMessage(`❌ Error: Unknown error`)
//       }
//     } catch (error: any) {
//       console.error("❌ Invite error:", error)
//       setMessage(`❌ Failed: ${error.message}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!user) {
//     return (
//       <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//         <p className="text-center text-gray-600">Please log in to send invitations</p>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Invite Team Member</h2>

//       <div className="mb-4 p-3 bg-blue-50 rounded-md">
//         <p className="text-sm text-blue-700">Logged in as: {user.email}</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-2">Email Address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="colleague@example.com"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isLoading ? "Sending..." : "Send Invitation"}
//         </button>
//       </form>

//       {message && (
//         <div className="mt-4 p-3 bg-gray-50 rounded-md">
//           <p className="text-sm">{message}</p>
//         </div>
//       )}
//     </div>
//   )
// }
// ✅ invite-form.tsx - Used by admin/superadmin to invite users
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email) {
      toast.error('Enter a valid email');
      return;
    }

    setLoading(true);
    const token = uuidv4();

    try {
      // 1. Insert invitation row into profiles with the token as temp auth_id
      const { error: insertError } = await supabase.from('profiles').insert([
        {
          email: email.toLowerCase(),
          auth_id: token,
          created_at: new Date().toISOString(),
          idata: {
            status: 'pending',
            invited_at: new Date().toISOString(),
          },
        },
      ]);

      if (insertError) throw insertError;

      // 2. Construct magic link (could be sent via email service)
      const inviteLink = `${window.location.origin}/auth?token=${token}`;

      // Example: Replace with real email logic
      console.log('Send this invite link to the user:', inviteLink);
      toast.success('Invite created. Share the link manually or send via email.');
    } catch (err: any) {
      console.error('Invite error:', err);
      toast.error(err.message || 'Failed to send invite');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Invite a New User</h2>
      <Input
        type="email"
        placeholder="user@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Button onClick={handleInvite} className="mt-4 w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Invite'}
      </Button>
    </div>
  );
};

export default InviteForm;
