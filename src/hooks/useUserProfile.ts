// //hooks/useUserProfile.ts

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';

// interface UserProfile {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   country: string;
// }

// interface ProfileUpdateData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   country: string;
// }

// interface PasswordUpdateData {
//   currentPassword: string;
//   newPassword: string;
// }

// export const useUserProfile = () => {
//   return useQuery({
//     queryKey: ['userProfile'],
//     queryFn: async (): Promise<UserProfile | null> => {
//       const { data: { user } } = await supabase.auth.getUser();
      
//       if (!user) {
//         throw new Error('Not authenticated');
//       }

//       const { data, error } = await supabase
//         .from('users')
//         .select('*')
//         .eq('id', user.id)
//         .single();

//       if (error) {
//         console.error('Error fetching user profile:', error);
//         throw error;
//       }

//       return data;
//     },
//   });
// };

// export const useUpdateProfile = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (profileData: ProfileUpdateData) => {
//       const { data: { user } } = await supabase.auth.getUser();
      
//       if (!user) {
//         throw new Error('Not authenticated');
//       }

//       console.log('Updating profile with data:', profileData);

//       // Update user profile in users table - removed .single() to avoid the 406 error
//       const { data, error } = await supabase
//         .from('users')
//         .update({
//           first_name: profileData.first_name,
//           last_name: profileData.last_name,
//           phone: profileData.phone,
//           country: profileData.country,
//           updated_at: new Date().toISOString()
//         })
//         .eq('id', user.id)
//         .select();

//       if (error) {
//         console.error('Error updating profile:', error);
//         throw new Error(error.message || 'Failed to update profile');
//       }

//       // Update email in auth if changed
//       if (profileData.email !== user.email) {
//         const { error: emailError } = await supabase.auth.updateUser({
//           email: profileData.email
//         });

//         if (emailError) {
//           console.error('Error updating email:', emailError);
//           throw new Error(emailError.message || 'Failed to update email');
//         }
//       }

//       return data?.[0] || data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['userProfile'] });
//     },
//   });
// };

// export const useUpdatePassword = () => {
//   return useMutation({
//     mutationFn: async (passwordData: PasswordUpdateData) => {
//       // First verify current password by trying to sign in
//       const { data: { user } } = await supabase.auth.getUser();
      
//       if (!user?.email) {
//         throw new Error('User email not found');
//       }

//       // Update password directly without verification (Supabase handles this)
//       const { error } = await supabase.auth.updateUser({
//         password: passwordData.newPassword
//       });

//       if (error) {
//         console.error('Error updating password:', error);
//         throw new Error(error.message || 'Failed to update password');
//       }

//       return { success: true };
//     },
//   });
// };


//hooks/useUserProfile.ts
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  use_case?: string
  current_onboarding_step?: number
  onboarding_completed?: boolean
  created_at?: string
  updated_at?: string
}

interface OnboardingProfileData {
  name: string
  email: string
  phone_number?: string
  use_case?: string
}

interface Team {
  id?: string
  user_id?: string
  team_name?: string
  industry?: string
  domain?: string
  billing_plan?: string
  created_at?: string
  updated_at?: string
}

interface PaymentChannel {
  id?: string
  user_id?: string
  channel_type?: "inbound" | "outbound"
  payment_method?: "bank" | "mpesa"
  bank_name?: string
  account_name?: string
  account_number?: string
  branch_code?: string
  mpesa_number?: string
  mpesa_name?: string
  created_at?: string
  updated_at?: string
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async (): Promise<UserProfile | null> => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          throw new Error("Not authenticated")
        }

        const { data, error } = await supabase.from("users").select("*").eq("id", user.id).maybeSingle()

        if (error) {
          console.error("Error fetching user profile:", error)
          throw new Error(`Database error: ${error.message}`)
        }

        return data
      } catch (error) {
        console.error("Profile fetch error:", error)
        throw error
      }
    },
    staleTime: 0, // Always refetch
    refetchOnWindowFocus: true,
  })
}

// Simple onboarding hook
export const useOnboarding = () => {
  const { data: profile, isLoading, refetch } = useUserProfile()
  const queryClient = useQueryClient()

  const currentStep = profile?.current_onboarding_step || 1
  const completedSteps = []

  // Calculate completed steps
  if (profile?.first_name && profile?.last_name) completedSteps.push(1)
  if (currentStep > 2) completedSteps.push(2)
  if (currentStep > 3) completedSteps.push(3)
  if (currentStep > 4) completedSteps.push(4)
  if (profile?.onboarding_completed) completedSteps.push(5)

  console.log("🔥 SIMPLE ONBOARDING: currentStep =", currentStep, "profile =", profile)

  // Save profile function
  const saveProfile = async (profileData: OnboardingProfileData) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      console.log("🚀 SAVING PROFILE:", profileData)

      const nameParts = profileData.name.split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      const dataToSave = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: profileData.email,
        phone: profileData.phone_number || "",
        country: "",
        use_case: profileData.use_case,
        current_onboarding_step: 2,
        onboarding_completed: false,
        updated_at: new Date().toISOString(),
      }

      const { data: existingUser } = await supabase.from("users").select("id").eq("id", user.id).maybeSingle()

      let result
      if (existingUser) {
        const { data, error } = await supabase.from("users").update(dataToSave).eq("id", user.id).select().single()
        if (error) throw new Error(error.message)
        result = data
      } else {
        const { data, error } = await supabase
          .from("users")
          .insert({ ...dataToSave, created_at: new Date().toISOString() })
          .select()
          .single()
        if (error) throw new Error(error.message)
        result = data
      }

      console.log("✅ PROFILE SAVED:", result)

      // Force immediate refetch
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] })
      await refetch()

      toast.success("Profile saved successfully!")
      return result
    } catch (error) {
      console.error("❌ PROFILE SAVE ERROR:", error)
      toast.error("Failed to save profile")
      throw error
    }
  }

  // Save team function
  const saveTeam = async (teamData: Partial<Team>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      console.log("🚀 SAVING TEAM:", teamData)

      const dataToSave = {
        user_id: user.id,
        team_name: teamData.team_name,
        industry: teamData.industry,
        domain: teamData.domain,
        billing_plan: teamData.billing_plan,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase
        .from("teams")
        .upsert(dataToSave, { onConflict: "user_id" })
        .select()
        .single()

      if (error) throw new Error(error.message)

      // Update user's step
      await supabase.from("users").update({ current_onboarding_step: 3 }).eq("id", user.id)

      console.log("✅ TEAM SAVED:", data)

      // Force refetch
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] })
      await refetch()

      toast.success("Team information saved!")
      return data
    } catch (error) {
      console.error("❌ TEAM SAVE ERROR:", error)
      toast.error("Failed to save team")
      throw error
    }
  }

  // Save payment channel function
  const savePaymentChannel = async (channelData: Partial<PaymentChannel>) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      console.log("🚀 SAVING PAYMENT CHANNEL:", channelData)

      const dataToSave = {
        user_id: user.id,
        channel_type: channelData.channel_type,
        payment_method: channelData.payment_method,
        bank_name: channelData.bank_name,
        account_name: channelData.account_name,
        account_number: channelData.account_number,
        branch_code: channelData.branch_code,
        mpesa_number: channelData.mpesa_number,
        mpesa_name: channelData.mpesa_name,
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase.from("payment_channels").insert(dataToSave).select().single()
      if (error) throw new Error(error.message)

      // Update user's step
      await supabase.from("users").update({ current_onboarding_step: 4 }).eq("id", user.id)

      console.log("✅ PAYMENT CHANNEL SAVED:", data)

      // Force refetch
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] })
      await refetch()

      toast.success("Payment channel added!")
      return data
    } catch (error) {
      console.error("❌ PAYMENT CHANNEL SAVE ERROR:", error)
      toast.error("Failed to save payment channel")
      throw error
    }
  }

  // Complete onboarding function
  const completeOnboarding = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase
        .from("users")
        .update({
          onboarding_completed: true,
          current_onboarding_step: 5,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw new Error(error.message)

      // Force refetch
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] })
      await refetch()

      toast.success("Onboarding completed!")
    } catch (error) {
      console.error("❌ COMPLETE ONBOARDING ERROR:", error)
      toast.error("Failed to complete onboarding")
      throw error
    }
  }

  return {
    currentStep,
    completedSteps,
    profile,
    loading: isLoading,
    saveProfile,
    saveTeam,
    savePaymentChannel,
    completeOnboarding,
  }
}

// Add these missing exports at the end of the file

interface ProfileUpdateData {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  use_case?: string
}

interface PasswordUpdateData {
  currentPassword: string
  newPassword: string
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { refetch } = useUserProfile()

  return {
    mutateAsync: async (profileData: ProfileUpdateData) => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          throw new Error("Not authenticated")
        }

        console.log("Updating profile with data:", profileData)

        const { data: existingUser } = await supabase.from("users").select("id").eq("id", user.id).single()

        let result

        if (existingUser) {
          const { data, error } = await supabase
            .from("users")
            .update({
              first_name: profileData.first_name,
              last_name: profileData.last_name,
              phone: profileData.phone,
              country: profileData.country,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id)
            .select()
            .single()

          if (error) {
            console.error("Error updating profile:", error)
            throw new Error(error.message || "Failed to update profile")
          }
          result = data
        } else {
          const { data, error } = await supabase
            .from("users")
            .insert({
              id: user.id,
              first_name: profileData.first_name,
              last_name: profileData.last_name,
              email: profileData.email,
              phone: profileData.phone,
              country: profileData.country,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .select()
            .single()

          if (error) {
            console.error("Error creating profile:", error)
            throw new Error(error.message || "Failed to create profile")
          }
          result = data
        }

        // Update email in auth if changed
        if (profileData.email !== user.email) {
          const { error: emailError } = await supabase.auth.updateUser({
            email: profileData.email,
          })

          if (emailError) {
            console.error("Error updating email:", emailError)
            throw new Error(emailError.message || "Failed to update email")
          }
        }

        await queryClient.invalidateQueries({ queryKey: ["userProfile"] })
        await refetch()

        return result
      } catch (error) {
        console.error("Profile update error:", error)
        throw error
      }
    },
    isPending: false, // Simplified - you can add proper loading state if needed
  }
}

export const useUpdatePassword = () => {
  return {
    mutateAsync: async (passwordData: PasswordUpdateData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user?.email) {
        throw new Error("User email not found")
      }

      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      })

      if (error) {
        console.error("Error updating password:", error)
        throw new Error(error.message || "Failed to update password")
      }

      return { success: true }
    },
    isPending: false, // Simplified - you can add proper loading state if needed
  }
}
