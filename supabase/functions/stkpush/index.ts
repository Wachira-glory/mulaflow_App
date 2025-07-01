// supabase/functions/stkpush/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.4";

const QUIKK_URL = "https://api.quikk.dev/v1/mpesa/charge";
const DATE_HEADER = "date";


// Initialize Supabase client
const supabaseUrl = Deno.env.get("VITE_SUPABASE_URL") || "";
const supabaseServiceRoleKey = Deno.env.get("VITE_SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE"
};

// Generate HMAC-SHA256 signature
async function generateHmacSignature() {
  const timestamp = new Date().toUTCString();
  const toEncode = `${DATE_HEADER}: ${timestamp}`;
  const key = Deno.env.get("VITE_QUIKK_KEY") || "";
  const secret = Deno.env.get("VITE_QUIKK_SECRET") || "";
  
  console.log('Environment variables check:', {
    hasKey: !!key,
    hasSecret: !!secret,
    keyLength: key.length,
    secretLength: secret.length,
    timestamp,
    supabaseUrl: !!supabaseUrl,
    serviceRoleKey: !!supabaseServiceRoleKey
  });

  if (!key || !secret) {
    throw new Error('Missing QUIKK_KEY or QUIKK_SECRET environment variables');
  }
  
  const encoder = new TextEncoder();
  const data = encoder.encode(toEncode);
  const keyData = encoder.encode(secret);
  
  const cryptoKey = await crypto.subtle.importKey(
    "raw", 
    keyData, 
    { name: "HMAC", hash: "SHA-256" }, 
    false, 
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
  const encoded = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const urlEncoded = encodeURIComponent(encoded);
  const authString = `keyId="${key}",algorithm="hmac-sha256",headers="${DATE_HEADER}",signature="${urlEncoded}"`;
  
  return [timestamp, authString];
}

// Make request to Quikk API
async function makePostRequest(body: any) {
  try {
    const [timestamp, authString] = await generateHmacSignature();
    
    console.log('Making request to Quikk API with body:', JSON.stringify(body, null, 2));
    console.log('Request headers:', {
      'Content-Type': 'application/vnd.api+json',
      [DATE_HEADER]: timestamp,
      'Authorization': authString.substring(0, 50) + '...' // Log partial auth string for security
    });
    
    const response = await fetch(QUIKK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.api+json",
        [DATE_HEADER]: timestamp,
        "Authorization": authString
      },
      body: JSON.stringify(body)
    });
    
    const responseData = await response.json();
    
    console.log('Quikk API response:', {
      status: response.status,
      statusText: response.statusText,
      data: responseData
    });
    
    if (!response.ok) {
      throw new Error(`Quikk API error (${response.status}): ${JSON.stringify(responseData)}`);
    }
    
    return responseData;
  } catch (error) {
    console.error('Error in makePostRequest:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  console.log('=== Edge function called ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    console.log('Handling CORS preflight request');
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }

  if (req.method !== "POST") {
    console.log('Method not allowed:', req.method);
    return new Response(JSON.stringify({ 
      success: false, 
      error: "Method not allowed" 
    }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    console.log('Processing POST request...');
    
    // Add timeout and error handling for request body parsing
    let body;
    try {
      body = await req.json();
      console.log('Received request body:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid JSON in request body"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    const { amount, customer_no, short_code, reference } = body;

    // Validate required fields
    if (!amount || !customer_no || !short_code) {
      console.error('Missing required fields:', { 
        amount: !!amount, 
        customer_no: !!customer_no, 
        short_code: !!short_code 
      });
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields: amount, customer_no, and short_code are required"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Validate phone number format
    const phoneRegex = /^254\d{9}$/;
    if (!phoneRegex.test(customer_no)) {
      console.error('Invalid phone number format:', customer_no);
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid phone number format. Use 254XXXXXXXXX"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      console.error('Invalid amount:', amount);
      return new Response(JSON.stringify({
        success: false,
        error: "Invalid amount. Must be a positive number"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Generate a unique charge_id
    const chargeId = crypto.randomUUID();
    console.log('Generated charge ID:', chargeId);

    // Prepare the Quikk API request body
    const requestBody = {
      data: {
        id: chargeId,
        type: "charge",
        attributes: {
          amount: numericAmount,
          posted_at: new Date().toISOString(),
          reference: reference || `REF-${Date.now()}`,
          short_code: short_code,
          customer_no: customer_no,
          customer_type: "msisdn"
        }
      }
    };

    console.log('Prepared request body for Quikk API:', JSON.stringify(requestBody, null, 2));

    // Send the charge request to Quikk
    const responseData = await makePostRequest(requestBody);

    // Extract the Quikk charge ID from the response
    const quikkChargeId = responseData?.data?.id;
    if (!quikkChargeId) {
      console.error('Quikk charge ID not found in response:', responseData);
      throw new Error("Quikk charge ID (data.id) not found in response");
    }

    console.log('Successfully processed charge request with Quikk ID:', quikkChargeId);

    // Return successful response
    return new Response(JSON.stringify({
      success: true,
      data: responseData.data,
      message: "STK Push initiated successfully"
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("=== Edge Function Error ===");
    console.error("Error message:", errorMessage);
    console.error("Full error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});