
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SetupProgress from '@/components/setup-progress';

const Welcome = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const setupSteps = [
    {
      number: 1,
      title: 'Business Setup',
      description: 'Setup your business details and choose the billing plan',
      path: '/setup-business',
      buttonText: 'Setup Business',
      isComplete: false,
    },
    {
      number: 2,
      title: 'Setup Account & Payment Channels',
      description: 'Configure your account details and connect your preferred payment methods.',
      path: '/setup-account',
      buttonText: 'Setup Account',
      isComplete: false,
    },
    {
      number: 3,
      title: 'Request Payment',
      description: 'Create and send payment requests to your customers or clients',
      path: '/pay-in',
      buttonText: 'Request Payments',
      isComplete: false,
    },
    {
      number: 4,
      title: 'Receive Payments',
      description: 'Receive Payments Track and manage incoming payments from your customers',
      path: '/pay-in',
      buttonText: 'View Payments',
      isComplete: false,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header showBackButton={false} showPaymentAction />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-8">Welcome</h1>
            
            <Card className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold">Onboarding Progress</h2>
                  <span className="text-sm text-gray-500">
                    {completedSteps.length}/{setupSteps.length} completed
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {setupSteps.map((step) => (
                  <div key={step.number} className="border rounded-lg p-5 bg-white">
                    <div className="mb-4">
                      <h3 className="font-semibold mb-1">Step {step.number}</h3>
                      <p className="text-gray-700">{step.title}</p>
                    </div>
                    <p className="text-sm text-gray-500 mb-8">{step.description}</p>
                    <Button 
                      onClick={() => navigate(step.path)}
                      variant={completedSteps.includes(step.number) ? "default" : "outline"}
                      className={completedSteps.includes(step.number) ? "bg-blue-700 text-white hover:bg-blue-800" : ""}
                    >
                      {step.buttonText}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Welcome;
