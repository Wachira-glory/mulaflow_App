
// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';
// import { Transaction } from '@/types';

// export const useTransactions = () => {
//   return useQuery({
//     queryKey: ['transactions'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('transactions')
//         .select('*')
//         .order('createdAt', { ascending: false });
      
//       if (error) {
//         throw new Error(error.message);
//       }
      
//       return data as Transaction[] || [];
//     }
//   });
// };

// export const useTransactionsByStatus = (status: 'Successful' | 'Pending' | 'Failed') => {
//   return useQuery({
//     queryKey: ['transactions', status],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('transactions')
//         .select('*')
//         .eq('status', status)
//         .order('createdAt', { ascending: false });
      
//       if (error) {
//         throw new Error(error.message);
//       }
      
//       return data as Transaction[] || [];
//     }
//   });
// };

// export const useRecentTransactions = (limit: number = 5) => {
//   return useQuery({
//     queryKey: ['recent-transactions', limit],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('transactions')
//         .select('*')
//         .order('createdAt', { ascending: false })
//         .limit(limit);
      
//       if (error) {
//         throw new Error(error.message);
//       }
      
//       return data as Transaction[] || [];
//     }
//   });
// };





// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';
// import { Transaction } from '@/types'; // Assuming this is your global Transaction type

// // Define a type that matches the structure of data coming from the 'payments' table,
// // including the joined 'channels' data.
// interface PaymentData {
//   id: string;
//   amount: number; // Assuming amount is stored as a number/decimal
//   status: 'completed' | 'pending' | 'failed'; // Use the actual status values from your DB
//   created_at: string; // From the payments table
//   uid: string;
//   reference: string;
//   channel_id: number;
//   // This will come from the joined 'channels' table
//   channels: {
//     name: string;
//   } | null;
// }

// export const useTransactions = () => {
//   return useQuery({
//     queryKey: ['payments'], // Changed queryKey to reflect 'payments'
//     queryFn: async () => {
//       // Select all columns from 'payments' and join with 'channels' to get the channel name
//       const { data, error } = await supabase
//         .from('payments')
//         .select(`
//           *,
//           channels ( name )
//         `) // Select all from payments, and the name from channels
//         .order('created_at', { ascending: false }); // Use 'created_at' for ordering
      
//       if (error) {
//         console.error('Error fetching all payments:', error);
//         throw new Error(error.message);
//       }
      
//       // Map the fetched data to a more usable format if needed,
//       // or ensure your GlobalTransaction type can directly consume this.
//       // For now, we'll return it as PaymentData[]
//       return data as PaymentData[] || [];
//     }
//   });
// };

// export const useTransactionsByStatus = (p0: string, p1: { enabled: boolean; }, status: 'Successful' | 'Pending' | 'Failed') => {
//   // Map UI status to DB status
//   const dbStatus = status === 'Successful' ? 'completed' : status.toLowerCase();

//   return useQuery({
//     queryKey: ['payments', dbStatus], // Changed queryKey
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('payments')
//         .select(`
//           *,
//           channels ( name )
//         `)
//         .eq('status', dbStatus) // Use the mapped DB status
//         .order('created_at', { ascending: false }); // Use 'created_at'
      
//       if (error) {
//         console.error(`Error fetching payments by status (${dbStatus}):`, error);
//         throw new Error(error.message);
//       }
      
//       return data as PaymentData[] || [];
//     }
//   });
// };

// export const useRecentTransactions = (limit: number = 5) => {
//   return useQuery({
//     queryKey: ['recent-payments', limit], // Changed queryKey
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('payments')
//         .select(`
//           *,
//           channels ( name )
//         `)
//         .order('created_at', { ascending: false }) // Use 'created_at'
//         .limit(limit);
      
//       if (error) {
//         console.error('Error fetching recent payments:', error);
//         throw new Error(error.message);
//       }
      
//       return data as PaymentData[] || [];
//     }
//   });
// };


import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Define the structure of a single payment record for consistency
interface Payment {
  id: string;
  amount: number;
  category: string; // 'inbound' or 'outbound'
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  reference: string;
  uid: string; // User ID or unique identifier
  txn_id: string; // Transaction ID
  channel_id: string;
  channels: {
    name: string;
  } | null; // Nested channel object, can be null
}

// Custom hook to fetch all transactions (with channel name)
export const useTransactions = () => {
  return useQuery<Payment[]>({
    queryKey: ['allTransactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          channels ( name )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all transactions:', error);
        throw new Error(error.message);
      }
      return data as Payment[];
    },
  });
};

// Custom hook to fetch recent transactions
export const useRecentTransactions = (limit: number = 5) => {
  return useQuery<Payment[]>({
    queryKey: ['recentTransactions', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          channels ( name )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error(`Error fetching recent transactions (limit ${limit}):`, error);
        throw new Error(error.message);
      }
      return data as Payment[];
    },
  });
};

// Custom hook to fetch transactions by status
export const useTransactionsByStatus = (
  status: 'Successful' | 'Pending' | 'Failed', // Expect these specific strings
  options?: { enabled?: boolean }
) => {
  const queryStatus = status === 'Successful' ? 'completed' : status.toLowerCase(); // Ensure status is valid

  return useQuery<Payment[]>({
    queryKey: ['transactionsByStatus', status],
    queryFn: async () => {
      // Safely check queryStatus before using it
      if (!queryStatus) {
        throw new Error("Invalid status provided for filtering.");
      }

      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          channels ( name )
        `)
        .eq('status', queryStatus) // Use the converted status here
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`Error fetching ${status} transactions:`, error);
        throw new Error(error.message);
      }
      return data as Payment[];
    },
    enabled: options?.enabled, // Use the enabled option from react-query
  });
};