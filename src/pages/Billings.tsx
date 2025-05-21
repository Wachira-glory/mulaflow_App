
import React from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const Billings = () => {
  const currentPlan = 'professional';
  
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      description: 'For individuals and small businesses just getting started.',
      features: [
        'Process up to $10,000 monthly',
        '2.9% + $0.30 per transaction',
        'Basic reporting',
        'Email support',
        '1 team member'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$79',
      description: 'For growing businesses with higher transaction volumes.',
      features: [
        'Process up to $50,000 monthly',
        '2.5% + $0.25 per transaction',
        'Advanced reporting',
        'Priority email and chat support',
        'Up to 5 team members',
        'Custom payment pages'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199',
      description: 'For established businesses with high volumes and custom needs.',
      features: [
        'Unlimited processing volume',
        'Custom pricing available',
        'Real-time analytics',
        '24/7 dedicated support',
        'Unlimited team members',
        'Custom integrations',
        'Dedicated account manager'
      ]
    }
  ];
  
  const handleChangePlan = (planId: string) => {
    if (planId === currentPlan) {
      toast.info('You are already on this plan.');
      return;
    }
    toast.info(`Upgrading to ${plans.find(p => p.id === planId)?.name} plan coming soon!`);
  };
  
  const handleViewInvoices = () => {
    toast.info('Invoices feature coming soon!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Billings</h1>
              <Button variant="outline" onClick={handleViewInvoices}>
                View Invoices
              </Button>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4">Current Plan</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Professional Plan</CardTitle>
                  <CardDescription>Your plan renews on June 15, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold">$79</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-6">
                    You are billed monthly. Next invoice: $79 on June 15, 2025
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Plan includes:</h4>
                      <ul className="space-y-2">
                        {plans.find(p => p.id === 'professional')?.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Current Usage:</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Monthly processing</span>
                            <span>$23,450 / $50,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '47%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Team members</span>
                            <span>3 / 5</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2 justify-end">
                  <Button variant="outline">Cancel Plan</Button>
                  <Button variant="outline">Update Payment Method</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <h2 className="text-lg font-medium mb-4">Available Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={plan.id === currentPlan ? 'border-blue-500 ring-2 ring-blue-200' : ''}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{plan.name}</CardTitle>
                          <div className="flex items-baseline mt-2">
                            <span className="text-2xl font-bold">{plan.price}</span>
                            <span className="text-gray-500 ml-1">/month</span>
                          </div>
                        </div>
                        {plan.id === currentPlan && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <CardDescription className="mt-2">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={plan.id === currentPlan ? "outline" : "default"}
                        className={plan.id === currentPlan ? "" : "bg-blue-700 hover:bg-blue-800 w-full"}
                        onClick={() => handleChangePlan(plan.id)}
                        disabled={plan.id === currentPlan}
                      >
                        {plan.id === currentPlan ? 'Current Plan' : plan.id === 'starter' ? 'Downgrade' : 'Upgrade'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Billings;
