"use client"


// export type Profile = {
//   id: string
//   user_id: string
//   name: string
//   email: string
//   phone_number?: string
//   profile_picture_url?: string
//   use_case?: string
//   role: "business_owner" | "member" | "admin"
//   onboarding_completed: boolean
//   current_onboarding_step: number
//   created_at: string
//   updated_at: string
// }

// export type Team = {
//   id: string
//   profile_id: string
//   team_name: string
//   industry?: string
//   domain?: string
//   billing_plan?: string
//   created_at: string
//   updated_at: string
// }

// export type PaymentChannel = {
//   id: string
//   team_id: string
//   channel_type: "inbound" | "outbound"
//   payment_method: "bank" | "mpesa"
//   bank_name?: string
//   account_name?: string
//   account_number?: string
//   branch_code?: string
//   mpesa_number?: string
//   mpesa_name?: string
//   is_active: boolean
//   created_at: string
//   updated_at: string
// }

// export type Invitation = {
//   id: string
//   team_id: string
//   email: string
//   invited_by: string
//   status: "pending" | "accepted" | "declined"
//   created_at: string
//   updated_at: string
// }



// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { supabase } from "@/lib/supabase"
// import { PaymentChannel, Profile, Team } from "@/types"

// export const useOnboarding = () => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [profile, setProfile] = useState<Profile | null>(null)
//   const [team, setTeam] = useState<Team | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Add debugging for state changes
//   useEffect(() => {
//     console.log("currentStep changed to:", currentStep)
//   }, [currentStep])

//   useEffect(() => {
//     loadOnboardingProgress()
//   }, [])

//   const loadOnboardingProgress = async () => {
//     try {
//       setError(null)
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser()

//       if (userError) {
//         console.error("Error getting user:", userError)
//         setError("Failed to get user information")
//         return
//       }

//       if (!user) {
//         console.log("No user found")
//         setError("No authenticated user found")
//         return
//       }

//       console.log("Current user:", user.id)

//       // Get or create profile
//       let { data: profileData, error: profileError } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("user_id", user.id)
//         .single()

//       if (profileError && profileError.code !== "PGRST116") {
//         console.error("Error fetching profile:", profileError)
//         throw profileError
//       }

//       if (!profileData) {
//         console.log("Creating new profile for user:", user.id)
//         const { data: newProfile, error: insertError } = await supabase
//           .from("profiles")
//           .insert({
//             user_id: user.id,
//             name: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
//             email: user.email || "",
//             role: "business_owner",
//             current_onboarding_step: 1,
//             onboarding_completed: false,
//           })
//           .select()
//           .single()

//         if (insertError) {
//           console.error("Error creating profile:", insertError)
//           throw insertError
//         }

//         profileData = newProfile
//       }

//       console.log("Profile data:", profileData)

//       if (profileData) {
//         setProfile(profileData)
//         const step = profileData.current_onboarding_step || 1
//         console.log("Setting initial step to:", step)
//         setCurrentStep(step)

//         // Get team if exists
//         const { data: teamData } = await supabase
//           .from("teams")
//           .select("*")
//           .eq("profile_id", profileData.id)
//           .maybeSingle()

//         if (teamData) {
//           setTeam(teamData)
//         }
//       }
//     } catch (error) {
//       console.error("Error loading onboarding progress:", error)
//       setError("Failed to load onboarding progress")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateStepInDatabase = async (profileId: string, newStep: number) => {
//     const { data, error } = await supabase
//       .from("profiles")
//       .update({ current_onboarding_step: newStep })
//       .eq("id", profileId)
//       .select()
//       .single()

//     if (error) {
//       console.error("Error updating step:", error)
//       throw error
//     }

//     return data
//   }

//   const saveProfile = async (profileData: Partial<Profile>) => {
//     if (!profile) {
//       console.error("No profile found to update")
//       throw new Error("No profile found to update")
//     }

//     console.log("Saving profile data:", profileData)
//     setError(null)

//     try {
//       // First update the profile data
//       const { data, error } = await supabase
//         .from("profiles")
//         .update(profileData)
//         .eq("id", profile.id)
//         .select()
//         .single()

//       if (error) {
//         console.error("Error saving profile:", error)
//         throw error
//       }

//       if (data) {
//         console.log("Profile saved successfully:", data)
        
//         // Update the profile state
//         setProfile(data)

//         // Now update the step
//         const updatedProfile = await updateStepInDatabase(profile.id, 2)
//         setProfile(updatedProfile)
//         setCurrentStep(2)
        
//         console.log("Step updated to 2")
//       }
//     } catch (error) {
//       console.error("Database error:", error)
//       setError("Failed to save profile")
//       throw error
//     }
//   }

//   const saveTeam = async (teamData: Omit<Team, "id" | "profile_id" | "created_at" | "updated_at">) => {
//     if (!profile) {
//       throw new Error("No profile found")
//     }

//     console.log("Saving team data:", teamData)
//     setError(null)

//     try {
//       let result
//       if (team) {
//         result = await supabase.from("teams").update(teamData).eq("id", team.id).select().single()
//       } else {
//         result = await supabase
//           .from("teams")
//           .insert({
//             ...teamData,
//             profile_id: profile.id,
//           })
//           .select()
//           .single()
//       }

//       if (result.error) {
//         console.error("Error saving team:", result.error)
//         throw result.error
//       }

//       if (result.data) {
//         console.log("Team saved successfully:", result.data)
//         setTeam(result.data)

//         // Update step to 3
//         const updatedProfile = await updateStepInDatabase(profile.id, 3)
//         setProfile(updatedProfile)
//         setCurrentStep(3)
//         console.log("Step updated to 3")
//       }
//     } catch (error) {
//       console.error("Database error:", error)
//       setError("Failed to save team")
//       throw error
//     }
//   }

//   const savePaymentChannel = async (
//     channelData: Omit<PaymentChannel, "id" | "team_id" | "created_at" | "updated_at">,
//   ) => {
//     if (!team) {
//       throw new Error("No team found")
//     }

//     console.log("Saving payment channel:", channelData)
//     setError(null)

//     try {
//       const { error } = await supabase.from("payment_channels").insert({
//         ...channelData,
//         team_id: team.id,
//       })

//       if (error) {
//         console.error("Error saving payment channel:", error)
//         throw error
//       }

//       console.log("Payment channel saved successfully")

//       // Update step to 4
//       const updatedProfile = await updateStepInDatabase(profile!.id, 4)
//       setProfile(updatedProfile)
//       setCurrentStep(4)
//       console.log("Step updated to 4")
//     } catch (error) {
//       console.error("Database error:", error)
//       setError("Failed to save payment channel")
//       throw error
//     }
//   }

//   const inviteTeamMember = async (email: string) => {
//     if (!team || !profile || profile.role !== "business_owner") {
//       throw new Error("Unauthorized or missing data")
//     }

//     console.log("Inviting team member:", email)
//     setError(null)

//     try {
//       const { error } = await supabase.from("invitations").insert({
//         team_id: team.id,
//         email,
//         invited_by: profile.id,
//       })

//       if (error) {
//         console.error("Error inviting team member:", error)
//         throw error
//       }

//       console.log("Team member invited successfully")

//       // Update step to 5
//       const updatedProfile = await updateStepInDatabase(profile.id, 5)
//       setProfile(updatedProfile)
//       setCurrentStep(5)
//       console.log("Step updated to 5")
//     } catch (error) {
//       console.error("Database error:", error)
//       setError("Failed to invite team member")
//       throw error
//     }
//   }

//   const completeOnboarding = async () => {
//     if (!profile) {
//       throw new Error("No profile found")
//     }

//     console.log("Completing onboarding")
//     setError(null)

//     try {
//       const { data, error } = await supabase
//         .from("profiles")
//         .update({
//           onboarding_completed: true,
//           current_onboarding_step: 5,
//         })
//         .eq("id", profile.id)
//         .select()
//         .single()

//       if (error) {
//         console.error("Error completing onboarding:", error)
//         throw error
//       }

//       if (data) {
//         console.log("Onboarding completed successfully")
//         setProfile(data)
//       }
//     } catch (error) {
//       console.error("Database error:", error)
//       setError("Failed to complete onboarding")
//       throw error
//     }
//   }

//   const getCompletedSteps = () => {
//     const completed = []
//     if (currentStep > 1) completed.push(1)
//     if (currentStep > 2) completed.push(2)
//     if (currentStep > 3) completed.push(3)
//     if (currentStep > 4) completed.push(4)
//     if (profile?.onboarding_completed) completed.push(5)
//     return completed
//   }

//   // Manual step navigation (for debugging or manual control)
//   const goToStep = useCallback(async (step: number) => {
//     if (!profile) return
    
//     try {
//       const updatedProfile = await updateStepInDatabase(profile.id, step)
//       setProfile(updatedProfile)
//       setCurrentStep(step)
//       console.log(`Manually navigated to step ${step}`)
//     } catch (error) {
//       console.error("Error navigating to step:", error)
//       setError(`Failed to navigate to step ${step}`)
//     }
//   }, [profile])

//   return {
//     currentStep,
//     completedSteps: getCompletedSteps(),
//     profile,
//     team,
//     loading,
//     error,
//     saveProfile,
//     saveTeam,
//     savePaymentChannel,
//     inviteTeamMember,
//     completeOnboarding,
//     setCurrentStep,
//     goToStep, // Add this for manual navigation
//   }
// }




// // hooks/useOnboarding.tsx
// import { useState, useEffect, createContext, useContext } from 'react';
// import { supabase } from '@/lib/supabase';
// import { useAuth } from './useAuth';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// interface Profile {
//   id?: string;
//   user_id?: string;
//   name?: string;
//   email?: string;
//   phone_number?: string;
//   use_case?: string;
//   created_at?: string;
//   updated_at?: string;
//   onboarding_completed?: boolean;
// }

// interface Team {
//   id?: string;
//   user_id?: string;
//   team_name?: string;
//   industry?: string;
//   domain?: string;
//   billing_plan?: string;
//   created_at?: string;
//   updated_at?: string;
// }

// interface Business {
//   id?: string;
//   user_id?: string;
//   business_name?: string;
//   industry?: string;
//   domain?: string;
//   billing_plan?: string;
//   created_at?: string;
//   updated_at?: string;
// }

// interface PaymentChannel {
//   id?: string;
//   user_id?: string;
//   channel_type?: 'inbound' | 'outbound';
//   payment_method?: 'bank' | 'mpesa';
//   bank_name?: string;
//   account_name?: string;
//   account_number?: string;
//   branch_code?: string;
//   mpesa_number?: string;
//   mpesa_name?: string;
//   created_at?: string;
//   updated_at?: string;
// }

// interface OnboardingContextProps {
//   currentStep: number;
//   completedSteps: number[];
//   profile: Profile | null;
//   team: Team | null;
//   business: Business | null;
//   paymentChannels: PaymentChannel[];
//   loading: boolean;
//   error: string | null;
//   setCurrentStep: (step: number) => void;
//   saveProfile: (profileData: Partial<Profile>) => Promise<void>;
//   saveTeam: (teamData: Partial<Team>) => Promise<void>;
//   saveBusiness: (businessData: Partial<Business>) => Promise<void>;
//   savePaymentChannel: (channelData: Partial<PaymentChannel>) => Promise<void>;
//   completeOnboarding: () => Promise<void>;
//   resetOnboarding: () => void;
// }

// const OnboardingContext = createContext<OnboardingContextProps>({
//   currentStep: 1,
//   completedSteps: [],
//   profile: null,
//   team: null,
//   business: null,
//   paymentChannels: [],
//   loading: false,
//   error: null,
//   setCurrentStep: () => {},
//   saveProfile: async () => {},
//   saveTeam: async () => {},
//   saveBusiness: async () => {},
//   savePaymentChannel: async () => {},
//   completeOnboarding: async () => {},
//   resetOnboarding: () => {},
// });

// export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedSteps, setCompletedSteps] = useState<number[]>([]);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [team, setTeam] = useState<Team | null>(null);
//   const [business, setBusiness] = useState<Business | null>(null);
//   const [paymentChannels, setPaymentChannels] = useState<PaymentChannel[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (user?.id) {
//       loadOnboardingData();
//     }
//   }, [user?.id]);

//   const loadOnboardingData = async () => {
//     if (!user?.id) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const { data: profileData } = await supabase
//         .from('user_profiles')
//         .select('*')
//         .eq('user_id', user.id)
//         .single();

//       if (profileData) {
//         setProfile(profileData);
//         if (!completedSteps.includes(1)) setCompletedSteps(prev => [...prev, 1]);
//       }

//       const { data: teamData } = await supabase
//         .from('teams')
//         .select('*')
//         .eq('user_id', user.id)
//         .single();

//       if (teamData) {
//         setTeam(teamData);
//         if (!completedSteps.includes(2)) setCompletedSteps(prev => [...prev, 2]);
//       }

//       const { data: businessData } = await supabase
//         .from('businesses')
//         .select('*')
//         .eq('user_id', user.id)
//         .single();

//       if (businessData) {
//         setBusiness(businessData);
//         if (!completedSteps.includes(2)) setCompletedSteps(prev => [...prev, 2]);
//       }

//       const { data: channelsData } = await supabase
//         .from('payment_channels')
//         .select('*')
//         .eq('user_id', user.id);

//       if (channelsData && channelsData.length > 0) {
//         setPaymentChannels(channelsData);
//         if (!completedSteps.includes(3)) setCompletedSteps(prev => [...prev, 3]);
//       }

//       const maxCompletedStep = Math.max(...completedSteps, 0);
//       if (maxCompletedStep < 5) {
//         setCurrentStep(maxCompletedStep + 1);
//       }
//     } catch (error) {
//       console.error('Error loading onboarding data:', error);
//       setError('Failed to load onboarding data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveProfile = async (profileData: Partial<Profile>) => {
//     if (!user?.id) throw new Error('User not authenticated');

//     setLoading(true);
//     setError(null);

//     try {
//       const dataToSave = {
//         user_id: user.id,
//         name: profileData.name,
//         email: profileData.email || user.email,
//         phone_number: profileData.phone_number,
//         use_case: profileData.use_case,
//         updated_at: new Date().toISOString(),
//       };

//       const { data, error } = await supabase
//         .from('user_profiles')
//         .upsert(dataToSave)
//         .select()
//         .single();

//       if (error) throw new Error('Failed to save profile');

//       setProfile(data);
//       if (!completedSteps.includes(1)) setCompletedSteps(prev => [...prev, 1]);
//       setCurrentStep(2);
//       toast.success('Profile saved successfully!');
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Error saving profile');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveTeam = async (teamData: Partial<Team>) => {
//     if (!user?.id) throw new Error('User not authenticated');

//     setLoading(true);
//     setError(null);

//     try {
//       const dataToSave = {
//         user_id: user.id,
//         team_name: teamData.team_name,
//         industry: teamData.industry,
//         domain: teamData.domain,
//         billing_plan: teamData.billing_plan,
//         updated_at: new Date().toISOString(),
//       };

//       const { data, error } = await supabase
//         .from('teams')
//         .upsert(dataToSave)
//         .select()
//         .single();

//       if (error) throw new Error('Failed to save team information');

//       setTeam(data);
//       if (!completedSteps.includes(2)) setCompletedSteps(prev => [...prev, 2]);
//       setCurrentStep(3);
//       toast.success('Team information saved successfully!');
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Error saving team information');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveBusiness = async (businessData: Partial<Business>) => {
//     if (!user?.id) throw new Error('User not authenticated');

//     setLoading(true);
//     setError(null);

//     try {
//       const dataToSave = {
//         user_id: user.id,
//         business_name: businessData.business_name,
//         industry: businessData.industry,
//         domain: businessData.domain,
//         billing_plan: businessData.billing_plan,
//         updated_at: new Date().toISOString(),
//       };

//       const { data, error } = await supabase
//         .from('businesses')
//         .upsert(dataToSave)
//         .select()
//         .single();

//       if (error) throw new Error('Failed to save business information');

//       setBusiness(data);
//       if (!completedSteps.includes(2)) setCompletedSteps(prev => [...prev, 2]);
//       setCurrentStep(3);
//       toast.success('Business information saved successfully!');
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Error saving business information');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const savePaymentChannel = async (channelData: Partial<PaymentChannel>) => {
//     if (!user?.id) throw new Error('User not authenticated');

//     setLoading(true);
//     setError(null);

//     try {
//       const dataToSave = {
//         user_id: user.id,
//         channel_type: channelData.channel_type,
//         payment_method: channelData.payment_method,
//         bank_name: channelData.bank_name,
//         account_name: channelData.account_name,
//         account_number: channelData.account_number,
//         branch_code: channelData.branch_code,
//         mpesa_number: channelData.mpesa_number,
//         mpesa_name: channelData.mpesa_name,
//         updated_at: new Date().toISOString(),
//       };

//       const { data, error } = await supabase
//         .from('payment_channels')
//         .insert(dataToSave)
//         .select()
//         .single();

//       if (error) throw new Error('Failed to save payment channel');

//       setPaymentChannels(prev => [...prev, data]);
//       if (!completedSteps.includes(3)) setCompletedSteps(prev => [...prev, 3]);
//       setCurrentStep(4);
//       toast.success('Payment channel added successfully!');
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Error saving payment channel');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const completeOnboarding = async () => {
//     if (!user?.id) throw new Error('User not authenticated');

//     setLoading(true);
//     setError(null);

//     try {
//       const { error } = await supabase
//         .from('user_profiles')
//         .update({
//           onboarding_completed: true,
//           updated_at: new Date().toISOString(),
//         })
//         .eq('user_id', user.id);

//       if (error) throw new Error('Failed to complete onboarding');

//       setCompletedSteps([1, 2, 3, 4, 5]);
//       setCurrentStep(5);

//       toast.success('Onboarding completed successfully!');
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 1000);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Error completing onboarding');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetOnboarding = () => {
//     setCurrentStep(1);
//     setCompletedSteps([]);
//     setProfile(null);
//     setTeam(null);
//     setBusiness(null);
//     setPaymentChannels([]);
//     setError(null);
//   };

//   const handleSetCurrentStep = (step: number) => {
//     setCurrentStep(step);
//     setError(null);
//   };

//   return (
//     <OnboardingContext.Provider
//       value={{
//         currentStep,
//         completedSteps,
//         profile,
//         team,
//         business,
//         paymentChannels,
//         loading,
//         error,
//         setCurrentStep: handleSetCurrentStep,
//         saveProfile,
//         saveTeam,
//         saveBusiness,
//         savePaymentChannel,
//         completeOnboarding,
//         resetOnboarding,
//       }}
//     >
//       {children}
//     </OnboardingContext.Provider>
//   );
// };

// export const useOnboarding = () => useContext(OnboardingContext);


// //hooks/useOnboarding.tsx
// "use client"

// import { useState, useEffect } from "react"
// // import { supabase } from "../../lib/supabase"
// import { supabase } from "@/lib/supabase"

// export const useOnboarding = () => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [user, setUser] = useState<any>(null)

//   useEffect(() => {
//     getCurrentUser()
//   }, [])

//   const getCurrentUser = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()
//     setUser(user)

//     if (user) {
//       // Get current step from profile
//       const { data: profile } = await supabase
//         .from("profiles")
//         .select("current_onboarding_step, onboarding_completed")
//         .eq("user_id", user.id)
//         .single()

//       if (profile) {
//         setCurrentStep(profile.current_onboarding_step || 1)
//       }
//     }
//   }

//   const saveProfile = async (profileData: any) => {
//     if (!user) return

//     setLoading(true)
//     try {
//       const { error } = await supabase.from("profiles").upsert({
//         user_id: user.id,
//         name: profileData.name,
//         email: profileData.email,
//         phone_number: profileData.phone_number,
//         use_case: profileData.use_case,
//         current_onboarding_step: 2,
//         updated_at: new Date().toISOString(),
//       })

//       if (error) throw error
//       setCurrentStep(2)
//     } catch (error) {
//       console.error("Error saving profile:", error)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const saveBusiness = async (businessData: any) => {
//     if (!user) return

//     setLoading(true)
//     try {
//       const { error } = await supabase.from("businesses").upsert({
//         user_id: user.id,
//         business_name: businessData.business_name,
//         industry: businessData.industry,
//         domain: businessData.domain,
//         billing_plan: businessData.billing_plan,
//         updated_at: new Date().toISOString(),
//       })

//       if (error) throw error

//       // Update profile step
//       await supabase.from("profiles").update({ current_onboarding_step: 3 }).eq("user_id", user.id)

//       setCurrentStep(3)
//     } catch (error) {
//       console.error("Error saving business:", error)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const savePaymentChannel = async (channelData: any) => {
//     if (!user) return

//     setLoading(true)
//     try {
//       const { error } = await supabase.from("payment_channels").insert({
//         user_id: user.id,
//         channel_type: channelData.channel_type,
//         payment_method: channelData.payment_method,
//         bank_name: channelData.bank_name,
//         account_name: channelData.account_name,
//         account_number: channelData.account_number,
//         branch_code: channelData.branch_code,
//         mpesa_number: channelData.mpesa_number,
//         mpesa_name: channelData.mpesa_name,
//       })

//       if (error) throw error

//       // Update profile step
//       await supabase.from("profiles").update({ current_onboarding_step: 4 }).eq("user_id", user.id)

//       setCurrentStep(4)
//     } catch (error) {
//       console.error("Error saving payment channel:", error)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const inviteMember = async (email: string) => {
//     if (!user) return

//     setLoading(true)
//     try {
//       const { error } = await supabase.from("invitations").insert({
//         user_id: user.id,
//         email: email,
//         status: "pending",
//       })

//       if (error) throw error

//       // Update profile step
//       await supabase.from("profiles").update({ current_onboarding_step: 5 }).eq("user_id", user.id)

//       setCurrentStep(5)
//     } catch (error) {
//       console.error("Error inviting member:", error)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const completeOnboarding = async () => {
//     if (!user) return

//     setLoading(true)
//     try {
//       const { error } = await supabase
//         .from("profiles")
//         .update({
//           onboarding_completed: true,
//           current_onboarding_step: 5,
//         })
//         .eq("user_id", user.id)

//       if (error) throw error
//     } catch (error) {
//       console.error("Error completing onboarding:", error)
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   const getCompletedSteps = () => {
//     const completed = []
//     if (currentStep > 1) completed.push(1)
//     if (currentStep > 2) completed.push(2)
//     if (currentStep > 3) completed.push(3)
//     if (currentStep > 4) completed.push(4)
//     if (currentStep >= 5) completed.push(5)
//     return completed
//   }

//   return {
//     currentStep,
//     completedSteps: getCompletedSteps(),
//     loading,
//     saveProfile,
//     saveBusiness,
//     savePaymentChannel,
//     inviteMember,
//     completeOnboarding,
//   }
// }


"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { supabase } from "../lib/supabase"

interface OnboardingData {
  profile: {
    name: string
    email: string
    phone_number: string
    profile_picture_url?: string
    use_case?: string
  }
  business: {
    team_name: string
    industry: string
    domain: string
    billing_plan: string
  }
  paymentChannels: Array<{
    channel_type: "inbound" | "outbound"
    payment_method: "bank" | "mpesa"
    bank_name?: string
    account_name?: string
    account_number?: string
    branch_code?: string
    mpesa_number?: string
    mpesa_name?: string
  }>
  invitations: string[]
}

interface OnboardingContextType {
  currentStep: number
  setCurrentStep: (step: number) => void
  data: OnboardingData
  updateData: (step: keyof OnboardingData, newData: any) => void
  nextStep: () => void
  previousStep: () => void
  addPaymentChannel: (channel: any) => void
  addInvitation: (email: string) => void
  removeInvitation: (email: string) => void
  completeOnboarding: () => Promise<boolean>
  isLoading: boolean
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    profile: {
      name: "",
      email: "",
      phone_number: "",
      profile_picture_url: "",
      use_case: "",
    },
    business: {
      team_name: "",
      industry: "",
      domain: "",
      billing_plan: "",
    },
    paymentChannels: [],
    invitations: [],
  })

  const updateData = (step: keyof OnboardingData, newData: any) => {
    setData((prev) => ({
      ...prev,
      [step]: newData,
    }))
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addPaymentChannel = (channel: any) => {
    setData((prev) => ({
      ...prev,
      paymentChannels: [...prev.paymentChannels, channel],
    }))
  }

  const addInvitation = (email: string) => {
    setData((prev) => ({
      ...prev,
      invitations: [...prev.invitations, email],
    }))
  }

  const removeInvitation = (email: string) => {
    setData((prev) => ({
      ...prev,
      invitations: prev.invitations.filter((inv) => inv !== email),
    }))
  }

  const completeOnboarding = async (): Promise<boolean> => {
    setIsLoading(true)
    try {
      console.log("Starting onboarding completion...")
      console.log("Data to save:", data)

      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      console.log("User authenticated:", user.id)

      // Step 1: Save Profile
      console.log("Saving profile...")
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .upsert({
          user_id: user.id,
          name: data.profile.name,
          email: data.profile.email,
          phone_number: data.profile.phone_number,
          profile_picture_url: data.profile.profile_picture_url,
          use_case: data.profile.use_case,
          role: "business_owner" as const,
          onboarding_completed: true,
          current_onboarding_step: 5,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (profileError) {
        console.error("Profile error:", profileError)
        throw profileError
      }

      console.log("Profile saved:", profileData)

      // Step 2: Save Team/Business
      console.log("Saving team...")
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert({
          profile_id: profileData.id,
          team_name: data.business.team_name,
          industry: data.business.industry,
          domain: data.business.domain,
          billing_plan: data.business.billing_plan,
        })
        .select()
        .single()

      if (teamError) {
        console.error("Team error:", teamError)
        throw teamError
      }

      console.log("Team saved:", teamData)

      // Step 3: Save Payment Channels
      if (data.paymentChannels.length > 0) {
        console.log("Saving payment channels...")
        const channelsToInsert = data.paymentChannels.map((channel) => ({
          team_id: teamData.id,
          channel_type: channel.channel_type,
          payment_method: channel.payment_method,
          bank_name: channel.bank_name,
          account_name: channel.account_name,
          account_number: channel.account_number,
          branch_code: channel.branch_code,
          mpesa_number: channel.mpesa_number,
          mpesa_name: channel.mpesa_name,
          is_active: true,
        }))

        const { error: channelsError } = await supabase.from("payment_channels").insert(channelsToInsert)

        if (channelsError) {
          console.error("Payment channels error:", channelsError)
          throw channelsError
        }

        console.log("Payment channels saved")
      }

      // Step 4: Send Invitations
      if (data.invitations.length > 0) {
        console.log("Sending invitations...")
        const invitationsToInsert = data.invitations.map((email) => ({
          team_id: teamData.id,
          email: email,
          invited_by: user.id,
          status: "pending" as const,
        }))

        const { error: invitationsError } = await supabase.from("invitations").insert(invitationsToInsert)

        if (invitationsError) {
          console.error("Invitations error:", invitationsError)
          throw invitationsError
        }

        console.log("Invitations sent")
      }

      console.log("Onboarding completed successfully!")
      return true
    } catch (error) {
      console.error("Error completing onboarding:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        data,
        updateData,
        nextStep,
        previousStep,
        addPaymentChannel,
        addInvitation,
        removeInvitation,
        completeOnboarding,
        isLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
