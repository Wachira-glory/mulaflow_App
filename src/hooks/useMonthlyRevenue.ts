
// import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/lib/supabase';

// export const useMonthlyRevenue = () => {
//   return useQuery({
//     queryKey: ['monthlyRevenue'],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('transactions')
//         .select('amount, createdAt')
//         .eq('status', 'Successful');

//       if (error) {
//         console.error('Error fetching monthly revenue:', error);
//         throw error;
//       }

//       // Group by month and calculate revenue
//       const monthlyData: { [key: string]: number } = {};
      
//       data?.forEach(transaction => {
//         const date = new Date(transaction.createdAt);
//         const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
        
//         if (monthlyData[monthKey]) {
//           monthlyData[monthKey] += parseFloat(transaction.amount.toString());
//         } else {
//           monthlyData[monthKey] = parseFloat(transaction.amount.toString());
//         }
//       });

//       // Convert to chart format
//       return Object.entries(monthlyData).map(([name, value]) => ({
//         name,
//         value
//       }));
//     },
//   });
// };


import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useMonthlyRevenue = () => {
  return useQuery({
    queryKey: ['monthlyRevenue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments') // Changed from 'transactions' to 'payments'
        .select('amount, created_at') // Select 'created_at' instead of 'createdAt'
        .eq('status', 'completed'); // Use 'completed' for successful transactions

      if (error) {
        console.error('Error fetching monthly revenue from payments:', error);
        throw error;
      }

      // Group by month and calculate revenue
      const monthlyData: { [key: string]: number } = {};
      
      data?.forEach(payment => {
        // Ensure payment.created_at is treated as a string or Date object
        const date = new Date(payment.created_at); 
        const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); // Include year for clarity across years
        
        if (monthlyData[monthKey]) {
          monthlyData[monthKey] += parseFloat(payment.amount.toString());
        } else {
          monthlyData[monthKey] = parseFloat(payment.amount.toString());
        }
      });

      // Sort months chronologically if needed (optional, but good for charts)
      const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA.getTime() - dateB.getTime();
      });

      // Convert to chart format
      return sortedMonths.map(name => ({
        name,
        value: monthlyData[name]
      }));
    },
  });
};
