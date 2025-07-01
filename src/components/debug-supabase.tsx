"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL!, import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY!)

export function DebugSupabase() {
  const [testEmail, setTestEmail] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const addResult = (message: string) => {
    setResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testConnection = async () => {
    setLoading(true)
    setResults([])

    try {
      addResult("🔍 Testing Supabase connection...")

      // Test 1: Check environment variables
      const url = import.meta.env.VITE_SUPABASE_URL
      const key = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

      if (!url || !key) {
        addResult("❌ Environment variables missing!")
        return
      }
      addResult("✅ Environment variables found")
      addResult(`🔗 URL: ${url}`)
      addResult(`🔑 Key starts with: ${key.substring(0, 20)}...`)

      // Test 2: Check service role permissions
      addResult("🔑 Testing service role permissions...")
      const { data: roleCheck, error: roleError } = await supabase.auth.admin.listUsers()

      if (roleError) {
        addResult(`❌ Service role failed: ${roleError.message}`)
        return
      }
      addResult(`✅ Service role working (found ${roleCheck.users?.length || 0} users)`)

      // Test 3: Check project settings
      addResult("⚙️ Checking project configuration...")

      // Try to get project settings
      try {
        const { data: settings, error: settingsError } = await supabase.auth.admin.getSettings()
        if (settingsError) {
          addResult(`⚠️ Settings check failed: ${settingsError.message}`)
        } else {
          addResult("✅ Project settings accessible")
          addResult(`📧 Email confirm: ${settings.external_email_enabled ? "ON" : "OFF"}`)
          addResult(`🔐 Signup enabled: ${settings.disable_signup ? "NO" : "YES"}`)
        }
      } catch (settingsErr: any) {
        addResult(`⚠️ Settings check error: ${settingsErr.message}`)
      }

      if (testEmail) {
        // Test 4: Try different user creation methods
        addResult(`📧 Testing user creation for: ${testEmail}`)

        // Method 1: Create user with minimal data
        addResult("🔄 Method 1: Minimal user creation...")
        const { data: minimalResult, error: minimalError } = await supabase.auth.admin.createUser({
          email: testEmail,
          email_confirm: true,
        })

        if (minimalError) {
          addResult(`❌ Minimal creation failed: ${minimalError.message}`)

          // Method 2: Try with different options
          addResult("🔄 Method 2: User creation with password...")
          const { data: passwordResult, error: passwordError } = await supabase.auth.admin.createUser({
            email: testEmail,
            password: "TempPass123!",
            email_confirm: true,
            user_metadata: {},
          })

          if (passwordError) {
            addResult(`❌ Password method failed: ${passwordError.message}`)

            // Check if it's a specific database constraint issue
            if (passwordError.message.includes("duplicate") || passwordError.message.includes("unique")) {
              addResult("🔍 User might already exist - checking...")

              const existingUsers = roleCheck.users?.filter((u) => u.email === testEmail)
              if (existingUsers && existingUsers.length > 0) {
                addResult(`⚠️ User already exists: ${existingUsers[0].id}`)
              }
            }

            // Final diagnostic
            addResult("🚨 CRITICAL: Database cannot create users")
            addResult("💡 Possible causes:")
            addResult("   - Project is paused/suspended")
            addResult("   - Database storage is full")
            addResult("   - Custom database constraints")
            addResult("   - Billing issues")
            addResult("   - Regional restrictions")
          } else {
            addResult("✅ Password method worked!")
            if (passwordResult.user?.id) {
              await supabase.auth.admin.deleteUser(passwordResult.user.id)
              addResult("🧹 Test user cleaned up")
            }
          }
        } else {
          addResult("✅ Minimal creation worked!")
          if (minimalResult.user?.id) {
            await supabase.auth.admin.deleteUser(minimalResult.user.id)
            addResult("🧹 Test user cleaned up")
          }
        }
      }

      // Test 5: Check database connectivity
      addResult("🏥 Testing database connectivity...")
      const { data: dbTest, error: dbError } = await supabase
        .from("information_schema.tables")
        .select("table_name")
        .limit(1)

      if (dbError) {
        addResult(`❌ Database connection failed: ${dbError.message}`)
      } else {
        addResult("✅ Database connection healthy")
      }

      // Test 6: Check auth schema specifically
      addResult("🔍 Checking auth schema...")
      try {
        const { data: authTest, error: authError } = await supabase.from("auth.users").select("id").limit(1)

        if (authError) {
          addResult(`❌ Auth schema issue: ${authError.message}`)
        } else {
          addResult("✅ Auth schema accessible")
        }
      } catch (authErr: any) {
        addResult(`⚠️ Auth schema test failed: ${authErr.message}`)
      }
    } catch (error: any) {
      addResult(`💥 Unexpected error: ${error.message}`)
      console.error("Debug error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">🔧 Advanced Supabase Debug</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Test Email</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="newtest@example.com"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Running Advanced Tests..." : "Run Advanced Diagnostic"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Advanced Test Results:</h3>
          <div className="bg-gray-50 p-4 rounded-md max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <div key={index} className="text-sm font-mono mb-1">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
        <p className="text-sm text-red-700 font-bold">🚨 URGENT CHECKS NEEDED:</p>
        <div className="text-xs text-red-600 mt-1 space-y-1">
          <p>1. Go to Supabase Dashboard → Settings → General</p>
          <p>2. Check if project is PAUSED or SUSPENDED</p>
          <p>3. Check Settings → Billing for any issues</p>
          <p>4. Verify you're on the correct project</p>
          <p>5. Try creating a user manually in Dashboard → Authentication → Users</p>
        </div>
      </div>
    </div>
  )
}
