

// //src/components/SetupProfile.tsx
// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Upload, User, AlertCircle } from "lucide-react"
// import { useOnboarding } from "../hooks/useOnboarding"

// export const SetupProfile: React.FC = () => {
//   const { profile, saveProfile, currentStep, error } = useOnboarding()
//   const [formData, setFormData] = useState({
//     name: profile?.name || "",
//     email: profile?.email || "",
//     phone_number: profile?.phone_number || "",
//     use_case: profile?.use_case || "",
//   })
//   const [loading, setLoading] = useState(false)
//   const [formError, setFormError] = useState<string | null>(null)

//   // Update form data when profile changes
//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         name: profile.name || "",
//         email: profile.email || "",
//         phone_number: profile.phone_number || "",
//         use_case: profile.use_case || "",
//       })
//     }
//   }, [profile])

//   // Debug: Track when currentStep changes
//   useEffect(() => {
//     console.log("SetupProfile - currentStep changed to:", currentStep)
//   }, [currentStep])

//   // Debug: Track when profile changes
//   useEffect(() => {
//     console.log("SetupProfile - profile changed:", profile)
//   }, [profile])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setFormError(null)
    
//     console.log("SetupProfile - Starting form submission")
    
//     try {
//       await saveProfile(formData)
//       console.log("SetupProfile - Profile saved, should move to next step")
//     } catch (error) {
//       console.error("Error saving profile:", error)
//       const errorMessage = error instanceof Error ? error.message : "Error saving profile. Please try again."
//       setFormError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const useCaseOptions = [
//     "Personal Finance Management",
//     "Small Business Payments",
//     "E-commerce Integration",
//     "Freelance Services",
//     "Non-profit Organization",
//     "Other",
//   ]

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup profile</h2>
//       <p className="text-gray-600 mb-8">Enter your details below to get started</p>

//       {/* Debug info */}
//       <div className="mb-4 p-2 bg-gray-100 text-xs">
//         Debug: Current Step = {currentStep} | Profile ID = {profile?.id || 'None'}
//       </div>

//       {/* Error Display */}
//       {(error || formError) && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
//           <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
//           <span className="text-red-700 text-sm">{error || formError}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Profile Picture */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
//           <div className="flex items-center space-x-4">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
//               <User className="w-8 h-8 text-gray-400" />
//             </div>
//             <button
//               type="button"
//               className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//             >
//               <Upload className="w-4 h-4 mr-2" />
//               Upload image
//             </button>
//           </div>
//         </div>

//         {/* Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="John Doe"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="johndoe@gmail.com"
//             required
//           />
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
//           <input
//             type="tel"
//             value={formData.phone_number}
//             onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="+254 55501178"
//           />
//         </div>

//         {/* Use Case */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">What do you want to use Mulaflow for?</label>
//           <select
//             value={formData.use_case}
//             onChange={(e) => setFormData({ ...formData, use_case: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select</option>
//             {useCaseOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
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
//             className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
//           >
//             {loading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Saving...
//               </>
//             ) : (
//               "Save & Continue"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }


//src/components/SetupProfile.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { useOnboarding } from "../hooks/useOnboarding"

export function SetupProfile() {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [formData, setFormData] = useState(data.profile)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone_number || !formData.use_case) {
      alert("Please fill in all required fields")
      return
    }

    // Update data and move to next step
    updateData("profile", formData)
    nextStep()
  }

  const handleCancel = () => {
    // Handle cancel logic - maybe go back to auth or previous page
    window.history.back()
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup profile</h2>
        <p className="text-gray-600">Enter your details below to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <button type="button" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload image
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="johndoe@gmail.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone number *
          </label>
          <input
            type="tel"
            id="phone"
            required
            placeholder="+254 555001178"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.phone_number}
            onChange={(e) => setFormData((prev) => ({ ...prev, phone_number: e.target.value }))}
          />
        </div>

        {/* Use Case */}
        <div>
          <label htmlFor="useCase" className="block text-sm font-medium text-gray-700 mb-2">
            What do you want to use Mulaflow for? *
          </label>
          <select
            id="useCase"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.use_case}
            onChange={(e) => setFormData((prev) => ({ ...prev, use_case: e.target.value }))}
          >
            <option value="">Select</option>
            <option value="personal">Personal Use</option>
            <option value="small_business">Small Business</option>
            <option value="large_business">Large Business</option>
            <option value="freelancing">Freelancing</option>
            <option value="e_commerce">E-commerce</option>
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
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
