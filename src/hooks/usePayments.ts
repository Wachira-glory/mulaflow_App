import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Payment {
  id: string;
  amount: string | number;
  status: 'Successful' | 'Pending' | 'Failed';
  payment_method: 'M-PESA' | 'Card' | 'Bank Transfer' | 'Wallet';
  customer: string;
  date: string;
  description?: string;
  reference?: string;
  phone?: string;
  paybill?: string;
  purpose?: string;
  created_at?: string;
}

export const useRecentPayments = (limit: number = 10) => {
  return useQuery({
    queryKey: ['recent-payments', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw new Error(error.message);
      
      return data.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.payment_method,
        customer: payment.customer,
        date: payment.date,
        description: payment.description,
        reference: payment.reference,
        phone: payment.phone,
        paybill: payment.paybill,
        purpose: payment.purpose,
        createdAt: payment.created_at,
      }));
    }
  });
};

export const useAllPayments = () => {
  return useQuery({
    queryKey: ['all-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      
      return data.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        paymentMethod: payment.payment_method,
        customer: payment.customer,
        date: payment.date,
        description: payment.description,
        reference: payment.reference,
        phone: payment.phone,
        paybill: payment.paybill,
        purpose: payment.purpose,
        createdAt: payment.created_at,
      }));
    }
  });
};
