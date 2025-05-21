
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentMethodsSelector, { defaultPaymentMethods } from './payment-methods-selector';

interface PaymentMethodFormProps {
  onSubmit: (formData: any) => void;
  isLoading?: boolean;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ onSubmit, isLoading = false }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [formData, setFormData] = useState({
    // Card fields
    cardholderName: '',
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',
    billingAddress: '',

    // Bank fields
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: '',

    // Wallet fields
    walletType: '',
    walletEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit only the relevant fields based on selected method
    const relevantData = {
      paymentMethod: selectedMethod,
      ...formData
    };
    onSubmit(relevantData);
  };

  const renderCardForm = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="cardholderName" className="block text-gray-700">Cardholder Name</label>
        <Input 
          id="cardholderName" 
          name="cardholderName" 
          value={formData.cardholderName} 
          onChange={handleChange} 
          className="bg-white" 
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
        <Input 
          id="cardNumber" 
          name="cardNumber" 
          value={formData.cardNumber} 
          onChange={handleChange} 
          className="bg-white" 
          placeholder="0000 0000 0000 0000"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="expirationMonth" className="block text-gray-700">Expiration Month</label>
          <Input 
            id="expirationMonth" 
            name="expirationMonth" 
            value={formData.expirationMonth} 
            onChange={handleChange} 
            className="bg-white" 
            placeholder="MM"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="expirationYear" className="block text-gray-700">Expiration Year</label>
          <Input 
            id="expirationYear" 
            name="expirationYear" 
            value={formData.expirationYear} 
            onChange={handleChange} 
            className="bg-white" 
            placeholder="YYYY"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="cvc" className="block text-gray-700">CVC</label>
          <Input 
            id="cvc" 
            name="cvc" 
            value={formData.cvc} 
            onChange={handleChange} 
            className="bg-white" 
            placeholder="123"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="billingAddress" className="block text-gray-700">Billing Address</label>
        <Input 
          id="billingAddress" 
          name="billingAddress" 
          value={formData.billingAddress} 
          onChange={handleChange} 
          className="bg-white"
          placeholder="Enter your billing address"
        />
      </div>
    </CardContent>
  );

  const renderBankForm = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="accountHolderName" className="block text-gray-700">Account Holder Name</label>
        <Input 
          id="accountHolderName" 
          name="accountHolderName" 
          value={formData.accountHolderName} 
          onChange={handleChange} 
          className="bg-white" 
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="bankName" className="block text-gray-700">Bank Name</label>
        <Input 
          id="bankName" 
          name="bankName" 
          value={formData.bankName} 
          onChange={handleChange} 
          className="bg-white" 
          placeholder="Equity Bank"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="accountNumber" className="block text-gray-700">Account Number</label>
        <Input 
          id="accountNumber" 
          name="accountNumber" 
          value={formData.accountNumber} 
          onChange={handleChange} 
          className="bg-white" 
          placeholder="Enter account number"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="routingNumber" className="block text-gray-700">Routing Number</label>
        <Input 
          id="routingNumber" 
          name="routingNumber" 
          value={formData.routingNumber} 
          onChange={handleChange} 
          className="bg-white" 
          placeholder="Enter routing number"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="accountType" className="block text-gray-700">Account Type</label>
        <select 
          id="accountType" 
          name="accountType" 
          value={formData.accountType} 
          onChange={handleChange} 
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
        >
          <option value="">Select account type</option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
          <option value="business">Business</option>
        </select>
      </div>
    </CardContent>
  );

  const renderWalletForm = () => (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="walletType" className="block text-gray-700">Wallet Type</label>
        <select 
          id="walletType" 
          name="walletType" 
          value={formData.walletType} 
          onChange={handleChange} 
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
        >
          <option value="">Select wallet type</option>
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
          <option value="mpesa">M-Pesa</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="walletEmail" className="block text-gray-700">Email/Mobile</label>
        <Input 
          id="walletEmail" 
          name="walletEmail" 
          value={formData.walletEmail} 
          onChange={handleChange} 
          className="bg-white" 
          placeholder="Enter email or mobile number"
        />
      </div>
    </CardContent>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
          <PaymentMethodsSelector 
            methods={defaultPaymentMethods} 
            selectedMethod={selectedMethod} 
            onMethodSelect={setSelectedMethod} 
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedMethod === 'card' && 'Credit Card Details'}
              {selectedMethod === 'bank' && 'Bank Account Details'}
              {selectedMethod === 'wallet' && 'Digital Wallet Details'}
            </CardTitle>
            <CardDescription>
              {selectedMethod === 'card' && 'Enter your credit or debit card information'}
              {selectedMethod === 'bank' && 'Connect your bank account for direct transfers'}
              {selectedMethod === 'wallet' && 'Set up your digital wallet for payments'}
            </CardDescription>
          </CardHeader>
          
          {selectedMethod === 'card' && renderCardForm()}
          {selectedMethod === 'bank' && renderBankForm()}
          {selectedMethod === 'wallet' && renderWalletForm()}
          
          <CardFooter className="justify-end">
            <Button 
              type="submit" 
              className="bg-blue-700 hover:bg-blue-800" 
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Save payment Method'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default PaymentMethodForm;
