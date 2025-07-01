"use client"

import type React from "react"
import { useOnboarding } from "../hooks/useOnboarding"

const steps = [
  { number: 1, title: "Setup profile", completed: false },
  { number: 2, title: "Business setup", completed: false },
  { number: 3, title: "Setup payment channel", completed: false },
  { number: 4, title: "Invite members", completed: false },
  { number: 5, title: "Complete setup", completed: false },
]

interface OnboardingLayoutProps {
  children: React.ReactNode
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const { currentStep } = useOnboarding()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-cyan-400 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel - Steps */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-900 font-bold text-xl">M</span>
              </div>
              <h1 className="text-white text-2xl font-bold">Mulaflow</h1>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-white text-3xl font-bold mb-2">
              {currentStep <= 4 ? "Getting Started with Mulaflow" : "Onboarding"}
            </h2>
            <p className="text-blue-100 text-lg">Setup to help you request and receive payments with ease.</p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mr-4 ${
                    currentStep > step.number
                      ? "bg-green-500 border-green-500"
                      : currentStep === step.number
                        ? "bg-white border-white text-blue-900"
                        : "border-blue-300 text-blue-300"
                  }`}
                >
                  {currentStep > step.number ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </div>
                <span className={`text-lg ${currentStep >= step.number ? "text-white" : "text-blue-300"}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && <div className="absolute ml-5 mt-10 w-0.5 h-6 bg-blue-300"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-1/2 bg-white p-12 flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
