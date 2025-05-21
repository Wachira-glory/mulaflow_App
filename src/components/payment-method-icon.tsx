
import React from 'react';

type PaymentMethodType = 'M-PESA' | 'Card' | 'Bank Transfer' | 'Wallet';

interface PaymentMethodIconProps {
  method: PaymentMethodType;
  size?: 'sm' | 'md' | 'lg';
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ method, size = 'md' }) => {
  const sizeClass = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const getIcon = () => {
    switch (method) {
      case 'M-PESA':
        return (
          <div className={`${sizeClass[size]} rounded-full bg-green-500 flex items-center justify-center text-white`}>
            <span className="text-xs font-bold">M</span>
          </div>
        );
      case 'Card':
        return (
          <div className={`${sizeClass[size]} rounded flex items-center justify-center overflow-hidden`}>
            <div className="bg-red-500 w-full h-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">VISA</span>
            </div>
          </div>
        );
      case 'Bank Transfer':
        return (
          <div className={`${sizeClass[size]} rounded flex items-center justify-center bg-violet-600 text-white`}>
            <span className="text-xs font-bold">BT</span>
          </div>
        );
      case 'Wallet':
        return (
          <div className={`${sizeClass[size]} rounded-full bg-green-500 flex items-center justify-center text-white`}>
            <span className="text-xs font-bold">W</span>
          </div>
        );
      default:
        return (
          <div className={`${sizeClass[size]} rounded-full bg-gray-500 flex items-center justify-center text-white`}>
            <span className="text-xs">?</span>
          </div>
        );
    }
  };

  return getIcon();
};

export default PaymentMethodIcon;
