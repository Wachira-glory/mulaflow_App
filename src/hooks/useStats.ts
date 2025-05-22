
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Stats } from '@/types';

export const useStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      // Get total inflow
      const { data: inflowData, error: inflowError } = await supabase.rpc('get_total_inflow');
      if (inflowError) throw new Error(inflowError.message);
      
      // Get transaction counts
      const { data: successfulCount, error: successfulError, count: successCount } = await supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .eq('status', 'Successful');
        
      const { data: pendingCount, error: pendingError, count: pendingCountVal } = await supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .eq('status', 'Pending');
        
      const { data: failedCount, error: failedError, count: failedCountVal } = await supabase
        .from('transactions')
        .select('*', { count: 'exact' })
        .eq('status', 'Failed');
        
      if (successfulError) throw new Error(successfulError.message);
      if (pendingError) throw new Error(pendingError.message);
      if (failedError) throw new Error(failedError.message);
      
      // Get payment method stats
      const { data: paymentMethodStats, error: statsError } = await supabase.rpc('get_payment_method_stats');
      if (statsError) throw new Error(statsError.message);
      
      const colors = {
        'Card': '#3b82f6',
        'M-PESA': '#374151',
        'Bank Transfer': '#d946ef',
        'Wallet': '#f97316'
      };
      
      const paymentMethods = paymentMethodStats ? paymentMethodStats.map(method => ({
        name: `${method.payment_method} ${method.percentage}%`,
        value: method.percentage,
        color: colors[method.payment_method as keyof typeof colors] || '#3b82f6'
      })) : [];
      
      return {
        totalInflow: inflowData || 0,
        successfulTransactions: successCount || 0,
        pendingTransactions: pendingCountVal || 0,
        failedTransactions: failedCountVal || 0,
        paymentMethods
      } as Stats;
    }
  });
};
