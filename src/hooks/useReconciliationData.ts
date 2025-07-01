
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useReconciliationData = () => {
  return useQuery({
    queryKey: ['reconciliationData'],
    queryFn: async () => {
      // Get transaction counts for summary
      const { data: transactions, error: transactionError } = await supabase
        .from('transactions')
        .select('status');

      if (transactionError) {
        console.error('Error fetching transactions for reconciliation:', transactionError);
        throw transactionError;
      }

      const totalTransactions = transactions?.length || 0;
      const reconciled = transactions?.filter(t => t.status === 'Successful').length || 0;
      const pending = transactions?.filter(t => t.status === 'Pending').length || 0;
      const failed = transactions?.filter(t => t.status === 'Failed').length || 0;

      // Get discrepancies (failed/problematic transactions)
      const { data: discrepancyData, error: discrepancyError } = await supabase
        .from('transactions')
        .select('id, amount, createdAt, status')
        .eq('status', 'Failed');

      if (discrepancyError) {
        console.error('Error fetching discrepancies:', discrepancyError);
        throw discrepancyError;
      }

      const discrepancies = discrepancyData?.map((transaction, index) => ({
        id: `RC-${String(index + 1).padStart(3, '0')}`,
        transactionId: transaction.id,
        date: new Date(transaction.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        amount: `Ksh ${parseFloat(transaction.amount.toString()).toLocaleString()}`,
        discrepancyType: 'Payment Failed',
        status: 'Unresolved'
      })) || [];

      return {
        summary: {
          totalTransactions,
          reconciled,
          discrepancies: failed,
          pending
        },
        discrepancies
      };
    },
  });
};
