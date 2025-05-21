
import React from 'react';
import { cn } from '@/lib/utils';
import { Bank, CreditCard, Wallet } from 'lucide-react';

interface PaymentMethodOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PaymentMethodsSelectorProps {
  methods: PaymentMethodOption[];
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
}

const PaymentMethodsSelector: React.FC<PaymentMethodsSelectorProps> = ({
  methods,
  selectedMethod,
  onMethodSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {methods.map((method) => (
        <div
          key={method.id}
          className={cn(
            "border rounded-lg p-6 flex flex-col items-center text-center cursor-pointer transition-all",
            method.id === selectedMethod
              ? "border-blue-500 ring-2 ring-blue-100"
              : "border-gray-200 hover:border-blue-300"
          )}
          onClick={() => onMethodSelect(method.id)}
        >
          <div className="mb-4">
            {method.icon}
          </div>
          <h3 className="font-semibold mb-2">{method.title}</h3>
          <p className="text-sm text-gray-500">{method.description}</p>
        </div>
      ))}
    </div>
  );
};

export const defaultPaymentMethods: PaymentMethodOption[] = [
  {
    id: 'bank',
    icon: <Bank size={36} />,
    title: 'Bank Accounts',
    description: 'Connect your bank account for direct transfers'
  },
  {
    id: 'card',
    icon: <CreditCard size={36} />,
    title: 'Credit Cards',
    description: 'Accept credit and debit card payments'
  },
  {
    id: 'wallet',
    icon: <Wallet size={36} />,
    title: 'Digital Wallet',
    description: 'Use digital wallets like PayPal or Stripe'
  }
];

export default PaymentMethodsSelector;
