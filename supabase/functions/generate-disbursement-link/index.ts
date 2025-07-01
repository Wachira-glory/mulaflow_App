// // Follow this setup guide to integrate the Deno language server with your editor:
// // https://deno.land/manual/getting_started/setup_your_environment
// // This enables autocomplete, go to definition, etc.

// // Setup type definitions for built-in Supabase Runtime APIs
// import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// console.log("Hello from Functions!")

// Deno.serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

// /* To invoke locally:

//   1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
//   2. Make an HTTP request:

//   curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-disbursement-link' \
//     --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//     --header 'Content-Type: application/json' \
//     --data '{"name":"Functions"}'

// */



// // supabase/functions/generate-disbursement-link/index.ts
// import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// console.log('Hello from generate-disbursement-link Edge Function!');

// serve(async (req) => {
//   if (req.method !== 'POST') {
//     return new Response(JSON.stringify({ success: false, message: 'Method Not Allowed' }), {
//       status: 405,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   try {
//     const { paymentId, recipientName, amount, purpose, recipientPhone, channel } = await req.json();

//     if (!paymentId || !recipientName || !amount || !recipientPhone) {
//       return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const supabaseAdmin = createClient(
//       Deno.env.get('SUPABASE_URL') ?? '',
//       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
//     );

//     // Generate a unique ID for the link (can be the paymentId itself or a UUID)
//     // For simplicity, we'll use the paymentId directly in the URL
//     const uniqueLink = `${Deno.env.get('FRONTEND_URL')}/disbursement-confirm/${paymentId}`;

//     // Update the payment record with the generated link (optional, but good for tracking)
//     // You might also store other metadata here if needed for the confirmation page
//     const { error: updateError } = await supabaseAdmin
//       .from('payments')
//       .update({
//         disbursement_link: uniqueLink,
//         // You might store initial disbursement details here too for the confirmation page
//         // e.g., metadata: { recipientName, amount, purpose, recipientPhone, channel }
//       })
//       .eq('id', paymentId);

//     if (updateError) {
//       console.error('Error updating payment with disbursement link:', updateError.message);
//       return new Response(JSON.stringify({ success: false, message: `Database update failed: ${updateError.message}` }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     return new Response(JSON.stringify({ success: true, link: uniqueLink }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });

//   } catch (error) {
//     console.error('Error in generate-disbursement-link Edge Function:', error.message);
//     return new Response(JSON.stringify({ success: false, message: `Internal server error: ${error.message}` }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// });

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.4";

const QUIKK_URL = "https://api.quikk.dev/v1/mpesa/charge";
const DATE_HEADER = "date";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// CORS headers for frontend access
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

// Generate HMAC-SHA256 signature using Deno's crypto.subtle
async function generateHmacSignature() {
  const timestamp = new Date().toUTCString();
  const toEncode = `${DATE_HEADER}: ${timestamp}`;
  const key = Deno.env.get("QUIKK_KEY") || "";
  const secret = Deno.env.get("QUIKK_SECRET") || "";
  
  const encoder = new TextEncoder();
  const data = encoder.encode(toEncode);
  const keyData = encoder.encode(secret);
  
  const cryptoKey = await crypto.subtle.importKey("raw", keyData, {
    name: "HMAC",
    hash: "SHA-256"
  }, false, ["sign"]);
  
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, data);
  const encoded = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const urlEncoded = encodeURIComponent(encoded);
  
  const authString = `keyId="${key}",algorithm="hmac-sha256",headers="${DATE_HEADER}",signature="${urlEncoded}"`;
  
  return [timestamp, authString];
}

// Handle the HTTP request to Quikk API
async function makePostRequest(body) {
  const [timestamp, authString] = await generateHmacSignature();
  
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
  
  if (!response.ok) {
    throw new Error(`Quikk API error: ${JSON.stringify(responseData)}`);
  }
  
  return responseData;
}

// Update payment record in Supabase
async function updatePaymentRecord(paymentId, status, responseData, errorMessage = null) {
  try {
    const updateData = {
      status: status,
      updated_at: new Date().toISOString(),
    };

    // Add response data to the existing data field
    if (responseData) {
      updateData.data = {
        quikk_charge_id: responseData?.data?.id,
        quikk_response: responseData
      };
    }

    // Add error information if present
    if (errorMessage) {
      updateData.data = {
        ...updateData.data,
        error: errorMessage
      };
    }

    const { error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', paymentId);

    if (error) {
      console.error('Error updating payment record:', error);
    } else {
      console.log('Payment record updated successfully');
    }
  } catch (error) {
    console.error('Error in updatePaymentRecord:', error);
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({
      error: "Method not allowed"
    }), {
      status: 405,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }

  try {
    // Get the request body from your form
    const requestBody = await req.json();
    const { phone, amount, paybill, reference, paymentId, customerName, purpose } = requestBody;

    // Validate required fields
    if (!phone || !amount || !paybill) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields: phone, amount, and paybill are required"
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }

    // Generate a unique charge_id for Quikk
    const chargeId = crypto.randomUUID();

    // Prepare the Quikk API request body (matching the format from your original code)
    const quikkRequestBody = {
      data: {
        id: chargeId,
        type: "charge",
        attributes: {
          amount: parseFloat(amount),
          posted_at: new Date().toISOString(),
          reference: reference || `STK-${Date.now()}`,
          short_code: paybill, // Using paybill as short_code
          customer_no: phone, // Using phone as customer_no
          customer_type: "msisdn"
        }
      }
    };

    console.log('Sending STK Push request to Quikk:', JSON.stringify(quikkRequestBody, null, 2));

    // Send the charge request to Quikk
    const quikkResponse = await makePostRequest(quikkRequestBody);
    
    console.log('Quikk API Response:', JSON.stringify(quikkResponse, null, 2));

    // Extract the Quikk charge ID from the response
    const quikkChargeId = quikkResponse?.data?.id;
    
    if (!quikkChargeId) {
      throw new Error("Quikk charge ID (data.id) not found in response");
    }

    // Update the payment record with success status and response data
    if (paymentId) {
      await updatePaymentRecord(paymentId, 'pending', quikkResponse);
    }

    // Return success response to your frontend
    return new Response(JSON.stringify({
      success: true,
      message: "STK push sent successfully",
      data: {
        charge_id: quikkChargeId,
        reference: reference,
        amount: amount,
        phone: phone,
        quikk_response: quikkResponse
      }
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    console.error('STK Push Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    // Update payment record with failed status if paymentId is available
    const requestBody = await req.json().catch(() => ({}));
    if (requestBody.paymentId) {
      await updatePaymentRecord(requestBody.paymentId, 'failed', null, errorMessage);
    }

    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
      message: "STK push failed"
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});