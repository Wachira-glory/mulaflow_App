
// This is a mock implementation of what would be a Supabase Edge Function
// In a real application, this would be deployed to Supabase

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as crypto from 'https://deno.land/std@0.167.0/node/crypto.ts';

const QUIKK_URL = "https://tryapi.quikk.dev/v1/mpesa/charge";
const DATE_HEADER = "date";
const CREDENTIALS = {
  key: Deno.env.get('QUIKK_API_KEY') || 'fba11a8d95fb8d675a88a29b93617c92',
  secret: Deno.env.get('QUIKK_API_SECRET') || 'e34fd72e71e190dccb185c105db9acd3'
};

// Get Supabase client
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_ANON_KEY') || ''
);

// Generate HMAC signature
function generateHmacSignature() {
  const timestamp = new Date().toUTCString();
  const toEncode = `${DATE_HEADER}: ${timestamp}`;

  const hmac = crypto
    .createHmac('sha256', CREDENTIALS.secret)
    .update(toEncode)
    .digest();
  const encoded = Buffer.from(hmac).toString("base64");
  const urlEncoded = encodeURIComponent(encoded);

  const authString = `keyId="${CREDENTIALS.key}",algorithm="hmac-sha256",headers="${DATE_HEADER}",signature="${urlEncoded}"`;

  return [timestamp, authString];
}

// Make POST request
async function makePostRequest(body: any) {
  const [timestamp, authString] = generateHmacSignature();
  
  const response = await fetch(QUIKK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      [DATE_HEADER]: timestamp,
      Authorization: authString,
    },
    body: JSON.stringify(body)
  });
  
  const responseText = await response.text();
  try {
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Invalid JSON response:', responseText);
    throw new Error('Invalid response from Quikk API');
  }
}

serve(async (req) => {
  try {
    // Handle CORS for preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }
    
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Get the request body
    const { amount, phone, paybill, reference } = await req.json();
    
    // Validate required fields
    if (!amount || !phone || !paybill || !reference) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
    
    // Construct the Quikk API payload
    const requestBody = {
      data: {
        id: "gid",
        type: "charge",
        attributes: {
          amount: parseFloat(amount),
          posted_at: new Date().toISOString(),
          reference: reference,
          short_code: paybill,
          customer_no: String(phone),
          customer_type: "msisdn"
        }
      }
    };
    
    console.log("Sending request to Quikk API:", JSON.stringify(requestBody));
    
    // Make request to Quikk API
    const response = await makePostRequest(requestBody);
    
    // Create a transaction record in Supabase
    // Note: In a real app, we'd get the user ID from the authenticated request
    const { error: insertError } = await supabaseClient
      .from('transactions')
      .insert({
        id: `TR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        amount: parseFloat(amount),
        status: 'Pending',
        payment_method: 'M-PESA',
        customer: `Customer (${phone})`,
        date: new Date().toLocaleString(),
        user_id: req.headers.get('x-user-id') || '00000000-0000-0000-0000-000000000000',
        reference: reference,
        metadata: { quikk_response: response }
      });
      
    if (insertError) {
      console.error('Error inserting transaction:', insertError);
    }
    
    // Return the Quikk API response
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
});
