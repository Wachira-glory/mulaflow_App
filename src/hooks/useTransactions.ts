
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Transaction } from '@/types';

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Transaction[] || [];
    }
  });
};

export const useTransactionsByStatus = (status: 'Successful' | 'Pending' | 'Failed') => {
  return useQuery({
    queryKey: ['transactions', status],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('status', status)
        .order('createdAt', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Transaction[] || [];
    }
  });
};

export const useRecentTransactions = (limit: number = 5) => {
  return useQuery({
    queryKey: ['recent-transactions', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(limit);
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data as Transaction[] || [];
    }
  });
};
