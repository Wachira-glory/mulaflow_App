
import { supabase } from './supabase';
import crypto from 'crypto';

const QUIKK_URL = "https://tryapi.quikk.dev/v1/mpesa/charge";
const DATE_HEADER = "date";
const CREDENTIALS = {
  key: import.meta.env.VITE_QUIKK_API_KEY || "fba11a8d95fb8d675a88a29b93617c92",
  secret: import.meta.env.VITE_QUIKK_API_SECRET || "e34fd72e71e190dccb185c105db9acd3"
};

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

// Make POST request to Quikk API
export async function triggerStkPush({ amount, phone, paybill, reference }: {
  amount: number | string;
  phone: string;
  paybill: string;
  reference: string;
}) {
  try {
    // For browser environment, we'll call our backend API
    // In a real app with Supabase, this would call a Supabase Edge Function
    const [timestamp, authString] = generateHmacSignature();
    
    const requestBody = {
      data: {
        id: "gid",
        type: "charge",
        attributes: {
          amount: parseFloat(amount.toString()),
          posted_at: new Date().toISOString(),
          reference: reference,
          short_code: paybill,
          customer_no: String(phone),
          customer_type: "msisdn"
        }
      }
    };
    
    // Create a transaction record
    const transactionId = `TR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        id: transactionId,
        amount: parseFloat(amount.toString()),
        status: 'Pending',
        paymentMethod: 'M-PESA',
        customer: `Customer (${phone})`,
        date: new Date().toLocaleString(),
        createdAt: new Date().toISOString()
      });
      
    if (error) {
      throw new Error(`Error creating transaction: ${error.message}`);
    }
    
    // In a real implementation with Supabase, the actual API call would happen in an edge function
    console.log('STK push triggered:', requestBody);
    
    // Simulating successful response for now
    return {
      success: true,
      transactionId,
      message: 'STK push initiated. Please check your phone to complete payment.'
    };
  } catch (error) {
    console.error('Error triggering STK push:', error);
    throw error;
  }
}
