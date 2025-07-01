// src/pages/PayIn.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import PaymentSetupModal from '@/components/payment-setup-modal';
import { Send, FileText, Download, Copy } from 'lucide-react'; // Added Copy icon
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import TransactionsTable, { convertToTableTransaction } from '@/components/transactions-table';

// Updated Payment interface to include outbound specific fields
interface Payment {
  id: string;
  amount: number;
  category: string; // 'inbound' or 'outbound'
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  reference: string;
  uid: string; // This could be customerName for inbound, or recipientName for outbound
  txn_id: string;
  channel_id: string;
  channels: {
    name: string;
  } | null;
  phone?: string; // For inbound STK push
  paybill?: string; // For inbound STK push/payment link
  purpose?: string;
  // New fields for outbound payments
  recipient_phone?: string;
  recipient_name?: string;
  disbursement_link?: string; // To store the generated unique link
}



const PayIn = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('inbound-transactions');
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: 'summary' | 'success' | 'link' | 'failed';
  }>({
    open: false,
    type: 'summary',
  });

  const [formData, setFormData] = useState({
    customerName: '', // Used for inbound
    amount: '',
    purpose: '',
    phone: '', // Used for inbound STK
    paybill: '', // Default paybill for inbound
    paymentMethod: 'mpesa', // Default for inbound

    // New fields for outbound payments
    recipientName: '',
    recipientPhone: '',
    disbursementChannel: 'mpesa_b2c', // Default disbursement channel
  });

  const [isLoading, setIsLoading] = useState(false);

  const [transactions, setTransactions] = useState<Payment[]>([]); // This will hold currently displayed transactions
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  // Separate states for status filters for each tab
  const [selectedInboundStatus, setSelectedInboundStatus] = useState<'All' | 'Successful' | 'Failed'>('All');
  const [selectedOutboundStatus, setSelectedOutboundStatus] = useState<'All' | 'Successful' | 'Failed' | 'Pending'>('All');

  // State to hold the generated disbursement link
  const [generatedDisbursementLink, setGeneratedDisbursementLink] = useState<string>('');


  // --- Refactored Transaction fetching logic ---
  const fetchAndSetTransactions = useCallback(async (category: 'inbound' | 'outbound', statusFilter: 'All' | 'Successful' | 'Failed' | 'Pending') => {
    setLoadingTransactions(true);
    console.log(`Fetching ${category} transactions with status: ${statusFilter}`);
    try {
      if (!user) {
        console.warn('fetchAndSetTransactions: No user authenticated. Aborting transaction fetch.');
        setTransactions([]);
        setLoadingTransactions(false);
        return;
      }

      let query = supabase.from('payments').select(`
          *,
          channels ( name )
      `);

      query = query.eq('category', category);

      if (statusFilter !== 'All') {
          const dbStatus = statusFilter === 'Successful' ? 'completed' : statusFilter.toLowerCase();
          query = query.eq('status', dbStatus);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) {
        console.error('fetchAndSetTransactions: Supabase query error:', error.message);
        toast.error(`Failed to load transactions: ${error.message}`);
      } else {
        console.log(`fetchAndSetTransactions: Data received for ${category} (${statusFilter}):`, data?.length, 'transactions');
        const processedData = data?.map(item => ({
          ...item,
          payment_method: item.channels?.name || 'N/A'
        })) || [];
        setTransactions(processedData as Payment[]);
      }
    } catch (error) {
      console.error('fetchAndSetTransactions: Unexpected error:', error);
      toast.error('An unexpected error occurred while loading transactions.');
    } finally {
      setLoadingTransactions(false);
    }
  }, [user]);

  // Effect to trigger transaction fetch whenever active tab or status filters change
  useEffect(() => {
    if (activeTab === 'inbound-transactions') {
      fetchAndSetTransactions('inbound', selectedInboundStatus);
    } else if (activeTab === 'disbursing') {
      fetchAndSetTransactions('outbound', selectedOutboundStatus);
    } else {
      // For 'requesting' tab, clear transactions as it's a form view
      setTransactions([]);
      setLoadingTransactions(false);
    }
  }, [activeTab, selectedInboundStatus, selectedOutboundStatus, fetchAndSetTransactions]);

  // --- Form and Modal Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

// Solution 2: Modify your code to work with integer IDs
// Update your savePaymentToDatabase function:

const savePaymentToDatabase = async (
  paymentData: any, 
  status: 'pending' | 'completed' | 'failed', 
  category: 'inbound' | 'outbound', 
  paymentId?: number // Change to number instead of string
) => {
  if (!user) {
    toast.error('User not authenticated. Please log in.');
    throw new Error('User not authenticated.');
  }

  const currentDate = new Date().toISOString();

  try {
    if (paymentId) { 
      // Update existing payment
      const { error } = await supabase
        .from('payments')
        .update({
          status: status,
          metadata: paymentData,
          updated_at: currentDate,
        })
        .eq('id', paymentId);

      if (error) {
        console.error('Error updating payment in database:', error);
        throw error;
      }
      console.log('Payment updated in database successfully, ID:', paymentId);
      return paymentId;
    } else { 
      // Insert new payment - let database auto-generate integer ID
      let channelId = null;
      if (category === 'inbound') {
        switch (formData.paymentMethod) {
          case 'mpesa': channelId = 1; break;
          case 'card': channelId = 3; break;
          case 'bank': channelId = 2; break;
          case 'wallet': channelId = 1; break;
          default: channelId = 1;
        }
      } else {
        switch (formData.disbursementChannel) {
          case 'mpesa_b2c': channelId = 1; break;
          case 'bank_transfer': channelId = 2; break;
          default: channelId = 1;
        }
      }

      const { data, error } = await supabase
        .from('payments')
        .insert({
          // Don't specify id - let it auto-generate
          amount: parseFloat(formData.amount),
          status: status,
          category: category,
          created_at: currentDate,
          uid: category === 'inbound' ? formData.customerName : formData.recipientName,
          reference: category === 'inbound' 
            ? `PAY-${formData.customerName}-${Date.now()}` 
            : `PAY-${formData.recipientName}-${Date.now()}`,
          metadata: paymentData,
          channel_id: channelId,
          phone: category === 'inbound' ? formData.phone : null,
          paybill: category === 'inbound' ? formData.paybill : null,
          recipient_phone: category === 'outbound' ? formData.recipientPhone : null,
          recipient_name: category === 'outbound' ? formData.recipientName : null,
          purpose: formData.purpose || null,
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error saving new payment to database:', error);
        throw error;
      }

      console.log('New payment saved to database successfully, ID:', data.id);
      return data.id; // Return the auto-generated integer ID
    }
  } catch (error) {
    console.error('Failed to save/update payment:', error);
    throw error;
  }
};

// Update your interface to use number for id:
interface Payment {
  id: number; // Changed from string to number
  amount: number;
  category: string;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  reference: string;
  uid: string;
  txn_id: string;
  channel_id: string;
  channels: {
    name: string;
  } | null;
  phone?: string;
  paybill?: string;
  purpose?: string;
  recipient_phone?: string;
  recipient_name?: string;
  disbursement_link?: string;
}

// Updated M-Pesa charge handler to use the correct form field names
// In your handleTriggerMpesaCharge function
// Updated M-Pesa charge handler - replace your existing handleTriggerMpesaCharge function
// Enhanced handleTriggerMpesaCharge function with better error handling
const handleTriggerMpesaCharge = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate required fields
  if (!formData.customerName || !formData.amount || !formData.phone || !formData.paybill) {
    toast.error('Please fill in all required fields: Customer Name, Amount, Phone Number, and Paybill Number.');
    return;
  }

  const phoneRegex = /^254\d{9}$/;
  if (!phoneRegex.test(formData.phone)) {
    toast.error('Please enter a valid phone number (format: 254XXXXXXXXX, e.g., 254712345678).');
    return;
  }

  setIsLoading(true);

  try {
    // Generate reference if not provided
    const reference = `PAY-${formData.customerName}-${Date.now()}`;

    // Save initial pending payment
    const paymentId = await savePaymentToDatabase({
      type: 'MPESA_CHARGE',
      customer_no: formData.phone,
      amount: parseFloat(formData.amount),
      short_code: formData.paybill,
      reference: reference
    }, 'pending', 'inbound');

    console.log('About to invoke stkpush edge function with:', {
      amount: parseFloat(formData.amount),
      customer_no: formData.phone,
      short_code: formData.paybill,
      reference: reference
    });

    // Enhanced error handling for Supabase function invocation
    const { data, error } = await supabase.functions.invoke('stkpush', {
      body: {
        amount: parseFloat(formData.amount),
        customer_no: formData.phone,
        short_code: formData.paybill,
        reference: reference
      }
    });

    console.log('Edge function response:', { data, error });

    if (error) {
      console.error('STK Push Edge Function Error:', error);
      
      // Enhanced error logging
      console.error('Error details:', {
        message: error.message,
        context: error.context,
        details: error.details,
        hint: error.hint,
        code: error.code
      });

      if (paymentId) {
        await savePaymentToDatabase({
          type: 'MPESA_CHARGE',
          customer_no: formData.phone,
          amount: parseFloat(formData.amount),
          short_code: formData.paybill,
          reference: reference,
          edge_function_error: error.message,
          full_error: error
        }, 'failed', 'inbound', paymentId);
      }

      // Provide more specific error messages based on error type
      if (error.message.includes('Failed to send a request')) {
        throw new Error('Network error: Unable to reach the payment service. Please check your internet connection and try again.');
      } else if (error.message.includes('Function not found')) {
        throw new Error('Payment service configuration error. Please contact support.');
      } else {
        throw new Error(error.message || 'STK Push failed at Edge Function level.');
      }
    }

    console.log('Edge function returned data:', data);

    if (data?.success !== false && data?.data?.id) {
      // Update payment with Quikk charge ID
      if (paymentId) {
        await savePaymentToDatabase({
          type: 'MPESA_CHARGE',
          quikk_charge_id: data.data.id,
          customer_no: formData.phone,
          amount: parseFloat(formData.amount),
          short_code: formData.paybill,
          reference: reference,
          quikk_response: data
        }, 'pending', 'inbound', paymentId);
      }

      setTimeout(() => {
        setModalState({ open: true, type: 'success' });
        toast.success('M-Pesa charge initiated successfully! Payment is being processed.');
      }, 2000);
    } else {
      if (paymentId) {
        await savePaymentToDatabase({
          type: 'MPESA_CHARGE',
          customer_no: formData.phone,
          amount: parseFloat(formData.amount),
          short_code: formData.paybill,
          reference: reference,
          edge_function_response: data
        }, 'failed', 'inbound', paymentId);
      }
      
      // Check if there's an error message in the response
      const errorMessage = data?.error || 'M-Pesa charge failed: Invalid response from Edge Function.';
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Error triggering M-Pesa charge:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    toast.error(`Failed to process payment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    setModalState({ open: true, type: 'failed' });
  } finally {
    setIsLoading(false);
    if (activeTab === 'inbound-transactions') {
      fetchAndSetTransactions('inbound', selectedInboundStatus);
    }
  }
};

  const handleGeneratePaymentLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.amount) {
      toast.error('Please fill in customer name and amount.');
      return;
    }

    setIsLoading(true);

    let paymentId: string | undefined;
    try {
      // Save initial pending payment for payment link
      paymentId = await savePaymentToDatabase({
        type: 'PAYMENT_LINK',
        customerName: formData.customerName,
        amount: parseFloat(formData.amount),
        purpose: formData.purpose || 'Payment',
        paymentMethod: formData.paymentMethod,
        paybill: formData.paybill
      }, 'pending', 'inbound');

      const { data, error } = await supabase.functions.invoke('generate-payment-link', {
        body: {
          customerName: formData.customerName,
          amount: parseFloat(formData.amount),
          purpose: formData.purpose || 'Payment',
          paymentMethod: formData.paymentMethod,
          paybill: formData.paybill,
          paymentId: paymentId
        }
      });

      if (error) {
        console.error('Payment link generation Edge Function error:', error);
        if (paymentId) {
          await savePaymentToDatabase({}, 'failed', 'inbound', paymentId);
        }
        throw new Error(error.message || 'Payment link generation failed at Edge Function level.');
      }

      if (data?.success) {
        setModalState({ open: true, type: 'link' });
        toast.success('Payment link created successfully!');
      } else {
        if (paymentId) {
          await savePaymentToDatabase({}, 'failed', 'inbound', paymentId);
        }
        throw new Error('Payment link generation failed: ' + (data?.message || 'Unknown reason from Edge Function.'));
      }
    } catch (error) {
      console.error('Error generating payment link:', error);
      toast.error(`Failed to generate payment link: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      if (activeTab === 'inbound-transactions') {
        fetchAndSetTransactions('inbound', selectedInboundStatus);
      }
    }
  };

  // --- New Outbound Payment Handler ---
  const handleCreateDisbursement = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.recipientName || !formData.amount || !formData.recipientPhone) {
      toast.error('Please fill in all required fields: Recipient Name, Amount, and Recipient Phone Number.');
      return;
    }

    const phoneRegex = /^254\d{9}$/;
    if (!phoneRegex.test(formData.recipientPhone)) {
      toast.error('Please enter a valid recipient phone number (format: 254XXXXXXXXX, e.g., 254712345678).');
      return;
    }

    setIsLoading(true);
    setGeneratedDisbursementLink(''); // Clear previous link

    let paymentId: string | undefined;
    try {
      // Save initial pending outbound payment
      paymentId = await savePaymentToDatabase({
        type: 'DISBURSEMENT',
        recipientName: formData.recipientName,
        recipientPhone: formData.recipientPhone,
        amount: parseFloat(formData.amount),
        purpose: formData.purpose,
        channel: formData.disbursementChannel,
      }, 'pending', 'outbound');

      // Invoke Edge Function to generate a unique link for disbursement confirmation
      const { data, error } = await supabase.functions.invoke('generate-disbursement-link', {
        body: {
          paymentId: paymentId,
          recipientName: formData.recipientName,
          amount: parseFloat(formData.amount),
          purpose: formData.purpose || 'Disbursement',
          recipientPhone: formData.recipientPhone,
          channel: formData.disbursementChannel,
        }
      });

      if (error) {
        console.error('Disbursement link generation Edge Function error:', error);
        if (paymentId) {
          // It's better to fetch current metadata to avoid overwriting other fields if they exist
          const { data: existingPaymentData } = await supabase.from('payments').select('metadata').eq('id', paymentId).single();
          await savePaymentToDatabase({
            ...existingPaymentData?.metadata,
            edge_function_error: error.message
          }, 'failed', 'outbound', paymentId);
        }
        throw new Error(error.message || 'Disbursement link generation failed at Edge Function level.');
      }

      if (data?.success && data?.link) {
        setGeneratedDisbursementLink(data.link);
        // Update the payment record with the generated link
        if (paymentId) {
          await supabase.from('payments').update({ disbursement_link: data.link }).eq('id', paymentId);
        }
        toast.success('Disbursement link generated successfully!');
      } else {
        if (paymentId) {
           const { data: existingPaymentData } = await supabase.from('payments').select('metadata').eq('id', paymentId).single();
          await savePaymentToDatabase({
            ...existingPaymentData?.metadata,
            edge_function_response: data?.message
          }, 'failed', 'outbound', paymentId);
        }
        throw new Error('Disbursement link generation failed: ' + (data?.message || 'Unknown reason from Edge Function.'));
      }
    } catch (error) {
      console.error('Error creating disbursement:', error);
      toast.error(`Failed to create disbursement: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      fetchAndSetTransactions('outbound', selectedOutboundStatus); // Refresh outbound transactions
    }
  };


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'requesting') {
      if (formData.paymentMethod === 'mpesa') {
        handleTriggerMpesaCharge(e);
      } else {
        handleGeneratePaymentLink(e);
      }
    } else if (activeTab === 'disbursing') {
      handleCreateDisbursement(e); // Call the new disbursement handler
    }
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, open: false }));

    if (modalState.type === 'success') {
      // Clear inbound form data after successful inbound transaction
      setFormData(prev => ({
        ...prev,
        customerName: '',
        amount: '',
        purpose: '',
        phone: '',
        paybill: '',
        paymentMethod: 'mpesa'
      }));
      toast.success('Transaction process completed.');
      // Re-fetch transactions for the current tab to reflect the new state
      if (activeTab === 'inbound-transactions') {
        fetchAndSetTransactions('inbound', selectedInboundStatus);
      } else if (activeTab === 'disbursing') {
        fetchAndSetTransactions('outbound', selectedOutboundStatus);
      }
    }
    // No specific form reset for 'link' or 'failed' type modals, as the user might want to retry
  };

  const handleExportCsv = () => {
    if (transactions.length === 0) {
      toast.info('No transactions to export.');
      return;
    }

    const headers = [
      "ID", "Customer/Recipient", "Amount", "Status", "Date", "Payment Method/Channel", "Description/Purpose", "Phone/Recipient Phone", "Paybill/Disbursement Link", "Reference"
    ];

    const csvContent = [
      headers.join(','),
      ...transactions.map(t =>
        [
          t.id,
          `"${t.uid || t.reference || ''}"`,
          t.amount,
          t.status === 'completed' ? 'Successful' : (t.status.charAt(0).toUpperCase() + t.status.slice(1)),
          t.created_at ? new Date(t.created_at).toLocaleDateString() : '',
          `"${t.channels?.name || 'N/A'}"`,
          `"${t.category || t.purpose || ''}"`,
          `"${t.phone || t.recipient_phone || ''}"`, // Dynamic phone/recipient phone
          `"${t.paybill || t.disbursement_link || ''}"`, // Dynamic paybill/disbursement link
          `"${t.reference || ''}"`
        ].map(field => {
            return typeof field === 'string' ? `"${field.replace(/"/g, '""')}"` : field;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${activeTab.replace('-', '_')}_transactions.csv`); // Dynamic filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast.success('Transactions exported to CSV!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy link.');
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Pay In</h1> {/* Updated title */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  onClick={handleExportCsv}
                >
                  <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
                <Button
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => setActiveTab('requesting')}
                >
                  <Send className="mr-2 h-4 w-4" /> Create Inbound Transaction
                </Button>
                 <Button
                  className="bg-green-700 hover:bg-green-800 text-white" // New button for outbound
                  onClick={() => setActiveTab('disbursing')}
                >
                  <Send className="mr-2 h-4 w-4" /> Create Outbound Transaction
                </Button>
              </div>
            </div>

            <Tabs defaultValue="inbound-transactions" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="inbound-transactions">Inbound Transactions</TabsTrigger>
                <TabsTrigger value="requesting">Requesting Payment</TabsTrigger>
                <TabsTrigger value="disbursing">Disbursing Payments</TabsTrigger>
              </TabsList>

              {/* Inbound Transactions Tab Content */}
              <TabsContent value="inbound-transactions" className="space-y-6">
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">
                      {selectedInboundStatus === 'All' ? 'All Inbound Transactions' : `${selectedInboundStatus} Inbound Transactions`}
                    </h2>
                    <div className="flex border-b">
                      <button
                        onClick={() => setSelectedInboundStatus('All')}
                        className={`px-4 py-3 text-sm font-medium ${selectedInboundStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedInboundStatus('Successful')}
                        className={`px-4 py-3 text-sm font-medium ${selectedInboundStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        Successful
                      </button>
                      <button
                        onClick={() => setSelectedInboundStatus('Failed')}
                        className={`px-4 py-3 text-sm font-medium ${selectedInboundStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        Failed
                      </button>
                    </div>
                  </div>

                  {loadingTransactions ? (
                    <div className="text-center py-8 text-gray-600">
                      <p>Loading transactions...</p>
                    </div>
                  ) : transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No inbound transactions found for the selected status.</p>
                    </div>
                  ) : (
                    <TransactionsTable
                      transactions={transactions.map(convertToTableTransaction)}
                      isLoading={loadingTransactions}
                    />
                  )}
                </div>
              </TabsContent>

              {/* Requesting Payment Tab Content - Input fields updated for width/height */}
              <TabsContent value="requesting" className="space-y-6">
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Requesting Payment (Inbound)</h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="w-96 mx-auto space-y-6">
                      <div>
                        <Label htmlFor="customerName">Customer Name *</Label>
                        <Input
                          id="customerName"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          placeholder="Enter customer name"
                          className="mt-1 w-96 h-10"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="amount">Amount (KES) *</Label>
                        <Input
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder="Enter amount"
                          className="mt-1 w-96 h-10"
                          required
                          type="number"
                          min="1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="paybill">Paybill Number *</Label>
                        <Input
                          id="paybill"
                          name="paybill"
                          value={formData.paybill}
                          onChange={handleInputChange}
                          placeholder="Enter paybill number"
                          className="mt-1 w-96 h-10"
                          required
                        />
                      </div>

                      {formData.paymentMethod === 'mpesa' && (
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="254712345678"
                            className="mt-1 w-96 h-10"
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">Format: 254XXXXXXXXX</p>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="purpose">Purpose (Optional)</Label>
                        <Input
                          id="purpose"
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          placeholder="Payment purpose"
                          className="mt-1 w-96 h-10"
                        />
                      </div>

                      <div>
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Select
                          value={formData.paymentMethod}
                          onValueChange={handleSelectChange('paymentMethod')}
                        >
                          <SelectTrigger id="paymentMethod" className="mt-1 w-96 h-10">
                            <SelectValue placeholder="M-pesa" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mpesa">M-pesa</SelectItem>
                            <SelectItem value="card">Card</SelectItem>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="wallet">Digital Wallet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.paymentMethod === 'mpesa' && (
                        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                          <p>To trigger STK Push, customer needs to be online with their phone.</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center space-x-4 pt-4">
                      {formData.paymentMethod === 'mpesa' ? (
                        <Button
                          type="submit"
                          className="bg-blue-700 hover:bg-blue-800 text-white"
                          disabled={isLoading}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {isLoading ? 'Processing...' : 'Trigger STK Push'}
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-blue-700 hover:bg-blue-800 text-white"
                          disabled={isLoading}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {isLoading ? 'Processing...' : 'Generate Payment Link'}
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </TabsContent>

              {/* Disbursing Payments Tab Content - Now displays outbound transactions */}
              <TabsContent value="disbursing" className="space-y-6">
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">
                      {selectedOutboundStatus === 'All' ? 'All Outbound Transactions' : `${selectedOutboundStatus} Outbound Transactions`}
                    </h2>
                    {/* Status filter buttons for Disbursing Payments */}
                    <div className="flex border-b">
                      <button
                        onClick={() => setSelectedOutboundStatus('All')}
                        className={`px-4 py-3 text-sm font-medium ${selectedOutboundStatus === 'All' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedOutboundStatus('Successful')}
                        className={`px-4 py-3 text-sm font-medium ${selectedOutboundStatus === 'Successful' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        Successful
                      </button>
                      <button
                        onClick={() => setSelectedOutboundStatus('Failed')}
                        className={`px-4 py-3 text-sm font-medium ${selectedOutboundStatus === 'Failed' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        Failed
                      </button>
                      <button
                        onClick={() => setSelectedOutboundStatus('Pending')}
                        className={`px-4 py-3 text-sm font-medium ${selectedOutboundStatus === 'Pending' ? 'text-blue-700 border-b-2 border-blue-700' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        Pending
                      </button>
                    </div>
                  </div>

                  {/* Outbound Transaction Form */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Create New Disbursement</h3>
                    <form onSubmit={handleCreateDisbursement} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="recipientName">Recipient Name *</Label>
                          <Input
                            id="recipientName"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleInputChange}
                            className="mt-1 w-full h-10" // Placeholder removed
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="recipientPhone">Recipient Phone Number *</Label>
                          <Input
                            id="recipientPhone"
                            name="recipientPhone"
                            value={formData.recipientPhone}
                            onChange={handleInputChange}
                            className="mt-1 w-full h-10" // Placeholder removed
                            required
                          />
                          <p className="text-sm text-gray-500 mt-1">Format: 254XXXXXXXXX</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="amount">Amount (KES) *</Label>
                          <Input
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="mt-1 w-full h-10" // Placeholder removed
                            required
                            type="number"
                            min="1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="disbursementChannel">Disbursement Channel</Label>
                          <Select
                            value={formData.disbursementChannel}
                            onValueChange={handleSelectChange('disbursementChannel')}
                          >
                            <SelectTrigger id="disbursementChannel" className="mt-1 w-full h-10">
                              <SelectValue placeholder="M-pesa B2C" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mpesa_b2c">M-pesa B2C</SelectItem>
                              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                              {/* Add other channels as needed */}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="purpose">Purpose (Optional)</Label>
                        <Input
                          id="purpose"
                          name="purpose"
                          value={formData.purpose}
                          onChange={handleInputChange}
                          className="mt-1 w-full h-10" // Placeholder removed
                        />
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button
                          type="submit"
                          className="bg-green-700 hover:bg-green-800 text-white"
                          disabled={isLoading}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          {isLoading ? 'Saving...' : 'Save'} {/* Changed button text to "Save" */}
                        </Button>
                      </div>
                    </form>

                    {generatedDisbursementLink && (
                      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800 flex items-center justify-between">
                        <div>
                          <p className="font-semibold mb-1">Disbursement Link Generated:</p>
                          <a href={generatedDisbursementLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                            {generatedDisbursementLink}
                          </a>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedDisbursementLink)}
                          className="ml-4"
                        >
                          <Copy className="h-4 w-4 mr-2" /> Copy
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Outbound Transactions Table */}
                  {loadingTransactions ? (
                    <div className="text-center py-8 text-gray-600">
                      <p>Loading transactions...</p>
                    </div>
                  ) : transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No outbound transactions found for the selected status.</p>
                      <p>Create a new disbursement above to see it here.</p>
                    </div>
                  ) : (
                    <TransactionsTable
                      transactions={transactions.map(convertToTableTransaction)}
                      isLoading={loadingTransactions}
                    />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <PaymentSetupModal
        open={modalState.open}
        onClose={handleCloseModal}
        type={modalState.type === 'failed' ? 'summary' : modalState.type}
        data={{
          customerName: formData.customerName, // For inbound
          amount: formData.amount ? `Ksh ${parseInt(formData.amount).toLocaleString()}` : 'Ksh 0',
          purpose: formData.purpose || 'Payment',
          // mpesaTill: formData.paybill, // This is for inbound, not relevant for disbursement modal data, thus commented out
          billId: `BL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          failed: modalState.type === 'failed'
        }}
      />
    </div>
  );




};

export default PayIn;