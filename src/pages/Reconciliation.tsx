
import React, { useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReconciliationData } from '@/hooks/useReconciliationData';

const Reconciliation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  // const { data: reconciliationData, isLoading } = useReconciliationData();
const reconciliationData = {
  summary: { totalTransactions: 10, reconciled: 5, discrepancies: 2, pending: 3 },
  discrepancies: []
};
const isLoading = false;

  const handleStartReconciliation = () => {
    toast.info('Starting reconciliation process...');
  };

  const filteredDiscrepancies = reconciliationData?.discrepancies?.filter(item => {
    if (activeTab === 'resolved' && item.status !== 'Resolved') return false;
    if (activeTab === 'unresolved' && item.status !== 'Unresolved') return false;
    
    return item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.amount.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  const getStatusClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'unresolved':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                <div className="bg-white rounded-lg p-6 mb-8">
                  <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
                  <div className="grid grid-cols-4 gap-6">
                    {Array(4).fill(null).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                    <div className="text-2xl font-semibold">{reconciliationData?.summary.totalTransactions || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Reconciled</div>
                    <div className="text-2xl font-semibold text-green-600">{reconciliationData?.summary.reconciled || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Discrepancies</div>
                    <div className="text-2xl font-semibold text-amber-600">{reconciliationData?.summary.discrepancies || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Pending</div>
                    <div className="text-2xl font-semibold text-blue-600">{reconciliationData?.summary.pending || 0}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle>Discrepancies</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="all" onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Discrepancy ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Discrepancy Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDiscrepancies.length > 0 ? (
                          filteredDiscrepancies.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                {item.id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.transactionId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.amount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.discrepancyType}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusClass(item.status)}`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button size="sm" variant="ghost" onClick={() => toast.info(`Comparing transaction ${item.transactionId} with bank statement...`)}>
                                  Compare
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center">
                              <p className="text-gray-500 mb-2">No discrepancies found</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Tabs>
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
                  <CardTitle>Upload Bank Statement</CardTitle>
                  <CardDescription>Upload your bank statement for reconciliation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500">
                      Upload your bank statement in CSV or Excel format to automatically compare with your transaction records.
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
                      <Button 
                        variant="outline" 
                        onClick={() => toast.info('File upload functionality coming soon')}
                      >
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reconciliation;
