
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import BusinessSetupForm from '@/components/business-setup-form';

const SetupBusiness = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (formData: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Business setup data:', formData);
      setIsLoading(false);
      toast.success('Business setup completed successfully!');
      
      // Redirect to onboarding progress page
      navigate('/welcome');
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header showBackButton showPaymentAction={false} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Business Setup</h1>
            <p className="text-gray-600 mb-8">Add your business details</p>
            
            <BusinessSetupForm 
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SetupBusiness;
