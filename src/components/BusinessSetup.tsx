"use client"

import type React from "react"
import { useState } from "react"
import { useOnboarding } from "../hooks/useOnboarding"

export function BusinessSetup() {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [formData, setFormData] = useState(data.business)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.team_name || !formData.industry || !formData.billing_plan) {
      alert("Please fill in all required fields")
      return
    }

    // Update data and move to next step
    updateData("business", formData)
    nextStep()
  }

  const handleCancel = () => {
    previousStep()
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Setup</h2>
        <p className="text-gray-600">Add your business details to personalize your dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            required
            placeholder="Acme Corp"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.team_name}
            onChange={(e) => setFormData((prev) => ({ ...prev, team_name: e.target.value }))}
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <input
            type="text"
            id="industry"
            required
            placeholder="Retail"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.industry}
            onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
          />
        </div>

        {/* Domain */}
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
            Domain
          </label>
          <input
            type="url"
            id="domain"
            placeholder="www.businessname.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.domain}
            onChange={(e) => setFormData((prev) => ({ ...prev, domain: e.target.value }))}
          />
        </div>

        {/* Billing Plan */}
        <div>
          <label htmlFor="billingPlan" className="block text-sm font-medium text-gray-700 mb-2">
            Billing Plan *
          </label>
          <select
            id="billingPlan"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.billing_plan}
            onChange={(e) => setFormData((prev) => ({ ...prev, billing_plan: e.target.value }))}
          >
            <option value="">Select billing plan</option>
            <option value="free">Free Plan</option>
            <option value="basic">Basic Plan</option>
            <option value="premium">Premium Plan</option>
            <option value="enterprise">Enterprise Plan</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  )
}
