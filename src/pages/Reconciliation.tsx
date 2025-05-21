
import React from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';

const Reconciliation = () => {
  const handleStartReconciliation = () => {
    toast.info('Reconciliation feature coming soon!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Reconciliation</h1>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
            </div>
            
            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle>Reconciliation Summary</CardTitle>
                <CardDescription>Overview of your account reconciliation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Transactions</div>
                    <div className="text-2xl font-semibold">243</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Reconciled</div>
                    <div className="text-2xl font-semibold text-green-600">198</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Discrepancies</div>
                    <div className="text-2xl font-semibold text-amber-600">32</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Pending</div>
                    <div className="text-2xl font-semibold text-blue-600">13</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Start New Reconciliation</CardTitle>
                  <CardDescription>Reconcile your transactions with external systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Start a new reconciliation process to compare your transaction records with bank statements or other external systems.
                    </p>
                    <Button 
                      className="w-full bg-blue-700 hover:bg-blue-800"
                      onClick={handleStartReconciliation}
                    >
                      Start Reconciliation
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Auto-Reconciliation</CardTitle>
                  <CardDescription>Schedule automated reconciliation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Set up automatic reconciliation to regularly compare your records with external systems.
                    </p>
                    <div className="bg-amber-50 p-3 rounded text-sm text-amber-800 mb-4">
                      Auto-reconciliation requires a Professional or Enterprise plan.
                    </div>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => toast.info('Auto-reconciliation requires a plan upgrade!')}
                    >
                      Set Up Auto-Reconciliation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Reconciliation Reports</CardTitle>
                <CardDescription>View and download your recent reconciliation reports</CardDescription>
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
                    <h3 className="text-lg font-medium mb-2">No Reconciliation Reports Yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      You haven't run any reconciliation processes yet. When you do, your reports will appear here.
                    </p>
                    <Button 
                      className="bg-blue-700 hover:bg-blue-800"
                      onClick={handleStartReconciliation}
                    >
                      Run Your First Reconciliation
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

export default Reconciliation;
