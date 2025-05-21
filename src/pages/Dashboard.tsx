
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import StatsCard from '@/components/stats-card';
import RevenueChart from '@/components/revenue-chart';
import QuickActions from '@/components/quick-actions';
import LastTransactions from '@/components/last-transactions';
import PaymentMethodsChart from '@/components/payment-methods-chart';
import TransactionsTable from '@/components/transactions-table';
import { CreditCard, ArrowUp } from 'lucide-react';

const Dashboard = () => {
  // Sample data for the charts
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

  const paymentMethodsData = [
    { name: 'Cards 35%', value: 35, color: '#3b82f6' },
    { name: 'M-pesa 30%', value: 30, color: '#374151' },
    { name: 'Bank Transfers 20%', value: 20, color: '#d946ef' },
    { name: 'Wallet 15%', value: 15, color: '#f97316' },
  ];

  const lastTransactions = [
    {
      id: 'tr-1',
      name: 'Maria Wanjiru - 3699xxxx',
      date: '25 Jan, 2025',
      amount: 'Ksh8,000.00',
      paymentMethod: 'M-PESA' as const,
      isPositive: true,
    },
    {
      id: 'tr-2',
      name: 'Anne W- 5456xxxx',
      date: '26 Jan, 2025',
      amount: 'Ksh30,000.00',
      paymentMethod: 'Card' as const,
      isPositive: true,
    },
    {
      id: 'tr-3',
      name: 'Kimani Ndegwa',
      date: '12 Feb, 2025',
      amount: 'Ksh10,000.00',
      paymentMethod: 'Bank Transfer' as const,
      isPositive: true,
    },
    {
      id: 'tr-4',
      name: 'Kaiya stanton',
      date: '24 Mar, 2025',
      amount: 'Ksh40,000.00',
      paymentMethod: 'M-PESA' as const,
      isPositive: true,
    },
  ];

  const transactions = [
    {
      id: 'TR-3699XXXX',
      amount: 'Ksh 8,000.00',
      status: 'Successful' as const,
      paymentMethod: 'M-PESA' as const,
      customer: 'Maria Wanjiru',
      date: 'Jan 25, 2025',
    },
    {
      id: 'TR-5456XXXX',
      amount: 'Ksh 30,000.00',
      status: 'Successful' as const,
      paymentMethod: 'Card' as const,
      customer: 'Anne W.',
      date: 'Jan 26, 2025',
    },
    {
      id: 'TR-7823XXXX',
      amount: 'Ksh 10,000.00',
      status: 'Successful' as const,
      paymentMethod: 'Bank Transfer' as const,
      customer: 'Kimani Ndegwa',
      date: 'Feb 12, 2025',
    },
    {
      id: 'TR-9012XXXX',
      amount: 'Ksh 40,000.00',
      status: 'Successful' as const,
      paymentMethod: 'Wallet' as const,
      customer: 'Kaiya Stanton',
      date: 'Mar 24, 2025',
    },
    {
      id: 'TR-1234XXXX',
      amount: 'Ksh 15,000.00',
      status: 'Pending' as const,
      paymentMethod: 'M-PESA' as const,
      customer: 'John Doe',
      date: 'Apr 5, 2025',
    },
    {
      id: 'TR-5678XXXX',
      amount: 'Ksh 25,000.00',
      status: 'Failed' as const,
      paymentMethod: 'Card' as const,
      customer: 'Jane Smith',
      date: 'Apr 10, 2025',
    },
    {
      id: 'TR-9101XXXX',
      amount: 'Ksh 5,000.00',
      status: 'Pending' as const,
      paymentMethod: 'Bank Transfer' as const,
      customer: 'Robert Johnson',
      date: 'Apr 15, 2025',
    },
    {
      id: 'TR-1121XXXX',
      amount: 'Ksh 12,000.00',
      status: 'Successful' as const,
      paymentMethod: 'Wallet' as const,
      customer: 'Sarah Williams',
      date: 'Apr 20, 2025',
    },
  ];

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
              <StatsCard 
                title="Total Inflow" 
                value="Ksh 200,000" 
                trend={+20} 
                icon={<CreditCard className="text-blue-600" size={18} />}
                textColor="text-gray-800"
              />
              <StatsCard 
                title="Successful Transactions" 
                value="20" 
                trend={+15} 
                icon={<ArrowUp className="text-green-600" size={18} />}
                trendColor="green"
              />
              <StatsCard 
                title="Pending Transactions" 
                value="12" 
                trend={-5} 
                trendColor="yellow"
              />
              <StatsCard 
                title="Failed Transactions" 
                value="2" 
                trend={-10} 
                trendColor="red"
              />
            </div>
            
            {/* Last Transactions and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                <LastTransactions transactions={lastTransactions} />
              </div>
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1">
                <PaymentMethodsChart data={paymentMethodsData} />
              </div>
              <div className="lg:col-span-1">
                <RevenueChart title="Monthly Revenue" data={monthlyRevenueData} />
              </div>
              <div className="lg:col-span-1">
                <RevenueChart title="Balance Revenue" data={balanceRevenueData} type="area" />
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
              
              <TransactionsTable transactions={transactions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
