
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { PaymentMethod } from '@/types';

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as PaymentMethod[] || [];
    }
  });
};

export const useDefaultPaymentMethod = () => {
  return useQuery({
    queryKey: ['default-payment-method'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('isDefault', true)
        .single();
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as PaymentMethod | null;
    }
  });
};
