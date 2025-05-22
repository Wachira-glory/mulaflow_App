
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Notification } from '@/types';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Notification[] || [];
    }
  });
};

export const useUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: ['unread-notifications-count'],
    queryFn: async () => {
      const { data, error, count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('status', 'New');
      
      if (error) {
        throw new Error(error.message);
      }
      
      return count || 0;
    }
  });
};
