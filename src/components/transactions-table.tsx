
// import React from 'react';
// import { Link } from 'react-router-dom';
// import StatusBadge from './status-badge';
// import PaymentMethodIcon from './payment-method-icon';
// import { Transaction as GlobalTransaction } from '@/types';

// export interface Transaction {
//   id: string;
//   amount: string;
//   status: 'Successful' | 'Pending' | 'Failed';
//   paymentMethod: 'M-PESA' | 'Card' | 'Bank Transfer' | 'Wallet';
//   customer: string;
//   date: string;
// }

// interface TransactionsTableProps {
//   transactions: Transaction[];
//   showPagination?: boolean;
//   isLoading?: boolean;
// }

// const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
//   transactions, 
//   showPagination = true,
//   isLoading = false
// }) => {
//   return (
//     <div className="bg-white rounded-lg border">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Transaction ID
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Amount
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Payment Method
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Customer
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th scope="col" className="relative px-6 py-3">
//                 <span className="sr-only">Actions</span>
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {isLoading ? (
//               // Loading skeleton
//               Array(5).fill(null).map((_, i) => (
//                 <tr key={i} className="animate-pulse">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="h-4 bg-gray-200 rounded w-24"></div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="h-4 bg-gray-200 rounded w-20"></div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="h-4 bg-gray-200 rounded w-24"></div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="h-4 bg-gray-200 rounded w-28"></div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="h-4 bg-gray-200 rounded w-24"></div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="h-4 bg-gray-200 rounded w-20"></div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right">
//                     <div className="h-4 bg-gray-200 rounded w-4 ml-auto"></div>
//                   </td>
//                 </tr>
//               ))
//             ) : transactions.length > 0 ? (
//               transactions.map((transaction) => (
//                 <tr key={transaction.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {transaction.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {transaction.amount}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <StatusBadge status={transaction.status} />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <PaymentMethodIcon method={transaction.paymentMethod} size="sm" />
//                       <span className="text-sm text-gray-900">{transaction.paymentMethod}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {transaction.customer}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {transaction.date}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button className="text-gray-500">
//                       •••
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="px-6 py-12 text-center">
//                   <p className="text-gray-500 mb-2">No transactions found</p>
//                   <Link to="/pay-in" className="text-sm text-blue-600 hover:underline">
//                     Create your first transaction
//                   </Link>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
      
//       {showPagination && transactions.length > 0 && (
//         <div className="border-t border-gray-200 px-4 py-3 sm:px-6 flex items-center justify-between">
//           <div className="flex-1 flex justify-between sm:hidden">
//             <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Previous
//             </button>
//             <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//               Next
//             </button>
//           </div>
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Page <span className="font-medium">1</span> of <span className="font-medium">1</span>
//               </p>
//             </div>
//             <div>
//               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                 <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                   Previous
//                 </button>
//                 <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                   Next
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Convert global Transaction type to the local Transaction type for the table
// export const convertToTableTransaction = (transaction: GlobalTransaction): Transaction => {
//   return {
//     ...transaction,
//     amount: transaction.amount.toString()
//   };
// };

// export default TransactionsTable;


import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './status-badge';
import PaymentMethodIcon from './payment-method-icon';

// Define the expected structure of a single transaction object
// after it has been processed by the hooks (e.g., useRecentTransactions)
// and potentially joined with channels.
export interface TableTransaction {
  id: string;
  amount: string; // Display as string
  status: 'Successful' | 'Pending' | 'Failed'; // UI-friendly status
  paymentMethod: 'M-PESA' | 'Card' | 'Bank Transfer' | 'Wallet' | 'N/A'; // UI-friendly payment method
  customer: string; // This will be derived from uid or reference
  date: string; // Formatted date string
}

// Interface for the props of the TransactionsTable component
interface TransactionsTableProps {
  transactions: TableTransaction[]; // Now expects TableTransaction[]
  showPagination?: boolean;
  isLoading?: boolean;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  transactions, 
  showPagination = true,
  isLoading = false
}) => {
  return (
    <div className="bg-white rounded-lg border">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {/* Corrected: Added missing <th> tag and attributes */}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              // Loading skeleton
              Array(5).fill(null).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="h-4 bg-gray-200 rounded w-4 ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <PaymentMethodIcon method={transaction.paymentMethod} size="sm" />
                      <span className="text-sm text-gray-900">{transaction.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500">
                      •••
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <p className="text-gray-500 mb-2">No transactions found</p>
                  <Link to="/pay-in" className="text-sm text-blue-600 hover:underline">
                    Create your first transaction
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {showPagination && transactions.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">1</span> of <span className="font-medium">1</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// This function converts the raw data fetched from Supabase (PaymentData from useTransactions.tsx)
// into the format expected by the TransactionsTable component (TableTransaction).
export const convertToTableTransaction = (payment: any): TableTransaction => {
  // Map Supabase 'status' to UI 'status'
  let uiStatus: 'Successful' | 'Pending' | 'Failed';
  switch (payment.status) {
    case 'completed':
      uiStatus = 'Successful';
      break;
    case 'pending':
      uiStatus = 'Pending';
      break;
    case 'failed':
      uiStatus = 'Failed';
      break;
    default:
      uiStatus = 'Pending'; // Default or handle unknown status
  }

  // Map Supabase 'channels.name' to UI 'paymentMethod'
  // Note: 'Wallet' is included in your original `PaymentMethod` type,
  // but it's not mapped from `channels.name`. You might need to adjust
  // your channels data or logic if 'Wallet' is a distinct payment method.
  const uiPaymentMethod: 'M-PESA' | 'Card' | 'Bank Transfer' | 'Wallet' | 'N/A' = 
    payment.channels?.name === 'M-PESA' ? 'M-PESA' :
    payment.channels?.name === 'Card' ? 'Card' :
    payment.channels?.name === 'Bank Transfer' ? 'Bank Transfer' :
    'N/A'; // Default or add more mappings if you have other channel names

  return {
    id: payment.id?.toString() || 'N/A', // Ensure ID is a string
    amount: payment.amount?.toLocaleString() || '0.00', // Format amount for display (e.g., 1500.75 -> "1,500.75")
    status: uiStatus,
    paymentMethod: uiPaymentMethod,
    customer: payment.uid || payment.reference || 'N/A', // Use uid or reference for customer, fallback to N/A
    date: payment.created_at ? new Date(payment.created_at).toLocaleDateString() : 'N/A', // Format date to local string
  };
};

export default TransactionsTable;
