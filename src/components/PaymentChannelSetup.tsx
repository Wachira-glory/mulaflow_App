"use client"

import type React from "react"
import { useState } from "react"
import { useOnboarding } from "../hooks/useOnboarding"

export function PaymentChannelSetup() {
  const { addPaymentChannel, nextStep, previousStep } = useOnboarding()
  const [channelType, setChannelType] = useState<"Bank" | "M-pesa">("Bank")
  const [formData, setFormData] = useState({
    channel_type: "inbound" as "inbound" | "outbound",
    payment_method: "bank" as "bank" | "mpesa",
    bank_name: "",
    account_name: "",
    account_number: "",
    branch_code: "",
    mpesa_number: "",
    mpesa_name: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate based on payment method
    if (channelType === "Bank") {
      if (!formData.bank_name || !formData.account_name || !formData.account_number) {
        alert("Please fill in all required bank details")
        return
      }
    } else {
      if (!formData.mpesa_number || !formData.mpesa_name) {
        alert("Please fill in all required M-Pesa details")
        return
      }
    }

    const channelData = {
      ...formData,
      payment_method: channelType.toLowerCase() as "bank" | "mpesa",
    }

    // Add payment channel to temporary data
    addPaymentChannel(channelData)

    // Move to next step
    nextStep()
  }

  const handleCancel = () => {
    previousStep()
  }

  const handleSkip = () => {
    // Allow skipping payment channel setup
    nextStep()
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Payment Channel</h2>
        <p className="text-gray-600">Add your bank account or M-Pesa details to receive payments.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Channel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Channel Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.channel_type}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, channel_type: e.target.value as "inbound" | "outbound" }))
            }
          >
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>

        {/* Bank/M-pesa Toggle */}
        <div>
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                channelType === "Bank" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setChannelType("Bank")}
            >
              Bank
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                channelType === "M-pesa" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setChannelType("M-pesa")}
            >
              M-pesa
            </button>
          </div>
        </div>

        {/* Bank Fields */}
        {channelType === "Bank" && (
          <>
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name *
              </label>
              <input
                type="text"
                id="bankName"
                required
                placeholder="e.g. Equity"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.bank_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, bank_name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">
                Account Name *
              </label>
              <input
                type="text"
                id="accountName"
                required
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.account_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, account_name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Account Number *
              </label>
              <input
                type="text"
                id="accountNumber"
                required
                placeholder="e.g. 2105158242"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.account_number}
                onChange={(e) => setFormData((prev) => ({ ...prev, account_number: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="branchCode" className="block text-sm font-medium text-gray-700 mb-2">
                Branch Code (optional)
              </label>
              <input
                type="text"
                id="branchCode"
                placeholder="Enter branch code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.branch_code}
                onChange={(e) => setFormData((prev) => ({ ...prev, branch_code: e.target.value }))}
              />
            </div>
          </>
        )}

        {/* M-pesa Fields */}
        {channelType === "M-pesa" && (
          <>
            <div>
              <label htmlFor="mpesaName" className="block text-sm font-medium text-gray-700 mb-2">
                Account Name *
              </label>
              <input
                type="text"
                id="mpesaName"
                required
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.mpesa_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, mpesa_name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Number *
              </label>
              <input
                type="tel"
                id="mpesaNumber"
                required
                placeholder="e.g. +254 700 000 000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.mpesa_number}
                onChange={(e) => setFormData((prev) => ({ ...prev, mpesa_number: e.target.value }))}
              />
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Channel
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Skip
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
