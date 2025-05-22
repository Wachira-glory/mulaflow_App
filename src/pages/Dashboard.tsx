import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import StatsCard from '@/components/stats-card';
import RevenueChart from '@/components/revenue-chart';
import QuickActions from '@/components/quick-actions';
import LastTransactions from '@/components/last-transactions';
import PaymentMethodsChart from '@/components/payment-methods-chart';
import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
import { CreditCard, ArrowUp } from 'lucide-react';
import { useStats } from '@/hooks/useStats';
import { useRecentTransactions } from '@/hooks/useTransactions';

const Dashboard = () => {
  // Use hooks to fetch data from Supabase
  const { data: statsData, isLoading: isLoadingStats } = useStats();
  const { data: transactions = [], isLoading: isLoadingTransactions } = useRecentTransactions(8);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample data for the charts - in a real app these would come from Supabase
  const monthlyRevenueData = [
    { name: 'Oct', value: 8500 },
    { name: 'Nov', value: 12000 },
    { name: 'Dec', value: 9800 },
    { name: 'Jan', value: 15000 },
    { name: 'Feb', value: 12500 },
    { name: 'Mar', value: 18000 },
  ];

  const balanceRevenueData = [
    { name: 'Jul', value: 200 },
    { name: 'Aug', value: 350 },
    { name: 'Sep', value: 400 },
    { name: 'Oct', value: 450 },
    { name: 'Nov', value: 670 },
    { name: 'Dec', value: 580 },
    { name: 'Jan', value: 620 },
  ];
  
  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.customer.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(convertToTableTransaction);
  
  // Get latest transactions for the LastTransactions component
  const lastTransactions = transactions.slice(0, 4).map(transaction => ({
    id: transaction.id,
    name: `${transaction.customer} - ${transaction.id.substring(3, 7)}xxxx`,
    date: transaction.date,
    amount: transaction.amount.toString(),
    paymentMethod: transaction.paymentMethod,
    isPositive: true,
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header showNewTransaction showDatePicker />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {isLoadingStats ? (
                // Loading placeholders
                Array(4).fill(null).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))
              ) : (
                <>
                  <StatsCard 
                    title="Total Inflow" 
                    value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
                    trend={+20} 
                    icon={<CreditCard className="text-blue-600" size={18} />}
                    textColor="text-gray-800"
                  />
                  <StatsCard 
                    title="Successful Transactions" 
                    value={statsData?.successfulTransactions.toString() || '0'} 
                    trend={+15} 
                    icon={<ArrowUp className="text-green-600" size={18} />}
                    trendColor="green"
                  />
                  <StatsCard 
                    title="Pending Transactions" 
                    value={statsData?.pendingTransactions.toString() || '0'} 
                    trend={-5} 
                    trendColor="yellow"
                  />
                  <StatsCard 
                    title="Failed Transactions" 
                    value={statsData?.failedTransactions.toString() || '0'} 
                    trend={-10} 
                    trendColor="red"
                  />
                </>
              )}
            </div>
            
            {/* Last Transactions and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                <LastTransactions 
                  transactions={isLoadingTransactions ? [] : lastTransactions}
                  isLoading={isLoadingTransactions}
                />
              </div>
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <PaymentMethodsChart 
                  data={statsData?.paymentMethods || []}
                  isLoading={isLoadingStats}
                />
              </div>
              <div className="lg:col-span-1">
                <RevenueChart 
                  title="Monthly Revenue" 
                  data={monthlyRevenueData} 
                />
              </div>
              <div className="lg:col-span-1">
                <RevenueChart 
                  title="Balance Revenue" 
                  data={balanceRevenueData} 
                  type="area" 
                />
              </div>
            </div>
            
            {/* Transactions Table */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">All Transactions</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search transactions..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-4 py-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                    </div>
                  </div>
                  <button className="px-3 py-1 border rounded-md text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                    Filters
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-md overflow-hidden mb-4">
                <div className="flex border-b">
                  <button className="px-4 py-3 text-sm font-medium text-blue-700 border-b-2 border-blue-700">
                    All
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
                    Successful
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
                    Pending
                  </button>
                  <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
                    Failed
                  </button>
                </div>
              </div>
              
              <TransactionsTable 
                transactions={filteredTransactions} 
                isLoading={isLoadingTransactions}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
