
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Logo } from './ui/logo';

interface PaymentSetupModalProps {
  open: boolean;
  onClose: () => void;
  type: 'summary' | 'success' | 'link';
  data: {
    customerName?: string;
    amount?: string;
    purpose?: string;
    billId?: string;
    mpesaTill?: string;
    failed?: boolean;
  };
}

const PaymentSetupModal: React.FC<PaymentSetupModalProps> = ({
  open,
  onClose,
  type,
  data
}) => {
  if (type === 'summary') {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <DialogTitle className="text-center">
              {data.failed ? 'Payment Failed' : 'Payment Summary'}
            </DialogTitle>
            {data.failed && (
              <DialogDescription className="text-center text-red-500">
                There was a problem processing your payment
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="py-6">
            {data.failed ? (
              <div className="flex flex-col items-center mb-6">
                <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
                <p className="text-center">
                  We couldn't process your payment. Please try again or contact support.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl text-center mb-6">Hello, {data.customerName || 'Customer'}</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Purpose of Bill</span>
                    <span className="font-medium">{data.purpose || 'Payment'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span className="font-medium">{data.amount || 'Ksh 0'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Mpesa Till :</span>
                    <span className="font-medium">{data.mpesaTill || '8999795'}</span>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              className={`w-full mt-8 ${data.failed ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-700 hover:bg-blue-800'}`} 
              onClick={onClose}
            >
              {data.failed ? 'Try Again' : 'Confirm Payment'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (type === 'success') {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <DialogTitle className="text-center">Payment Successful!</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <p className="mb-8">
              Thank you for your payment. We have received your {data.amount || 'payment'}
              for {data.purpose || 'service'}.
            </p>
            
            <Button 
              className="bg-blue-700 hover:bg-blue-800" 
              onClick={onClose}
            >
              Download Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Payment link modal
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <DialogTitle className="text-center">Payment Link Created</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="font-medium">Bill ID</span>
              <span>{data.billId || 'FT789566'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Customer Name</span>
              <span>{data.customerName || 'Customer'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Purpose of Bill</span>
              <span>{data.purpose || 'Payment'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount</span>
              <span>{data.amount || 'Ksh 0'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Mpesa Till :</span>
              <span>{data.mpesaTill || '8999795'}</span>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-sm">Your unique link has been created! You can copy it or share it via Gmail or WhatsApp</p>
          </div>
          
          <div className="bg-gray-100 p-3 rounded-md text-xs mb-4 text-center break-all">
            https://Mulaflow/payments/xv8y907266682006263970923844805
          </div>
          
          <div className="flex justify-center space-x-3">
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copied
            </Button>
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#EA4335" stroke="#EA4335" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"></path></svg>
            </Button>
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#25D366" stroke="#25D366" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.449C20.52 3.449 18.93 2.028 15.961 2h-8.254c-3.185 0-4.126 1.504-4.126 1.504C1.527 6.887 1 12.61 1.01 12.808v.002C1 15.148 1.015 20.309 2.544 21.723c.043.05.39.393.964.393h8.494c3.496 0 5.043-1.504 5.043-1.504 1.982-3.559 1.954-8.885 1.954-8.885-.08-4.223 1.521-8.278 1.521-8.278zM6.072 18.03a.3.3 0 0 1-.232.111.298.298 0 0 1-.188-.067l-1.601-1.192a.3.3 0 0 1-.054-.422l1.097-1.425a.3.3 0 0 1 .422-.054l1.6 1.193a.3.3 0 0 1 .055.421l-1.099 1.425zm14.269-6.11c-.297 4.11-2.022 7.845-2.022 7.845-1.595 2.906-5.38 3.718-5.38 3.718-1.75.22-4.312-.189-4.312-.189-1.528-.262-3.395-1.22-3.395-1.22-3.533-2.076-2.988-9.069-2.988-9.069.12-3.56 2.178-5.77 2.178-5.77 2.014-2.196 4.8-2.458 4.8-2.458l.439-.034c1.406-.126 6.221-.13 6.221-.13 1.995.037 4.104.323 4.104.323 4.284.645 5.895 8.31 5.895 8.31.17 1.134.075 3.796.075 3.796.103.088.187.087.187.087.158.004.288-.13.288-.13s.037-2.62-.09-3.82c-.026-.22-.142-1.197-.142-1.197-1.048-8.291-5.89-9.18-5.89-9.18-1.956-.353-4.157-.444-4.157-.444-3.7-.054-6.04.078-6.04.078-3.956.24-6.202 2.455-6.202 2.455-3.008 2.884-3.148 7.096-3.148 7.096-.114 2.029.241 6.1.241 6.1.815 7.31 4.374 9.535 4.374 9.535 1.638 1.022 3.488 1.437 3.488 1.437 1.953.447 4.922.322 4.922.322 5.382-.282 8.023-4.053 8.023-4.053 2.09-2.896 2.321-8.831 2.321-8.831-.063-3.044 2.207-3.436 2.207-3.436a.84.84 0 0 0 .386-.121.212.212 0 0 0 .055-.163.22.22 0 0 0-.214-.225c-.188.005-2.773.144-3.143 3.084"></path></svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSetupModal;
