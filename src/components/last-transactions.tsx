
import React from 'react';
import { Link } from 'react-router-dom';
import PaymentMethodIcon from './payment-method-icon';

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: string;
  paymentMethod: 'M-PESA' | 'Card' | 'Bank Transfer' | 'Wallet';
  isPositive?: boolean;
}

interface LastTransactionsProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

const LastTransactions: React.FC<LastTransactionsProps> = ({ transactions, isLoading = false }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Last Transactions</h3>
        <Link to="/transactions" className="text-sm text-gray-500 hover:text-blue-600">View all</Link>
      </div>
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          // Show loading skeleton
          Array(4).fill(null).map((_, i) => (
            <div key={i} className="p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))
        ) : transactions.length > 0 ? (
          // Show transactions
          transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <PaymentMethodIcon method={transaction.paymentMethod} />
                <div className="ml-3">
                  <div className="font-medium">{transaction.name}</div>
                  <div className="text-xs text-gray-500">{transaction.date}</div>
                </div>
              </div>
              <div className={transaction.isPositive ? "text-green-600" : "text-orange-500"}>
                {transaction.isPositive ? '+' : ''}{transaction.amount}
              </div>
            </div>
          ))
        ) : (
          // Show empty state
          <div className="p-8 text-center">
            <p className="text-gray-500">No transactions yet</p>
            <Link to="/pay-in" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              Create your first transaction
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LastTransactions;
