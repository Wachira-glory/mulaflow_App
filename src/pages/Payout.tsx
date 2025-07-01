
// import React, { useState } from 'react';
// import { toast } from 'sonner';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Download, Filter, Plus } from 'lucide-react';
// import { useTransactions } from '@/hooks/useTransactions';
// import PaymentMethodIcon from '@/components/payment-method-icon';
// import StatusBadge from '@/components/status-badge';

// const Payout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeTab, setActiveTab] = useState('all');
//   const { data: transactions = [], isLoading } = useTransactions();
  
//   // Filter outbound transactions (payouts)
//   const outboundTransactions = transactions.filter(transaction => 
//     transaction.id.includes('TR-') // Assuming payout transactions have TR- prefix
//   );

//   const filteredTransactions = outboundTransactions.filter(transaction => {
//     const matchesSearch = transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          transaction.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
//     if (activeTab === 'all') return matchesSearch;
//     if (activeTab === 'successful') return matchesSearch && transaction.status === 'Successful';
//     if (activeTab === 'pending') return matchesSearch && transaction.status === 'Pending';
//     if (activeTab === 'failed') return matchesSearch && transaction.status === 'Failed';
    
//     return matchesSearch;
//   });

//   const handleCreateTransaction = () => {
//     toast.info('Create transaction feature coming soon!');
//   };

//   const handleExportCSV = () => {
//     toast.info('Export CSV feature coming soon!');
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header showNewTransaction={false} showPaymentAction={false} />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-2xl font-semibold">Pay Out</h1>
//               <div className="flex gap-3">
//                 <Button variant="outline" onClick={handleExportCSV}>
//                   <Download className="mr-2 h-4 w-4" />
//                   Export CSV
//                 </Button>
//                 <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleCreateTransaction}>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Create Transaction
//                 </Button>
//               </div>
//             </div>
            
//             <Card>
//               <CardHeader>
//                 <CardTitle>Outbound Transactions</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex justify-between items-center mb-6">
//                   <div className="relative">
//                     <Input
//                       placeholder="Search transactions..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="pl-4 pr-10 w-80"
//                     />
//                   </div>
//                   <Button variant="outline">
//                     <Filter className="mr-2 h-4 w-4" />
//                     Filters
//                   </Button>
//                 </div>

//                 <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
//                   <TabsList>
//                     <TabsTrigger value="all">All</TabsTrigger>
//                     <TabsTrigger value="successful">Successful</TabsTrigger>
//                     <TabsTrigger value="pending">Pending</TabsTrigger>
//                     <TabsTrigger value="failed">Failed</TabsTrigger>
//                   </TabsList>

//                   <TabsContent value={activeTab} className="mt-6">
//                     <div className="bg-white rounded-lg border">
//                       <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                           <thead className="bg-gray-50">
//                             <tr>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Payment Method
//                               </th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Trans ID
//                               </th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Customer Name
//                               </th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Date
//                               </th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Amount
//                               </th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Ref ID
//                               </th>
//                               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Status
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody className="bg-white divide-y divide-gray-200">
//                             {isLoading ? (
//                               Array(5).fill(null).map((_, i) => (
//                                 <tr key={i} className="animate-pulse">
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="h-4 bg-gray-200 rounded w-20"></div>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="h-4 bg-gray-200 rounded w-24"></div>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="h-4 bg-gray-200 rounded w-24"></div>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="h-4 bg-gray-200 rounded w-20"></div>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="h-4 bg-gray-200 rounded w-20"></div>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="h-4 bg-gray-200 rounded w-16"></div>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="h-4 bg-gray-200 rounded w-20"></div>
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : filteredTransactions.length > 0 ? (
//                               filteredTransactions.map((transaction) => (
//                                 <tr key={transaction.id} className="hover:bg-gray-50">
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <div className="flex items-center space-x-2">
//                                       <PaymentMethodIcon method={transaction.paymentMethod} size="sm" />
//                                       <span className="text-sm text-gray-900">{transaction.paymentMethod}</span>
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                     {transaction.id}
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     {transaction.customer}
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {transaction.date}
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                     Ksh{transaction.amount.toLocaleString()}
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                     {Math.floor(Math.random() * 900000) + 100000}
//                                   </td>
//                                   <td className="px-6 py-4 whitespace-nowrap">
//                                     <StatusBadge status={transaction.status} />
//                                   </td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <tr>
//                                 <td colSpan={7} className="px-6 py-12 text-center">
//                                   <p className="text-gray-500 mb-2">No transactions found</p>
//                                   <Button variant="outline" onClick={handleCreateTransaction}>
//                                     Create your first transaction
//                                   </Button>
//                                 </td>
//                               </tr>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Payout;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAllPayments } from '@/hooks/usePayments';
import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';

const Payout = () => {
  const navigate = useNavigate();
  const { data: payments = [], isLoading } = useAllPayments();

  const handleCreateTransaction = () => {
    navigate('/payin');
  };

  // Convert payments for table display
  const tableTransactions = payments.map(payment => convertToTableTransaction({
    id: payment.id,
    amount: payment.amount,
    status: payment.status,
    paymentMethod: payment.paymentMethod,
    customer: payment.customer,
    date: payment.date,
    createdAt: payment.createdAt,
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header showNewTransaction={false} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Payout</h1>
              <Button 
                onClick={handleCreateTransaction}
                className="bg-blue-700 hover:bg-blue-800"
              >
                <Plus size={18} className="mr-2" />
                Create Transaction
              </Button>
            </div>
            
            {payments.length > 0 ? (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">All Payments</h2>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                      </svg>
                      Filters
                    </button>
                  </div>
                </div>
                
                <TransactionsTable 
                  transactions={tableTransactions} 
                  isLoading={isLoading}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <h2 className="text-xl font-medium mb-4">No Payments Found</h2>
                <p className="text-gray-600 mb-6">
                  Create your first payment transaction to see it here
                </p>
                <Button 
                  onClick={handleCreateTransaction}
                  className="bg-blue-700 hover:bg-blue-800"
                >
                  <Plus size={18} className="mr-2" />
                  Create Transaction
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payout;
