
// import { toast } from 'sonner';

// interface QuikkChargeParams {
//   amount: number;
//   phone: string;
//   paybill: string;
//   reference: string;
// }

// interface QuikkResponse {
//   success: boolean;
//   data?: any;
//   error?: string;
// }

// const CREDENTIALS = {
//   key: "fba11a8d95fb8d675a88a29b93617c92",
//   secret: "e34fd72e71e190dccb185c105db9acd3"
// };

// const DATE_HEADER = "date";

// /**
//  * Generate HMAC signature for Quikk API
//  */
// const generateHmacSignature = (): [string, string] => {
//   const timestamp = new Date().toUTCString();
//   const toEncode = `${DATE_HEADER}: ${timestamp}`;

//   // Note: In a browser environment, we'd need to use the Web Crypto API
//   // This is a simplified version that works with Supabase Edge Functions
//   const encoded = "hmac_signature_placeholder"; // In real implementation, we'd use crypto
  
//   const authString = `keyId="${CREDENTIALS.key}",algorithm="hmac-sha256",headers="${DATE_HEADER}",signature="${encodeURIComponent(encoded)}"`;

//   return [timestamp, authString];
// };

// /**
//  * Initiate STK Push using Quikk API
//  * Note: This should be called from a secure backend (e.g., Supabase Edge Function)
//  * This function demonstrates how the API would be used but should not be called directly from frontend
//  */
// export const initiateSTKPush = async (params: QuikkChargeParams): Promise<QuikkResponse> => {
//   try {
//     // This would be done on the backend
//     const [timestamp, authString] = generateHmacSignature();
    
//     const requestBody = {
//       data: {
//         id: "gid",
//         type: "charge",
//         attributes: {
//           amount: params.amount,
//           posted_at: new Date().toISOString(),
//           reference: params.reference,
//           short_code: params.paybill,
//           customer_no: params.phone,
//           customer_type: "msisdn"
//         }
//       }
//     };
    
//     // In a real implementation, this would be processed on the backend
//     // We're demonstrating the structure but not making the actual call here
//     console.log("STK Push request:", requestBody);
    
//     // This would call our Supabase Edge Function
//     const response = await fetch('/api/mpesa/charge', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(params)
//     });
    
//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.error || 'Failed to initiate payment');
//     }
    
//     return { success: true, data };
//   } catch (error: any) {
//     console.error("Payment Error:", error);
//     toast.error(error.message || 'Failed to initiate payment');
//     return { success: false, error: error.message };
//   }
// };

// /**
//  * For demonstration purposes - simulates STK push success
//  */
// export const simulateSTKPush = (params: QuikkChargeParams): Promise<QuikkResponse> => {
//   return new Promise((resolve) => {
//     console.log("Simulating STK Push with params:", params);
    
//     setTimeout(() => {
//       // Simulate success
//       toast.success(`STK push initiated to ${params.phone} for ${params.amount}`);
//       resolve({
//         success: true,
//         data: {
//           id: "sim_" + Math.random().toString(36).substr(2, 9),
//           type: "charge",
//           attributes: {
//             status: "processing",
//             message: "STK push has been sent to the customer's phone"
//           }
//         }
//       });
//     }, 2000);
//   });
// };


import { toast } from "sonner";

interface QuikkChargeParams {
  amount: number;
  phone: string;
  paybill: string;
  reference: string;
}

interface QuikkResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const initiateSTKPush = async (params: QuikkChargeParams): Promise<QuikkResponse> => {
  try {
    const response = await fetch('/functions/stkpush', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to initiate payment');
    }

    toast.success(`STK push initiated to ${params.phone} for ${params.amount}`);
    return { success: true, data };
  } catch (error: any) {
    console.error("Payment Error:", error);
    toast.error(error.message || 'Failed to initiate payment');
    return { success: false, error: error.message };
  }
};
