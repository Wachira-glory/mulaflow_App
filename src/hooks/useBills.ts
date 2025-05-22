
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Bill } from '@/types';

export const useBills = () => {
  return useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bills')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Bill[] || [];
    }
  });
};
