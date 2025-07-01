
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


export type Profile = {
  id: string
  user_id: string
  name: string
  email: string
  phone_number?: string
  profile_picture_url?: string
  use_case?: string
  role: "business_owner" | "member" | "admin"
  onboarding_completed: boolean
  current_onboarding_step: number
  created_at: string
  updated_at: string
}

export type Team = {
  id: string
  profile_id: string
  team_name: string
  industry?: string
  domain?: string
  billing_plan?: string
  created_at: string
  updated_at: string
}

export type PaymentChannel = {
  id: string
  team_id: string
  channel_type: "inbound" | "outbound"
  payment_method: "bank" | "mpesa"
  bank_name?: string
  account_name?: string
  account_number?: string
  branch_code?: string
  mpesa_number?: string
  mpesa_name?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Invitation = {
  id: string
  team_id: string
  email: string
  invited_by: string
  status: "pending" | "accepted" | "declined"
  created_at: string
  updated_at: string
}

