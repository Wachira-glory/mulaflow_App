
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import Sidebar from '@/components/sidebar';
import AccountsTable from '@/components/AccountsTable';
import AddAccountModal from '@/components/AddAccountModal';

interface Account {
  id: string;
  name: string;
  account_type: string;
  account_number: string;
  balance: number;
  status: 'Active' | 'Inactive';
  icon: string;
}

const Indexx = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch accounts from Supabase
  const { data: accounts = [], isLoading, error, refetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      console.log('Fetching accounts from database...');
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching accounts:', error);
        throw error;
      }
      
      console.log('Accounts fetched:', data);
      
      // Transform data to match the expected interface
      return data.map((account: any) => ({
        id: account.id.toString(),
        name: account.name,
        type: account.account_type || 'Unknown',
        accountNumber: account.account_number || 'N/A',
        balance: Number(account.balance) || 0,
        status: account.status as 'Active' | 'Inactive',
        icon: account.icon || account.name?.charAt(0)?.toUpperCase() || 'A',
      }));
    },
  });

  const handleAddAccount = async (newAccount: any) => {
    console.log('Adding new account:', newAccount);
    
    try {
      const { data, error } = await supabase
        .from('accounts')
        .insert([{
          name: newAccount.name,
          account_type: newAccount.type,
          account_number: newAccount.accountNumber,
          balance: newAccount.balance || 0,
          status: newAccount.status || 'Active',
          icon: newAccount.icon,
          user_id: null // Will need authentication to set proper user_id
        }])
        .select();

      if (error) {
        console.error('Error adding account:', error);
        throw error;
      }

      console.log('Account added successfully:', data);
      
      // Refetch accounts to update the list
      refetch();
    } catch (error) {
      console.error('Failed to add account:', error);
    }
  };

  const filteredAccounts = accounts.filter((account: any) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Sidebar activeItem="accounts" />
        <div className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg">Loading accounts...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Sidebar activeItem="accounts" />
        <div className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-600">
                Error loading accounts: {error.message}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Sidebar activeItem="accounts" />
      
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Accounts</h1>
              <p className="text-muted-foreground">
                Manage your account and view your balances
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add account
              </Button>
            </div>
          </div>

          {/* Accounts Table */}
          <AccountsTable accounts={filteredAccounts} />
        </div>
      </div>

      {/* Add Account Modal */}
      <AddAccountModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddAccount={handleAddAccount}
      />
    </div>
  );
};

export default Indexx;
