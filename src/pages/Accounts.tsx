//src/pages/Accounts.tsx
import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useAccounts } from '@/hooks/useAccounts';
import AddAccountModal from '@/components/add-account-modal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Accounts = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data: accounts = [], isLoading } = useAccounts();

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    const start = accountNumber.substring(0, 2);
    const end = accountNumber.substring(accountNumber.length - 3);
    const middle = '*'.repeat(Math.max(0, accountNumber.length - 5));
    return `${start}${middle}${end}`;
  };

  const getAccountIcon = (accountType: string, bankName?: string) => {
    if (accountType.toLowerCase().includes('mpesa') || accountType === 'Personal') {
      return (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 text-xs font-semibold">MP</span>
        </div>
      );
    }
    
    return (
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <span className="text-red-600 text-xs font-semibold">
          {bankName ? bankName.substring(0, 2).toUpperCase() : 'BK'}
        </span>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header showNewTransaction={false} />
        
        <main className="flex-1 overflow-y-auto p-6">
        
<div className="max-w-7xl mx-auto">
  <div className="flex justify-between items-center mb-6"> {/* Reduced margin-bottom */}
    <div className="ml-4"> {/* Added left margin to align with table cells */}
      <h1 className="text-2xl font-semibold">Accounts</h1>
      <p className="text-gray-600">Manage your accounts and view balances</p>
    </div>
    <Button 
      onClick={() => setIsAddModalOpen(true)}
      className="bg-blue-700 hover:bg-blue-800"
    >
      <Plus size={18} className="mr-2" />
      Add account
    </Button>
  </div>

  {/* Table container - added same left padding as title */}
  <div className="bg-white rounded-lg border ml-4"> 
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Active Accounts</h2>
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : accounts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No accounts found</p>
                    <Button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-blue-700 hover:bg-blue-800"
                    >
                      <Plus size={18} className="mr-2" />
                      Add your first account
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Account Number</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {accounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              {getAccountIcon(account.account_type, account.bank_name)}
                              <div>
                                <div className="font-medium">
                                  {account.bank_name || 'M-pesa'}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {account.account_name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {account.account_type}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-mono text-sm">
                              {maskAccountNumber(account.account_number)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold">
                              Ksh {account.balance.toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              account.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {account.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <AddAccountModal 
        open={isAddModalOpen} 
        onOpenChange={setIsAddModalOpen} 
      />
    </div>
  );
};

export default Accounts;