
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';
// import { Stats } from '@/types';

// export const useStats = () => {
//   return useQuery({
//     queryKey: ['stats'],
//     queryFn: async () => {
//       // Get total inflow
//       const { data: inflowData, error: inflowError } = await supabase.rpc('get_total_inflow');
//       if (inflowError) throw new Error(inflowError.message);
      
//       // Get transaction counts
//       const { data: successfulCount, error: successfulError, count: successCount } = await supabase
//         .from('transactions')
//         .select('*', { count: 'exact' })
//         .eq('status', 'Successful');
        
//       const { data: pendingCount, error: pendingError, count: pendingCountVal } = await supabase
//         .from('transactions')
//         .select('*', { count: 'exact' })
//         .eq('status', 'Pending');
        
//       const { data: failedCount, error: failedError, count: failedCountVal } = await supabase
//         .from('transactions')
//         .select('*', { count: 'exact' })
//         .eq('status', 'Failed');
        
//       if (successfulError) throw new Error(successfulError.message);
//       if (pendingError) throw new Error(pendingError.message);
//       if (failedError) throw new Error(failedError.message);
      
//       // Get payment method stats
//       const { data: paymentMethodStats, error: statsError } = await supabase.rpc('get_payment_method_stats');
//       if (statsError) throw new Error(statsError.message);
      
//       const colors = {
//         'Card': '#3b82f6',
//         'M-PESA': '#374151',
//         'Bank Transfer': '#d946ef',
//         'Wallet': '#f97316'
//       };
      
//       const paymentMethods = paymentMethodStats ? paymentMethodStats.map(method => ({
//         name: `${method.payment_method} ${method.percentage}%`,
//         value: method.percentage,
//         color: colors[method.payment_method as keyof typeof colors] || '#3b82f6'
//       })) : [];
      
//       return {
//         totalInflow: inflowData || 0,
//         successfulTransactions: successCount || 0,
//         pendingTransactions: pendingCountVal || 0,
//         failedTransactions: failedCountVal || 0,
//         paymentMethods
//       } as Stats;
//     }
//   });
// };


// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';
// import { Stats } from '@/types';

// export const useStats = () => {
//   return useQuery({
//     queryKey: ['stats'],
//     queryFn: async () => {
//       // Fetch all payments
//       const { data: payments, error } = await supabase
//         .from('payments')
//         .select('*');

//       if (error) throw new Error(error.message);

//       if (!payments) return {
//         totalInflow: 0,
//         successfulTransactions: 0,
//         pendingTransactions: 0,
//         failedTransactions: 0,
//         paymentMethods: []
//       };

//       // Calculate stats
//       const totalInflow = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

//       const successfulTransactions = payments.filter(p => p.status === 'Successful').length;
//       const pendingTransactions = payments.filter(p => p.status === 'Pending').length;
//       const failedTransactions = payments.filter(p => p.status === 'Failed').length;

//       // Calculate payment method stats
//       const methodCounts: Record<string, number> = {};

//       payments.forEach(p => {
//         const method = p.payment_method || 'Other';
//         methodCounts[method] = (methodCounts[method] || 0) + 1;
//       });

//       const totalPayments = payments.length;

//       const colors = {
//         'Card': '#3b82f6',
//         'M-PESA': '#374151',
//         'Bank Transfer': '#d946ef',
//         'Wallet': '#f97316'
//       };

//       const paymentMethods = Object.keys(methodCounts).map(method => {
//         const count = methodCounts[method];
//         const percentage = ((count / totalPayments) * 100).toFixed(1); // keep 1 decimal

//         return {
//           name: `${method} ${percentage}%`,
//           value: Number(percentage),
//           color: colors[method as keyof typeof colors] || '#3b82f6'
//         };
//       });

//       return {
//         totalInflow,
//         successfulTransactions,
//         pendingTransactions,
//         failedTransactions,
//         paymentMethods
//       } as Stats;
//     }
//   });
// };





// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';
// import { Stats } from '@/types';

// export const useStats = () => {
//   return useQuery({
//     queryKey: ['stats'],
//     queryFn: async () => {
//       // Get total inflow from the 'payments' table
//       // Assuming 'get_total_inflow' RPC function is already designed to sum 'amount' from 'payments' table.
//       const { data: inflowData, error: inflowError } = await supabase.rpc('get_total_inflow');
//       if (inflowError) throw new Error(inflowError.message);
      
//       // Get transaction counts from the 'payments' table based on new status values
//       const { count: successfulCount, error: successfulError } = await supabase
//         .from('payments') // Changed from 'transactions' to 'payments'
//         .select('*', { count: 'exact' })
//         .eq('status', 'completed'); // Changed status to 'completed'
        
//       const { count: pendingCount, error: pendingError } = await supabase
//         .from('payments') // Changed from 'transactions' to 'payments'
//         .select('*', { count: 'exact' })
//         .eq('status', 'pending'); // Changed status to 'pending'
        
//       const { count: failedCount, error: failedError } = await supabase
//         .from('payments') // Changed from 'transactions' to 'payments'
//         .select('*', { count: 'exact' })
//         .eq('status', 'failed'); // Changed status to 'failed'
        
//       if (successfulError) throw new Error(successfulError.message);
//       if (pendingError) throw new Error(pendingError.message);
//       if (failedError) throw new Error(failedError.message);
      
//       // Get payment method stats
//       // Assuming 'get_payment_method_stats' RPC function correctly processes data from 'payments' table
//       const { data: paymentMethodStats, error: statsError } = await supabase.rpc('get_payment_method_stats');
//       if (statsError) throw new Error(statsError.message);
      
//       const colors = {
//         'Card': '#3b82f6',
//         'M-PESA': '#374151',
//         'Bank Transfer': '#d946ef',
//         'Wallet': '#f97316'
//       };
      
//       const paymentMethods = paymentMethodStats ? paymentMethodStats.map(method => ({
//         name: `${method.payment_method} ${method.percentage}%`,
//         value: method.percentage,
//         color: colors[method.payment_method as keyof typeof colors] || '#3b82f6'
//       })) : [];
      
//       return {
//         totalInflow: inflowData || 0,
//         successfulTransactions: successfulCount || 0,
//         pendingTransactions: pendingCount || 0,
//         failedTransactions: failedCount || 0,
//         paymentMethods
//       } as Stats;
//     }
//   });
// };

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// Define the expected return type for the useStats hook
interface DashboardStats {
  totalInflow: number;
  successfulTransactions: number;
  pendingTransactions: number;
  failedTransactions: number;
  paymentMethods: { name: string; value: number }[];
}

export const useStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      // 1. Fetch Total Inflow (Sum of 'amount' for ALL 'inbound' transactions, regardless of status)
      const { data: inflowAmounts, error: inflowError } = await supabase
        .from('payments')
        .select('amount, category') // Only need amount and category for this calculation
        .filter('category', 'eq', 'inbound'); // Filter ONLY by 'inbound' category

      if (inflowError) {
        console.error('Error fetching total inflow amounts:', inflowError);
        throw new Error(inflowError.message);
      }
      const totalInflow = inflowAmounts.reduce((sum, payment) => sum + parseFloat(payment.amount?.toString() || '0'), 0);

      // 2. Fetch Successful Transactions Count
      const { count: successfulCount, error: successfulError } = await supabase
        .from('payments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed');

      if (successfulError) {
        console.error('Error fetching successful transactions count:', successfulError);
        throw new Error(successfulError.message);
      }

      // 3. Fetch Pending Transactions Count
      const { count: pendingCount, error: pendingError } = await supabase
        .from('payments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (pendingError) {
        console.error('Error fetching pending transactions count:', pendingError);
        throw new Error(pendingError.message);
      }

      // 4. Fetch Failed Transactions Count
      const { count: failedCount, error: failedError } = await supabase
        .from('payments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'failed');

      if (failedError) {
        console.error('Error fetching failed transactions count:', failedError);
        throw new Error(failedError.message);
      }

      // 5. Fetch Payment Methods data for the chart (Counts all transactions by channel)
      const { data: paymentMethodsRaw, error: paymentMethodsError } = await supabase
        .from('payments')
        .select(`
          channels ( name )
        `); // Fetch all payments and join to get their channel names

      if (paymentMethodsError) {
        console.error('Error fetching payment methods for chart:', paymentMethodsError);
        throw new Error(paymentMethodsError.message);
      }

      const methodCounts: { [key: string]: number } = {};
      paymentMethodsRaw.forEach(payment => {
        const channelName = payment.channels?.name || 'Unknown'; // Use 'Unknown' if channel name is null
        methodCounts[channelName] = (methodCounts[channelName] || 0) + 1;
      });

      const paymentMethods = Object.entries(methodCounts).map(([name, value]) => ({
        name,
        value,
      }));

      return {
        totalInflow: totalInflow,
        successfulTransactions: successfulCount || 0,
        pendingTransactions: pendingCount || 0,
        failedTransactions: failedCount || 0,
        paymentMethods: paymentMethods,
      };
    },
  });
};
