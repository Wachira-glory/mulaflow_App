// function getEnv(key: string): string | undefined {
//   // 1. Next / Node
//   if (typeof process !== "undefined" && process.env?.[key]) return process.env[key]

//   // 2. Vite / Astro / other ESM bundlers
//   //    (safely check because import.meta may not exist in Node)
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   if (typeof import.meta !== "undefined" && import.meta.env?.[key]) return import.meta.env[key]

//   // 3. next-lite sandbox: exposes vars on window.env
//   if (typeof window !== "undefined" && (window as any).env?.[key]) return (window as any).env[key]

//   return undefined
// }


// const supabaseUrl = getEnv("VITE_SUPABASE_URL") ?? getEnv("VITE_SUPABASE_URL")
// const supabaseAnonKey = getEnv("VITE_SUPABASE_ANON_KEY") ?? getEnv("VITE_SUPABASE_ANON_KEY")

// let url = supabaseUrl
// let anon = supabaseAnonKey

// import { createClient } from "@supabase/supabase-js"

// export const supabase = createClient(url, anon)

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

// // import { createClient } from "@supabase/supabase-js"

// // const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
// // const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

// // export const supabase = createClient(supabaseUrl, supabaseKey)

// // export type Database = {
// //   public: {
// //     Tables: {
// //       profiles: {
// //         Row: {
// //           id: string
// //           user_id: string
// //           name: string
// //           email: string
// //           phone: string
// //           avatar_url?: string
// //           use_case?: string
// //           created_at: string
// //           updated_at: string
// //         }
// //         Insert: {
// //           id?: string
// //           user_id: string
// //           name: string
// //           email: string
// //           phone: string
// //           avatar_url?: string
// //           use_case?: string
// //           created_at?: string
// //           updated_at?: string
// //         }
// //         Update: {
// //           id?: string
// //           user_id?: string
// //           name?: string
// //           email?: string
// //           phone?: string
// //           avatar_url?: string
// //           use_case?: string
// //           updated_at?: string
// //         }
// //       }
// //       teams: {
// //         Row: {
// //           id: string
// //           name: string
// //           industry: string
// //           domain: string
// //           billing_plan: string
// //           owner_id: string
// //           created_at: string
// //           updated_at: string
// //         }
// //         Insert: {
// //           id?: string
// //           name: string
// //           industry: string
// //           domain: string
// //           billing_plan: string
// //           owner_id: string
// //           created_at?: string
// //           updated_at?: string
// //         }
// //         Update: {
// //           id?: string
// //           name?: string
// //           industry?: string
// //           domain?: string
// //           billing_plan?: string
// //           owner_id?: string
// //           updated_at?: string
// //         }
// //       }
// //       payment_channels: {
// //         Row: {
// //           id: string
// //           team_id: string
// //           channel_type: string
// //           bank_name?: string
// //           account_name?: string
// //           account_number?: string
// //           branch_code?: string
// //           created_at: string
// //           updated_at: string
// //         }
// //         Insert: {
// //           id?: string
// //           team_id: string
// //           channel_type: string
// //           bank_name?: string
// //           account_name?: string
// //           account_number?: string
// //           branch_code?: string
// //           created_at?: string
// //           updated_at?: string
// //         }
// //         Update: {
// //           id?: string
// //           team_id?: string
// //           channel_type?: string
// //           bank_name?: string
// //           account_name?: string
// //           account_number?: string
// //           branch_code?: string
// //           updated_at?: string
// //         }
// //       }
// //       invitations: {
// //         Row: {
// //           id: string
// //           team_id: string
// //           email: string
// //           invited_by: string
// //           status: string
// //           created_at: string
// //           updated_at: string
// //         }
// //         Insert: {
// //           id?: string
// //           team_id: string
// //           email: string
// //           invited_by: string
// //           status?: string
// //           created_at?: string
// //           updated_at?: string
// //         }
// //         Update: {
// //           id?: string
// //           team_id?: string
// //           email?: string
// //           invited_by?: string
// //           status?: string
// //           updated_at?: string
// //         }
// //       }
// //     }
// //   }
// // }
import { createClient } from '@supabase/supabase-js'

// Safely get environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// ✅ Create a single Supabase client instance and reuse it everywhere
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
