
export interface Transaction {
  id: string;
  amount: string | number;
  status: 'Successful' | 'Pending' | 'Failed';
  paymentMethod: 'M-PESA' | 'Card' | 'Bank Transfer' | 'Wallet';
  customer: string;
  date: string;
  createdAt?: string;
}

export interface Bill {
  id: string;
  billId: string;
  date: string;
  customerName: string;
  amount: string | number;
  paymentLink: string;
  status: 'Completed' | 'Pending' | 'Failed';
  createdAt?: string;
}

export interface Notification {
  id: string;
  status: 'New' | 'Read';
  title: string;
  message: string;
  date: string;
  createdAt?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'card' | 'wallet' | 'mpesa';
  details: any;
  isDefault?: boolean;
  createdAt?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  createdAt?: string;
}

export interface Stats {
  totalInflow: number;
  successfulTransactions: number;
  pendingTransactions: number;
  failedTransactions: number;
  paymentMethods: {
    name: string;
    value: number;
    color: string;
  }[];
}
