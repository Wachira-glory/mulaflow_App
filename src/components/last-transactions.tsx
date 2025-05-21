
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
}

const LastTransactions: React.FC<LastTransactionsProps> = ({ transactions }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Last Transactions</h3>
        <Link to="/transactions" className="text-sm text-gray-500 hover:text-blue-600">View all</Link>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
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
        ))}
      </div>
    </div>
  );
};

export default LastTransactions;
