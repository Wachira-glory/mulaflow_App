
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';
// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { CreditCard, ArrowUp } from 'lucide-react';
// import { useStats } from '@/hooks/useStats';
// import { useRecentTransactions } from '@/hooks/useTransactions';
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue';

// const Dashboard = () => {
//   // Use hooks to fetch data from Supabase
//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   const { data: transactions = [], isLoading: isLoadingTransactions } = useRecentTransactions(8);
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   // Get latest transactions for the LastTransactions component
//   const lastTransactions = transactions.slice(0, 4).map(transaction => ({
//     id: transaction.id,
//     name: `${transaction.customer} - ${transaction.id.substring(3, 7)}xxxx`,
//     // name: `${transaction.customer} - ${transaction.id.substring(3, 7)}xxxx`,
//     date: transaction.date,
//     amount: transaction.amount.toString(),
//     paymentMethod: transaction.paymentMethod,
//     isPositive: true,
//   }));

//   // Convert transactions for table display
//   const tableTransactions = transactions.map(convertToTableTransaction);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header showNewTransaction showDatePicker />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 // Loading placeholders
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<CreditCard className="text-blue-600" size={18} />}
//                     textColor="text-gray-800"
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<ArrowUp className="text-green-600" size={18} />}
//                     trendColor="green"
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     trendColor="yellow"
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     trendColor="red"
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingTransactions ? [] : lastTransactions}
//                   isLoading={isLoadingTransactions}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">All Transactions</h2>
//                 <div className="flex items-center space-x-2">
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
//                     </svg>
//                     Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                 <div className="flex border-b">
//                   <button className="px-4 py-3 text-sm font-medium text-blue-700 border-b-2 border-blue-700">
//                     All
//                   </button>
//                   <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
//                     Successful
//                   </button>
//                   <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
//                     Pending
//                   </button>
//                   <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
//                     Failed
//                   </button>
//                 </div>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={isLoadingTransactions}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';
// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { CreditCard, ArrowUp } from 'lucide-react';
// import { useStats } from '@/hooks/useStats';
// import { useRecentTransactions } from '@/hooks/useTransactions'; 
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 

// const Dashboard = () => {
//   // Use hooks to fetch data from Supabase
//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   // useRecentTransactions and useMonthlyRevenue are now configured to fetch from 'payments' table
//   const { data: transactions = [], isLoading: isLoadingTransactions } = useRecentTransactions(8);
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   // Get latest transactions for the LastTransactions component
//   const lastTransactions = transactions.slice(0, 4).map(payment => ({
//     id: payment.id,
//     // Use 'uid' or 'reference' from the payments table for the name/description
//     name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
//     date: payment.created_at, // Use 'created_at' from the payments table for the date
//     amount: payment.amount?.toString(), // Ensure amount is converted to string
//     // 'paymentMethod' is derived from the joined 'channels.name' in useRecentTransactions
//     paymentMethod: payment.channels?.name || 'N/A', 
//     // Determine if the transaction is positive based on 'category'
//     isPositive: payment.category === 'inbound', 
//   }));

//   // Convert transactions for table display using the updated convertToTableTransaction
//   const tableTransactions = transactions.map(convertToTableTransaction);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header showNewTransaction showDatePicker />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 // Loading placeholders
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<CreditCard className="text-blue-600" size={18} />}
//                     textColor="text-gray-800"
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<ArrowUp className="text-green-600" size={18} />}
//                     trendColor="green"
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     trendColor="yellow"
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     trendColor="red"
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingTransactions ? [] : lastTransactions}
//                   isLoading={isLoadingTransactions}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">All Transactions</h2>
//                 <div className="flex items-center space-x-2">
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
//                     </svg>
//                     Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                   {/* These buttons will filter the table, you might need to implement filtering logic
//                   based on the 'status' column of the 'payments' table. */}
//                   <button className="px-4 py-3 text-sm font-medium text-blue-700 border-b-2 border-blue-700">
//                       All
//                   </button>
//                   <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
//                       Successful
//                   </button>
//                   <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
//                       Pending
//                   </button>
//                   <button className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-blue-600">
//                       Failed
//                   </button>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={isLoadingTransactions}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';
// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { CreditCard, ArrowUp, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react'; // Added lucide icons for stats cards
// import { useStats } from '@/hooks/useStats';
// import { useRecentTransactions, useTransactionsByStatus, useTransactions } from '@/hooks/useTransactions'; // Import all necessary transaction hooks
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 

// const Dashboard = () => {
//   // State to manage the currently selected transaction status filter
//   const [selectedStatus, setSelectedStatus] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');

//   // Use hooks to fetch data from Supabase
//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   // Fetch all transactions for the 'All' filter state
//   const { data: allTransactionsData = [], isLoading: allTransactionsLoading } = useTransactions();

//   // Conditionally fetch transactions by status based on selectedStatus
//   // The 'enabled' option ensures the query only runs when its respective status is selected.
//   const { data: successfulTransactionsData = [], isLoading: successfulTransactionsLoading } = useTransactionsByStatus('Successful', {
//     enabled: selectedStatus === 'Successful',
//   });
//   const { data: pendingTransactionsData = [], isLoading: pendingTransactionsLoading } = useTransactionsByStatus('Pending', {
//     enabled: selectedStatus === 'Pending',
//   });
//   const { data: failedTransactionsData = [], isLoading: failedTransactionsLoading } = useTransactionsByStatus('Failed', {
//     enabled: selectedStatus === 'Failed',
//   });

//   // Determine which transactions array to display based on selectedStatus
//   const transactionsToDisplay = 
//     selectedStatus === 'Successful' ? successfulTransactionsData :
//     selectedStatus === 'Pending' ? pendingTransactionsData :
//     selectedStatus === 'Failed' ? failedTransactionsData :
//     allTransactionsData;

//   // Determine the loading state for the displayed transactions
//   const transactionsLoading = 
//     selectedStatus === 'Successful' ? successfulTransactionsLoading :
//     selectedStatus === 'Pending' ? pendingTransactionsLoading :
//     selectedStatus === 'Failed' ? failedTransactionsLoading :
//     allTransactionsLoading;

//   // Get latest transactions for the LastTransactions component (always from 'All' pool for consistency)
//   // Ensure 'payment' object properties match what's returned by useTransactions hook
//   const lastTransactions = allTransactionsData.slice(0, 4).map(payment => ({
//     id: payment.id,
//     name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
//     date: payment.created_at, 
//     amount: payment.amount?.toString(), 
//     paymentMethod: payment.channels?.name || 'N/A', 
//     isPositive: payment.category === 'inbound', 
//   }));

//   // Convert transactions for table display
//   const tableTransactions = transactionsToDisplay.map(convertToTableTransaction);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header showNewTransaction showDatePicker />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 // Loading placeholders
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<DollarSign className="text-blue-600" size={18} />} // Changed icon to DollarSign
//                     textColor="text-gray-800"
//                     onClick={() => setSelectedStatus('All')} // Clicking Total Inflow shows all transactions
//                     isActive={selectedStatus === 'All'}
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<CheckCircle className="text-green-600" size={18} />} // Changed icon to CheckCircle
//                     trendColor="green"
//                     onClick={() => setSelectedStatus('Successful')} // Set filter on click
//                     isActive={selectedStatus === 'Successful'} // Pass active state for styling
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     icon={<Clock className="text-yellow-600" size={18} />} // Changed icon to Clock
//                     trendColor="yellow"
//                     onClick={() => setSelectedStatus('Pending')} // Set filter on click
//                     isActive={selectedStatus === 'Pending'} // Pass active state for styling
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     icon={<XCircle className="text-red-600" size={18} />} // Changed icon to XCircle
//                     trendColor="red"
//                     onClick={() => setSelectedStatus('Failed')} // Set filter on click
//                     isActive={selectedStatus === 'Failed'} // Pass active state for styling
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingStats ? [] : lastTransactions} // Use isLoadingStats for LastTransactions
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats} // Use isLoadingStats for PaymentMethodsChart
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">
//                   {selectedStatus === 'All' ? 'All Transactions' : `${selectedStatus} Transactions`}
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   {/* Show "Show All" button only if a filter is active */}
//                   {selectedStatus !== 'All' && (
//                     <button 
//                       onClick={() => setSelectedStatus('All')} 
//                       className="px-3 py-1 border rounded-md text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
//                     >
//                       Show All
//                     </button>
//                   )}
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
//                     </svg>
//                     Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                 <div className="flex border-b">
//                   {/* Filter buttons for the table */}
//                   <button 
//                     onClick={() => setSelectedStatus('All')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     All
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Successful')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Successful
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Pending')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Pending
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Failed')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Failed
//                   </button>
//                 </div>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={transactionsLoading}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';
// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { CreditCard, ArrowUp, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react'; // Added lucide icons for stats cards
// import { useStats } from '@/hooks/useStats';
// import { useRecentTransactions, useTransactionsByStatus, useTransactions } from '@/hooks/useTransactions'; // Import all necessary transaction hooks
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 

// const Dashboard = () => {
//   // State to manage the currently selected transaction status filter
//   const [selectedStatus, setSelectedStatus] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');

//   // Use hooks to fetch data from Supabase
//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   // Fetch all transactions for the 'All' filter state
//   const { data: allTransactionsData = [], isLoading: allTransactionsLoading } = useTransactions();

//   // Conditionally fetch transactions by status based on selectedStatus
//   // The 'enabled' option ensures the query only runs when its respective status is selected.
//   const { data: successfulTransactionsData = [], isLoading: successfulTransactionsLoading } = useTransactionsByStatus('Successful', {
//     enabled: selectedStatus === 'Successful',
//   });
//   const { data: pendingTransactionsData = [], isLoading: pendingTransactionsLoading } = useTransactionsByStatus('Pending', {
//     enabled: selectedStatus === 'Pending',
//   });
//   const { data: failedTransactionsData = [], isLoading: failedTransactionsLoading } = useTransactionsByStatus('Failed', {
//     enabled: selectedStatus === 'Failed',
//   });

//   // Determine which transactions array to display based on selectedStatus
//   const transactionsToDisplay = 
//     selectedStatus === 'Successful' ? successfulTransactionsData :
//     selectedStatus === 'Pending' ? pendingTransactionsData :
//     selectedStatus === 'Failed' ? failedTransactionsData :
//     allTransactionsData;

//   // Determine the loading state for the displayed transactions
//   const transactionsLoading = 
//     selectedStatus === 'Successful' ? successfulTransactionsLoading :
//     selectedStatus === 'Pending' ? pendingTransactionsLoading :
//     selectedStatus === 'Failed' ? failedTransactionsLoading :
//     allTransactionsLoading;

//   // Get latest transactions for the LastTransactions component (always from 'All' pool for consistency)
//   // Ensure 'payment' object properties match what's returned by useTransactions hook
//   const lastTransactions = allTransactionsData.slice(0, 4).map(payment => ({
//     id: payment.id,
//     name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
//     date: payment.created_at, 
//     amount: payment.amount?.toString(), 
//     paymentMethod: payment.channels?.name || 'N/A', 
//     isPositive: payment.category === 'inbound', 
//   }));

//   // Convert transactions for table display
//   const tableTransactions = transactionsToDisplay.map(convertToTableTransaction);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header showNewTransaction showDatePicker />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 // Loading placeholders
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<DollarSign className="text-blue-600" size={18} />} // Changed icon to DollarSign
//                     textColor="text-gray-800"
//                     onClick={() => setSelectedStatus('All')} // Clicking Total Inflow shows all transactions
//                     isActive={selectedStatus === 'All'}
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<CheckCircle className="text-green-600" size={18} />} // Changed icon to CheckCircle
//                     trendColor="green"
//                     onClick={() => setSelectedStatus('Successful')} // Set filter on click
//                     isActive={selectedStatus === 'Successful'} // Pass active state for styling
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     icon={<Clock className="text-yellow-600" size={18} />} // Changed icon to Clock
//                     trendColor="yellow"
//                     onClick={() => setSelectedStatus('Pending')} // Set filter on click
//                     isActive={selectedStatus === 'Pending'} // Pass active state for styling
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     icon={<XCircle className="text-red-600" size={18} />} // Changed icon to XCircle
//                     trendColor="red"
//                     onClick={() => setSelectedStatus('Failed')} // Set filter on click
//                     isActive={selectedStatus === 'Failed'} // Pass active state for styling
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingStats ? [] : lastTransactions} // Use isLoadingStats for LastTransactions
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats} // Use isLoadingStats for PaymentMethodsChart
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">
//                   {selectedStatus === 'All' ? 'All Transactions' : `${selectedStatus} Transactions`}
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   {/* Show "Show All" button only if a filter is active */}
//                   {selectedStatus !== 'All' && (
//                     <button 
//                       onClick={() => setSelectedStatus('All')} 
//                       className="px-3 py-1 border rounded-md text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
//                     >
//                       Show All
//                     </button>
//                   )}
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
//                     </svg>
//                     Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                 <div className="flex border-b">
//                   {/* Filter buttons for the table */}
//                   <button 
//                     onClick={() => setSelectedStatus('All')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     All
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Successful')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Successful
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Pending')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Pending
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Failed')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Failed
//                   </button>
//                 </div>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={transactionsLoading}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';
// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { CreditCard, ArrowUp, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react'; // Added lucide icons for stats cards
// import { useStats } from '@/hooks/useStats';
// import { useRecentTransactions, useTransactionsByStatus, useTransactions } from '@/hooks/useTransactions'; // Import all necessary transaction hooks
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 

// const Dashboard = () => {
//   // State to manage the currently selected transaction status filter
//   const [selectedStatus, setSelectedStatus] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');

//   // Use hooks to fetch data from Supabase
//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   // Fetch all transactions for the 'All' filter state
//   const { data: allTransactionsData = [], isLoading: allTransactionsLoading } = useTransactions();

//   // Conditionally fetch transactions by status based on selectedStatus
//   // The 'enabled' option ensures the query only runs when its respective status is selected.
//   const { data: successfulTransactionsData = [], isLoading: successfulTransactionsLoading } = useTransactionsByStatus('Successful', {
//     enabled: selectedStatus === 'Successful',
//   });
//   const { data: pendingTransactionsData = [], isLoading: pendingTransactionsLoading } = useTransactionsByStatus('Pending', {
//     enabled: selectedStatus === 'Pending',
//   });
//   const { data: failedTransactionsData = [], isLoading: failedTransactionsLoading } = useTransactionsByStatus('Failed', {
//     enabled: selectedStatus === 'Failed',
//   });

//   // Determine which transactions array to display based on selectedStatus
//   const transactionsToDisplay = 
//     selectedStatus === 'Successful' ? successfulTransactionsData :
//     selectedStatus === 'Pending' ? pendingTransactionsData :
//     selectedStatus === 'Failed' ? failedTransactionsData :
//     allTransactionsData;

//   // Determine the loading state for the displayed transactions
//   const transactionsLoading = 
//     selectedStatus === 'Successful' ? successfulTransactionsLoading :
//     selectedStatus === 'Pending' ? pendingTransactionsLoading :
//     selectedStatus === 'Failed' ? failedTransactionsLoading :
//     allTransactionsLoading;

//   // Get latest transactions for the LastTransactions component (always from 'All' pool for consistency)
//   // Ensure 'payment' object properties match what's returned by useTransactions hook
//   const lastTransactions = allTransactionsData.slice(0, 4).map(payment => ({
//     id: payment.id,
//     name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
//     date: payment.created_at, 
//     amount: payment.amount?.toString(), 
//     paymentMethod: payment.channels?.name || 'N/A', 
//     isPositive: payment.category === 'inbound', 
//   }));

//   // Convert transactions for table display
//   const tableTransactions = transactionsToDisplay.map(convertToTableTransaction);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header showNewTransaction showDatePicker />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 // Loading placeholders
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<DollarSign className="text-blue-600" size={18} />} // Changed icon to DollarSign
//                     textColor="text-gray-800"
//                     onClick={() => setSelectedStatus('All')} // Clicking Total Inflow shows all transactions
//                     isActive={selectedStatus === 'All'}
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<CheckCircle className="text-green-600" size={18} />} // Changed icon to CheckCircle
//                     trendColor="green"
//                     onClick={() => setSelectedStatus('Successful')} // Set filter on click
//                     isActive={selectedStatus === 'Successful'} // Pass active state for styling
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     icon={<Clock className="text-yellow-600" size={18} />} // Changed icon to Clock
//                     trendColor="yellow"
//                     onClick={() => setSelectedStatus('Pending')} // Set filter on click
//                     isActive={selectedStatus === 'Pending'} // Pass active state for styling
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     icon={<XCircle className="text-red-600" size={18} />} // Changed icon to XCircle
//                     trendColor="red"
//                     onClick={() => setSelectedStatus('Failed')} // Set filter on click
//                     isActive={selectedStatus === 'Failed'} // Pass active state for styling
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingStats ? [] : lastTransactions} // Use isLoadingStats for LastTransactions
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats} // Use isLoadingStats for PaymentMethodsChart
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">
//                   {selectedStatus === 'All' ? 'All Transactions' : `${selectedStatus} Transactions`}
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   {/* Show "Show All" button only if a filter is active */}
//                   {selectedStatus !== 'All' && (
//                     <button 
//                       onClick={() => setSelectedStatus('All')} 
//                       className="px-3 py-1 border rounded-md text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
//                     >
//                       Show All
//                     </button>
//                   )}
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
//                     </svg>
//                     Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                 <div className="flex border-b">
//                   {/* Filter buttons for the table */}
//                   <button 
//                     onClick={() => setSelectedStatus('All')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     All
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Successful')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Successful
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Pending')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Pending
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Failed')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Failed
//                   </button>
//                 </div>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={transactionsLoading}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';
// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { DollarSign, CheckCircle, Clock, XCircle, SlidersHorizontal } from 'lucide-react'; // Added SlidersHorizontal icon for filter
// import { useStats } from '@/hooks/useStats';
// import { useTransactionsByStatus, useTransactions } from '@/hooks/useTransactions'; 
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 
// import { getMonthOptions } from '@/lib/utils'; // Import from your lib/utils.ts
// // import {Header} from '@/components/header';


// const Dashboard = () => {
//   const today = new Date();
//   // State to manage the currently selected transaction status filter
//   const [selectedStatus, setSelectedStatus] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');
//   // New state for selected month/year filter
//   const [selectedMonthYear, setSelectedMonthYear] = useState<string>('All'); // e.g., '2024-05' or 'All'

//   // Generate month options for the dropdown (last 12 months including current)
//   const monthOptions = getMonthOptions(12); 

//   // Use hooks to fetch data from Supabase
//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   // Fetch all transactions (with month filter)
//   const { data: allTransactionsData = [], isLoading: allTransactionsLoading } = useTransactions(selectedMonthYear);

//   // Conditionally fetch transactions by status (with month filter)
//   const { data: successfulTransactionsData = [], isLoading: successfulTransactionsLoading } = useTransactionsByStatus('Successful', {
//     enabled: selectedStatus === 'Successful',
//   }, selectedMonthYear); // Pass selectedMonthYear
  
//   const { data: pendingTransactionsData = [], isLoading: isLoadingPending } = useTransactionsByStatus('Pending', {
//     enabled: selectedStatus === 'Pending',
//   }, selectedMonthYear); // Pass selectedMonthYear
  
//   const { data: failedTransactionsData = [], isLoading: isLoadingFailed } = useTransactionsByStatus('Failed', {
//     enabled: selectedStatus === 'Failed',
//   }, selectedMonthYear); // Pass selectedMonthYear

//   // Determine which transactions array to display based on selectedStatus
//   const transactionsToDisplay = 
//     selectedStatus === 'Successful' ? successfulTransactionsData :
//     selectedStatus === 'Pending' ? pendingTransactionsData :
//     selectedStatus === 'Failed' ? failedTransactionsData :
//     allTransactionsData;

//   // Determine the loading state for the displayed transactions
//   const transactionsLoading = 
//     selectedStatus === 'Successful' ? successfulTransactionsLoading :
//     selectedStatus === 'Pending' ? isLoadingPending :
//     selectedStatus === 'Failed' ? isLoadingFailed :
//     allTransactionsLoading;

//   // Get latest transactions for the LastTransactions component (always from 'All' pool for consistency)
//   // This will NOT be affected by the selectedMonthYear filter unless you pass selectedMonthYear to useRecentTransactions
//   const lastTransactions = allTransactionsData.slice(0, 4).map(payment => ({
//     id: payment.id,
//     name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
//     date: payment.created_at, 
//     amount: payment.amount?.toString(), 
//     paymentMethod: payment.channels?.name || 'N/A', 
//     isPositive: payment.category === 'inbound', 
//   }));

//   // Convert transactions for table display
//   const tableTransactions = transactionsToDisplay.map(convertToTableTransaction);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* <Header showNewTransaction showDatePicker /> */}
//         <Header showNewTransaction showDatePicker currentDate={today} /> 

//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 // Loading placeholders
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<DollarSign className="text-blue-600" size={18} />} 
//                     textColor="text-gray-800"
//                     onClick={() => setSelectedStatus('All')} 
//                     isActive={selectedStatus === 'All'}
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<CheckCircle className="text-green-600" size={18} />} 
//                     trendColor="green"
//                     onClick={() => setSelectedStatus('Successful')} 
//                     isActive={selectedStatus === 'Successful'} 
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     icon={<Clock className="text-yellow-600" size={18} />} 
//                     trendColor="yellow"
//                     onClick={() => setSelectedStatus('Pending')} 
//                     isActive={selectedStatus === 'Pending'} 
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     icon={<XCircle className="text-red-600" size={18} />} 
//                     trendColor="red"
//                     onClick={() => setSelectedStatus('Failed')} 
//                     isActive={selectedStatus === 'Failed'} 
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingStats ? [] : lastTransactions} 
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats} 
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">
//                   {selectedStatus === 'All' ? 'All Transactions' : `${selectedStatus} Transactions`}
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   {/* Show "Show All" button only if a status filter is active */}
//                   {selectedStatus !== 'All' && (
//                     <button 
//                       onClick={() => setSelectedStatus('All')} 
//                       className="px-3 py-1 border rounded-md text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
//                     >
//                       Show All
//                     </button>
//                   )}
//                   {/* Month Filter Dropdown */}
//                   <div className="relative">
//                     <select
//                       value={selectedMonthYear}
//                       onChange={(e) => setSelectedMonthYear(e.target.value)}
//                       className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-1 px-3 text-sm leading-tight focus:outline-none focus:border-blue-500 pr-8"
//                     >
//                       {monthOptions.map(option => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                       <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                         <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//                       </svg>
//                     </div>
//                   </div>
//                   {/* Original Filters button (can be removed or repurposed if dropdown suffices) */}
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <SlidersHorizontal className="w-4 h-4 mr-1" /> {/* More relevant icon */}
//                     More Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                 <div className="flex border-b">
//                   {/* Filter buttons for the table */}
//                   <button 
//                     onClick={() => setSelectedStatus('All')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     All
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Successful')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Successful
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Pending')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Pending
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Failed')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Failed
//                   </button>
//                 </div>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={transactionsLoading}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';
// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { DollarSign, CheckCircle, Clock, XCircle, SlidersHorizontal } from 'lucide-react';
// import { useStats } from '@/hooks/useStats';
// import { useTransactionsByStatus, useTransactions } from '@/hooks/useTransactions'; 
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 
// import { getMonthOptions } from '@/lib/utils';

// const Dashboard = () => {
//   const [selectedStatus, setSelectedStatus] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');
//   const [selectedMonthYear, setSelectedMonthYear] = useState<string>('All');

//   const monthOptions = getMonthOptions(12); 
//   const today = new Date(); // Still getting today's date, but won't be passed to Header for display

//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   const { data: allTransactionsData = [], isLoading: allTransactionsLoading } = useTransactions(selectedMonthYear);

//   const { data: successfulTransactionsData = [], isLoading: successfulTransactionsLoading } = useTransactionsByStatus('Successful', {
//     enabled: selectedStatus === 'Successful',
//   }, selectedMonthYear);
  
//   const { data: pendingTransactionsData = [], isLoading: isLoadingPending } = useTransactionsByStatus('Pending', {
//     enabled: selectedStatus === 'Pending',
//   }, selectedMonthYear);
  
//   const { data: failedTransactionsData = [], isLoading: isLoadingFailed } = useTransactionsByStatus('Failed', {
//     enabled: selectedStatus === 'Failed',
//   }, selectedMonthYear);

//   const transactionsToDisplay = 
//     selectedStatus === 'Successful' ? successfulTransactionsData :
//     selectedStatus === 'Pending' ? pendingTransactionsData :
//     selectedStatus === 'Failed' ? failedTransactionsData :
//     allTransactionsData;

//   const transactionsLoading = 
//     selectedStatus === 'Successful' ? successfulTransactionsLoading :
//     selectedStatus === 'Pending' ? isLoadingPending :
//     selectedStatus === 'Failed' ? isLoadingFailed :
//     allTransactionsLoading;

//   const lastTransactions = allTransactionsData.slice(0, 4).map(payment => ({
//     id: payment.id,
//     name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
//     date: payment.created_at, 
//     amount: payment.amount?.toString(), 
//     paymentMethod: payment.channels?.name || 'N/A', 
//     isPositive: payment.category === 'inbound', 
//   }));

//   const tableTransactions = transactionsToDisplay.map(convertToTableTransaction);

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Removed showDatePicker and currentDate props */}
//         <Header showNewTransaction /> 
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<DollarSign className="text-blue-600" size={18} />} 
//                     textColor="text-gray-800"
//                     onClick={() => setSelectedStatus('All')} 
//                     isActive={selectedStatus === 'All'}
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<CheckCircle className="text-green-600" size={18} />} 
//                     trendColor="green"
//                     onClick={() => setSelectedStatus('Successful')} 
//                     isActive={selectedStatus === 'Successful'} 
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     icon={<Clock className="text-yellow-600" size={18} />} 
//                     trendColor="yellow"
//                     onClick={() => setSelectedStatus('Pending')} 
//                     isActive={selectedStatus === 'Pending'} 
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     icon={<XCircle className="text-red-600" size={18} />} 
//                     trendColor="red"
//                     onClick={() => setSelectedStatus('Failed')} 
//                     isActive={selectedStatus === 'Failed'} 
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingStats ? [] : lastTransactions} 
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats} 
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">
//                   {selectedStatus === 'All' ? 'All Transactions' : `${selectedStatus} Transactions`}
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   {selectedStatus !== 'All' && (
//                     <button 
//                       onClick={() => setSelectedStatus('All')} 
//                       className="px-3 py-1 border rounded-md text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
//                     >
//                       Show All
//                     </button>
//                   )}
//                   {/* Month Filter Dropdown */}
//                   <div className="relative">
//                     <select
//                       value={selectedMonthYear}
//                       onChange={(e) => setSelectedMonthYear(e.target.value)}
//                       className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-1 px-3 text-sm leading-tight focus:outline-none focus:border-blue-500 pr-8"
//                     >
//                       {monthOptions.map(option => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                       <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                         <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//                       </svg>
//                     </div>
//                   </div>
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <SlidersHorizontal className="w-4 h-4 mr-1" />
//                     More Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                 <div className="flex border-b">
//                   <button 
//                     onClick={() => setSelectedStatus('All')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     All
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Successful')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Successful
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Pending')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Pending
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Failed')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Failed
//                   </button>
//                 </div>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={transactionsLoading}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// src/pages/Dashboard.tsx

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import StatsCard from '@/components/stats-card';
// import RevenueChart from '@/components/revenue-chart';

// import QuickActions from '@/components/quick-actions';
// import LastTransactions from '@/components/last-transactions';
// import PaymentMethodsChart from '@/components/payment-methods-chart';
// import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
// import { DollarSign, CheckCircle, Clock, XCircle, SlidersHorizontal } from 'lucide-react';
// import { useStats } from '@/hooks/useStats';
// import { useTransactionsByStatus, useTransactions } from '@/hooks/useTransactions'; 
// import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 
// import { getMonthOptions } from '@/lib/utils';

// const Dashboard = () => {
//   const navigate = useNavigate(); // NEW: Get the navigate function
//   const [selectedStatus, setSelectedStatus] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');
//   const [selectedMonthYear, setSelectedMonthYear] = useState<string>('All');

//   const monthOptions = getMonthOptions(12); 
//   const today = new Date(); 

//   const { data: statsData, isLoading: isLoadingStats } = useStats();
//   const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
//   const { data: allTransactionsData = [], isLoading: allTransactionsLoading } = useTransactions(selectedMonthYear);

//   const { data: successfulTransactionsData = [], isLoading: successfulTransactionsLoading } = useTransactionsByStatus('Successful', {
//     enabled: selectedStatus === 'Successful',
//   }, selectedMonthYear);
  
//   const { data: pendingTransactionsData = [], isLoading: isLoadingPending } = useTransactionsByStatus('Pending', {
//     enabled: selectedStatus === 'Pending',
//   }, selectedMonthYear);
  
//   const { data: failedTransactionsData = [], isLoading: isLoadingFailed } = useTransactionsByStatus('Failed', {
//     enabled: selectedStatus === 'Failed',
//   }, selectedMonthYear);

//   const transactionsToDisplay = 
//     selectedStatus === 'Successful' ? successfulTransactionsData :
//     selectedStatus === 'Pending' ? pendingTransactionsData :
//     selectedStatus === 'Failed' ? failedTransactionsData :
//     allTransactionsData;

//   const transactionsLoading = 
//     selectedStatus === 'Successful' ? successfulTransactionsLoading :
//     selectedStatus === 'Pending' ? isLoadingPending :
//     selectedStatus === 'Failed' ? isLoadingFailed :
//     allTransactionsLoading;

//   const lastTransactions = allTransactionsData.slice(0, 4).map(payment => ({
//     id: payment.id,
//     name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
//     date: payment.created_at, 
//     amount: payment.amount?.toString(), 
//     paymentMethod: payment.channels?.name || 'N/A', 
//     isPositive: payment.category === 'inbound', 
//   }));

//   const tableTransactions = transactionsToDisplay.map(convertToTableTransaction);

//   // NEW: Function to handle navigation to the new transaction page
//   const handleNewTransactionClick = () => {
//     navigate('/pay-in'); // Navigate to the /payin route
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Pass the new click handler to the Header */}
//         <Header showNewTransaction onNewTransactionClick={handleNewTransactionClick} /> 
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {isLoadingStats ? (
//                 Array(4).fill(null).map((_, i) => (
//                   <div key={i} className="bg-white rounded-lg p-4 border animate-pulse">
//                     <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
//                     <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                   </div>
//                 ))
//               ) : (
//                 <>
//                   <StatsCard 
//                     title="Total Inflow" 
//                     value={`Ksh ${statsData?.totalInflow.toLocaleString() || '0'}`}
//                     trend={+20} 
//                     icon={<DollarSign className="text-blue-600" size={18} />} 
//                     textColor="text-gray-800"
//                     onClick={() => setSelectedStatus('All')} 
//                     isActive={selectedStatus === 'All'}
//                   />
//                   <StatsCard 
//                     title="Successful Transactions" 
//                     value={statsData?.successfulTransactions.toString() || '0'} 
//                     trend={+15} 
//                     icon={<CheckCircle className="text-green-600" size={18} />} 
//                     trendColor="green"
//                     onClick={() => setSelectedStatus('Successful')} 
//                     isActive={selectedStatus === 'Successful'} 
//                   />
//                   <StatsCard 
//                     title="Pending Transactions" 
//                     value={statsData?.pendingTransactions.toString() || '0'} 
//                     trend={-5} 
//                     icon={<Clock className="text-yellow-600" size={18} />} 
//                     trendColor="yellow"
//                     onClick={() => setSelectedStatus('Pending')} 
//                     isActive={selectedStatus === 'Pending'} 
//                   />
//                   <StatsCard 
//                     title="Failed Transactions" 
//                     value={statsData?.failedTransactions.toString() || '0'} 
//                     trend={-10} 
//                     icon={<XCircle className="text-red-600" size={18} />} 
//                     trendColor="red"
//                     onClick={() => setSelectedStatus('Failed')} 
//                     isActive={selectedStatus === 'Failed'} 
//                   />
//                 </>
//               )}
//             </div>
            
//             {/* Last Transactions and Quick Actions */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
//               <div className="lg:col-span-3">
//                 <LastTransactions 
//                   transactions={isLoadingStats ? [] : lastTransactions} 
//                   isLoading={isLoadingStats}
//                 />
//               </div>
//               <div className="lg:col-span-1">
//                 <QuickActions />
//               </div>
//             </div>
            
//             {/* Charts */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               <div className="lg:col-span-1">
//                 <PaymentMethodsChart 
//                   data={statsData?.paymentMethods || []}
//                   isLoading={isLoadingStats} 
//                 />
//               </div>
//               <div className="lg:col-span-2">
//                 <RevenueChart 
//                   title="Monthly Revenue" 
//                   data={monthlyRevenueData} 
//                   isLoading={isLoadingRevenue}
//                 />
//               </div>
//             </div>
            
//             {/* Transactions Table */}
//             <div className="mb-8">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg">
//                   {selectedStatus === 'All' ? 'All Transactions' : `${selectedStatus} Transactions`}
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   {selectedStatus !== 'All' && (
//                     <button 
//                       onClick={() => setSelectedStatus('All')} 
//                       className="px-3 py-1 border rounded-md text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
//                     >
//                       Show All
//                     </button>
//                   )}
//                   {/* Month Filter Dropdown */}
//                   <div className="relative">
//                     <select
//                       value={selectedMonthYear}
//                       onChange={(e) => setSelectedMonthYear(e.target.value)}
//                       className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-1 px-3 text-sm leading-tight focus:outline-none focus:border-blue-500 pr-8"
//                     >
//                       {monthOptions.map(option => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                       <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                         <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//                       </svg>
//                     </div>
//                   </div>
//                   <button className="px-3 py-1 border rounded-md text-sm flex items-center">
//                     <SlidersHorizontal className="w-4 h-4 mr-1" />
//                     More Filters
//                   </button>
//                 </div>
//               </div>
              
//               <div className="bg-white rounded-md overflow-hidden mb-4">
//                 <div className="flex border-b">
//                   <button 
//                     onClick={() => setSelectedStatus('All')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     All
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Successful')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Successful
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Pending')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Pending
//                   </button>
//                   <button 
//                     onClick={() => setSelectedStatus('Failed')} 
//                     className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
//                   >
//                     Failed
//                   </button>
//                 </div>
//               </div>
              
//               <TransactionsTable 
//                 transactions={tableTransactions} 
//                 isLoading={transactionsLoading}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import StatsCard from '@/components/stats-card';
import RevenueChart from '@/components/revenue-chart';
import QuickActions from '@/components/quick-actions';
import LastTransactions from '@/components/last-transactions';
import PaymentMethodsChart from '@/components/payment-methods-chart';
import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';
import { DollarSign, CheckCircle, Clock, XCircle, SlidersHorizontal } from 'lucide-react';
import { useStats } from '@/hooks/useStats';
import { useTransactionsByStatus, useTransactions } from '@/hooks/useTransactions'; 
import { useMonthlyRevenue } from '@/hooks/useMonthlyRevenue'; 
import { getMonthOptions } from '@/lib/utils';

const Dashboard = () => {
  const navigate = useNavigate(); // NEW: Get the navigate function
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Successful' | 'Pending' | 'Failed'>('All');
  const [selectedMonthYear, setSelectedMonthYear] = useState<string>('All');

  const monthOptions = getMonthOptions(12); 
  const today = new Date(); 

  const { data: statsData, isLoading: isLoadingStats } = useStats();
  const { data: monthlyRevenueData = [], isLoading: isLoadingRevenue } = useMonthlyRevenue();
  
  const { data: allTransactionsData = [], isLoading: allTransactionsLoading } = useTransactions(selectedMonthYear);

  const { data: successfulTransactionsData = [], isLoading: successfulTransactionsLoading } = useTransactionsByStatus('Successful', {
    enabled: selectedStatus === 'Successful',
  }, selectedMonthYear);
  
  const { data: pendingTransactionsData = [], isLoading: isLoadingPending } = useTransactionsByStatus('Pending', {
    enabled: selectedStatus === 'Pending',
  }, selectedMonthYear);
  
  const { data: failedTransactionsData = [], isLoading: isLoadingFailed } = useTransactionsByStatus('Failed', {
    enabled: selectedStatus === 'Failed',
  }, selectedMonthYear);

  const transactionsToDisplay = 
    selectedStatus === 'Successful' ? successfulTransactionsData :
    selectedStatus === 'Pending' ? pendingTransactionsData :
    selectedStatus === 'Failed' ? failedTransactionsData :
    allTransactionsData;

  const transactionsLoading = 
    selectedStatus === 'Successful' ? successfulTransactionsLoading :
    selectedStatus === 'Pending' ? isLoadingPending :
    selectedStatus === 'Failed' ? isLoadingFailed :
    allTransactionsLoading;

  const lastTransactions = allTransactionsData.slice(0, 4).map(payment => ({
    id: payment.id,
    name: `${payment.uid || payment.reference} - ${payment.txn_id?.substring(0, 7) || 'xxxx'}`, 
    date: payment.created_at, 
    amount: payment.amount?.toString(), 
    paymentMethod: payment.channels?.name || 'N/A', 
    isPositive: payment.category === 'inbound', 
  }));

  const tableTransactions = transactionsToDisplay.map(convertToTableTransaction);

  // NEW: Function to handle navigation to the new transaction page
  const handleNewTransactionClick = () => {
    navigate('/pay-in'); // Navigate to the /payin route
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pass the new click handler to the Header */}
        <Header showNewTransaction onNewTransactionClick={handleNewTransactionClick} /> 
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {isLoadingStats ? (
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
                    icon={<DollarSign className="text-blue-600" size={18} />} 
                    textColor="text-gray-800"
                    onClick={() => setSelectedStatus('All')} 
                    isActive={selectedStatus === 'All'}
                  />
                  <StatsCard 
                    title="Successful Transactions" 
                    value={statsData?.successfulTransactions.toString() || '0'} 
                    trend={+15} 
                    icon={<CheckCircle className="text-green-600" size={18} />} 
                    trendColor="green"
                    onClick={() => setSelectedStatus('Successful')} 
                    isActive={selectedStatus === 'Successful'} 
                  />
                  <StatsCard 
                    title="Pending Transactions" 
                    value={statsData?.pendingTransactions.toString() || '0'} 
                    trend={-5} 
                    icon={<Clock className="text-yellow-600" size={18} />} 
                    trendColor="yellow"
                    onClick={() => setSelectedStatus('Pending')} 
                    isActive={selectedStatus === 'Pending'} 
                  />
                  <StatsCard 
                    title="Failed Transactions" 
                    value={statsData?.failedTransactions.toString() || '0'} 
                    trend={-10} 
                    icon={<XCircle className="text-red-600" size={18} />} 
                    trendColor="red"
                    onClick={() => setSelectedStatus('Failed')} 
                    isActive={selectedStatus === 'Failed'} 
                  />
                </>
              )}
            </div>
            
            {/* Last Transactions and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                <LastTransactions 
                  transactions={isLoadingStats ? [] : lastTransactions} 
                  isLoading={isLoadingStats}
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
              <div className="lg:col-span-2">
                <RevenueChart 
                  title="Monthly Revenue" 
                  data={monthlyRevenueData} 
                  isLoading={isLoadingRevenue}
                />
              </div>
            </div>
            
            {/* Transactions Table */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                  {selectedStatus === 'All' ? 'All Transactions' : `${selectedStatus} Transactions`}
                </h2>
                <div className="flex items-center space-x-2">
                  {selectedStatus !== 'All' && (
                    <button 
                      onClick={() => setSelectedStatus('All')} 
                      className="px-3 py-1 border rounded-md text-sm flex items-center text-blue-600 border-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Show All
                    </button>
                  )}
                  {/* Month Filter Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedMonthYear}
                      onChange={(e) => setSelectedMonthYear(e.target.value)}
                      className="appearance-none block w-full bg-white border border-gray-300 rounded-md py-1 px-3 text-sm leading-tight focus:outline-none focus:border-blue-500 pr-8"
                    >
                      {monthOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  <button className="px-3 py-1 border rounded-md text-sm flex items-center">
                    <SlidersHorizontal className="w-4 h-4 mr-1" />
                    More Filters
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-md overflow-hidden mb-4">
                <div className="flex border-b">
                  <button 
                    onClick={() => setSelectedStatus('All')} 
                    className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setSelectedStatus('Successful')} 
                    className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    Successful
                  </button>
                  <button 
                    onClick={() => setSelectedStatus('Pending')} 
                    className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => setSelectedStatus('Failed')} 
                    className={`px-4 py-3 text-sm font-medium ${selectedStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    Failed
                  </button>
                </div>
              </div>
              
              <TransactionsTable 
                transactions={tableTransactions} 
                isLoading={transactionsLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
