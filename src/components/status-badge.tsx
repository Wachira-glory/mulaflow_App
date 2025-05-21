
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'Successful' | 'Pending' | 'Failed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Successful':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={cn(
      'px-3 py-1 text-xs font-medium rounded-full',
      getStatusStyles(),
      className
    )}>
      {status}
    </span>
  );
};

export default StatusBadge;
