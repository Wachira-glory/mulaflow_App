
import React from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const Payout = () => {
  const handleCreatePayout = () => {
    toast.info('Payout feature coming soon!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Payouts</h1>
              <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleCreatePayout}>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Payout
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Available Balance</CardDescription>
                  <CardTitle className="text-2xl">Ksh 185,500.00</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Paid Out</CardDescription>
                  <CardTitle className="text-2xl">Ksh 42,800.00</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Pending Payouts</CardDescription>
                  <CardTitle className="text-2xl">Ksh 12,500.00</CardTitle>
                </CardHeader>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Recent Payouts</CardTitle>
                <CardDescription>View your recent payout transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No Payouts Yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      You haven't made any payouts yet. When you do, they will appear here.
                    </p>
                    <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleCreatePayout}>
                      Create Your First Payout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payout Methods</CardTitle>
                <CardDescription>Manage your payout destination accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mx-auto mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No Payout Methods</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Add a bank account or other payout destination to receive your funds.
                    </p>
                    <Button variant="outline" onClick={() => toast.info('Add payout method coming soon!')}>
                      Add Payout Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payout;
