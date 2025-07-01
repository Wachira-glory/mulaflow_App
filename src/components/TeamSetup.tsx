// //src/components/TeamSetup.tsx

// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useOnboarding } from "../hooks/useOnboarding"

// export const TeamSetup: React.FC = () => {
//   const { team, saveTeam } = useOnboarding()
//   const [formData, setFormData] = useState({
//     team_name: team?.team_name || "",
//     industry: team?.industry || "",
//     domain: team?.domain || "",
//     billing_plan: team?.billing_plan || "",
//   })
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       await saveTeam(formData)
//     } catch (error) {
//       console.error("Error saving team:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const industries = [
//     "Retail",
//     "Technology",
//     "Healthcare",
//     "Education",
//     "Finance",
//     "Manufacturing",
//     "Hospitality",
//     "Real Estate",
//     "Consulting",
//     "Other",
//   ]

//   const billingPlans = ["Starter - Free", "Professional - $29/month", "Business - $99/month", "Enterprise - Custom"]

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Setup</h2>
//       <p className="text-gray-600 mb-8">Add your team details to personalize your dashboard</p>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Team Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
//           <input
//             type="text"
//             value={formData.team_name}
//             onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="John Doe"
//             required
//           />
//         </div>

//         {/* Industry */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
//           <select
//             value={formData.industry}
//             onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select industry</option>
//             {industries.map((industry) => (
//               <option key={industry} value={industry}>
//                 {industry}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Domain */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
//           <input
//             type="url"
//             value={formData.domain}
//             onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="www.teamname.com"
//           />
//         </div>

//         {/* Billing Plan */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Billing Plan</label>
//           <select
//             value={formData.billing_plan}
//             onChange={(e) => setFormData({ ...formData, billing_plan: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select billing plan</option>
//             {billingPlans.map((plan) => (
//               <option key={plan} value={plan}>
//                 {plan}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-4 pt-4">
//           <button type="button" className="px-6 py-2 text-gray-600 hover:text-gray-800">
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }



//src/components/TeamSetup.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { useOnboarding } from "../hooks/useUserProfile"

export const TeamSetup: React.FC = () => {
  const { currentStep, loading, saveTeam } = useOnboarding()
  const [formData, setFormData] = useState({
    team_name: "",
    industry: "",
    domain: "",
    billing_plan: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await saveTeam(formData)
      console.log("Team saved successfully")
    } catch (error) {
      console.error("Error saving team:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const industries = [
    "Retail",
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Manufacturing",
    "Hospitality",
    "Real Estate",
    "Consulting",
    "Other",
  ]

  const billingPlans = ["Starter - Free", "Professional - $29/month", "Business - $99/month", "Enterprise - Custom"]

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Setup</h2>
      <p className="text-gray-600 mb-8">Add your team details to personalize your dashboard</p>

      {/* Debug info */}
      <div className="mb-4 p-2 bg-gray-100 text-xs">
        Debug: Current Step = {currentStep} | Loading = {loading.toString()} | Submitting = {isSubmitting.toString()}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Team Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
          <input
            type="text"
            value={formData.team_name}
            onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="My Team"
            required
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
          <input
            type="url"
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="www.teamname.com"
          />
        </div>

        {/* Billing Plan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Billing Plan</label>
          <select
            value={formData.billing_plan}
            onChange={(e) => setFormData({ ...formData, billing_plan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select billing plan</option>
            {billingPlans.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" className="px-6 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  )
}
