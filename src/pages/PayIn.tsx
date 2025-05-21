
import React, { useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import PaymentSetupModal from '@/components/payment-setup-modal';
import { Send, FileText } from 'lucide-react';

const PayIn = () => {
  const [activeTab, setActiveTab] = useState<string>('requesting');
  const [modalState, setModalState] = useState<{
    open: boolean;
    type: 'summary' | 'success' | 'link';
  }>({
    open: false,
    type: 'summary',
  });
  
  const [formData, setFormData] = useState({
    customerName: 'John Doe',
    amount: '',
    purpose: '',
    paymentMethod: 'mpesa'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGeneratePaymentLink = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement payment link generation
    setModalState({ open: true, type: 'link' });
  };

  const handleTriggerSTKPush = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement STK push
    setModalState({ open: true, type: 'summary' });
    
    // Mock payment success after 3 seconds
    setTimeout(() => {
      setModalState({ open: true, type: 'success' });
    }, 3000);
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, open: false }));
    
    if (modalState.type === 'success') {
      // Reset form
      setFormData({
        customerName: '',
        amount: '',
        purpose: '',
        paymentMethod: 'mpesa'
      });
      
      toast.success('Payment completed successfully!');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header showNewTransaction={false} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-8">Create Transaction</h1>
            
            <div className="bg-white border rounded-lg p-6">
              <Tabs defaultValue="requesting" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="requesting">Requesting Payment</TabsTrigger>
                  <TabsTrigger value="disbursing">Disbursing Payments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="requesting" className="space-y-6">
                  <form onSubmit={activeTab === 'requesting' ? 
                    (formData.paymentMethod === 'mpesa' ? handleTriggerSTKPush : handleGeneratePaymentLink) : 
                    (e) => e.preventDefault()
                  }>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="customerName">Customer Name</Label>
                        <Input
                          id="customerName"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder="Amount"
                          className="mt-1"
                          required
                          type="number"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Select 
                          value={formData.paymentMethod} 
                          onValueChange={handleSelectChange('paymentMethod')}
                        >
                          <SelectTrigger id="paymentMethod" className="mt-1">
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
                          <p>To trigger STK Push customer needs to be online.</p>
                        </div>
                      )}
                      
                      <div className="flex justify-center space-x-4">
                        {formData.paymentMethod === 'mpesa' ? (
                          <Button 
                            type="submit" 
                            className="bg-blue-700 hover:bg-blue-800"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Trigger STK Push
                          </Button>
                        ) : (
                          <Button 
                            type="submit" 
                            className="bg-blue-700 hover:bg-blue-800"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Generate Payment Link
                          </Button>
                        )}
                      </div>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="disbursing" className="space-y-6">
                  <div className="text-center p-8">
                    <h3 className="text-lg font-medium mb-2">Disbursement Feature Coming Soon</h3>
                    <p className="text-gray-500">This feature will allow you to send payments directly to customers, suppliers, and partners.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      
      {/* Payment Modals */}
      <PaymentSetupModal
        open={modalState.open}
        onClose={handleCloseModal}
        type={modalState.type}
        data={{
          customerName: formData.customerName,
          amount: formData.amount ? `Ksh ${formData.amount}` : 'Ksh 30,000',
          purpose: formData.purpose || 'Quikk API',
          mpesaTill: '8999795',
          billId: 'FT789566'
        }}
      />
    </div>
  );
};

export default PayIn;
