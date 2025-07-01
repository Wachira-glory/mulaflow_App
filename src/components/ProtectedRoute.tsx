"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "@/hooks/useAuth"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireOnboarding?: boolean
}

export function ProtectedRoute({ children, requireOnboarding = true }: ProtectedRouteProps) {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        // Check if user has a profile (indicates onboarding started/completed)
        const { data: profile } = await supabase.from("profiles").select("id").eq("user_id", user.id).single()

        // Check if user has a team (indicates business setup completed)
        const { data: team } = await supabase.from("teams").select("id").eq("owner_id", user.id).single()

        setHasCompletedOnboarding(!!(profile && team))
      } catch (error) {
        console.error("Error checking onboarding status:", error)
        setHasCompletedOnboarding(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkOnboardingStatus()
  }, [user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  if (requireOnboarding && !hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />
  }

  if (!requireOnboarding && hasCompletedOnboarding) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
