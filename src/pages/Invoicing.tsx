
import React, { useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Download, Plus, Search } from 'lucide-react';

const Invoicing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  const handleCreateInvoice = () => {
    toast.info('Create invoice feature coming soon!');
  };
  
  const handleFilter = () => {
    toast.info('Filter feature coming soon!');
  };
  
  const handleExport = () => {
    toast.info('Export feature coming soon!');
  };
  
  // Mock data - would come from Supabase in a real app
  const invoices = [
    {
      id: 'INV-001',
      customerName: 'Acme Corporation',
      invoiceDate: 'May 15, 2025',
      dueDate: 'Jun 15, 2025',
      amount: 'Ksh 25,000',
      status: 'Paid'
    },
    {
      id: 'INV-002',
      customerName: 'Tech Solutions Ltd',
      invoiceDate: 'May 10, 2025',
      dueDate: 'Jun 10, 2025',
      amount: 'Ksh 15,500',
      status: 'Pending'
    },
    {
      id: 'INV-003',
      customerName: 'Global Traders',
      invoiceDate: 'May 5, 2025',
      dueDate: 'Jun 5, 2025',
      amount: 'Ksh 32,800',
      status: 'Overdue'
    }
  ];
  
  const filteredInvoices = invoices.filter(invoice => {
    if (currentTab !== 'all' && invoice.status.toLowerCase() !== currentTab) {
      return false;
    }
    
    return invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
           invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const getStatusClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Invoicing</h1>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={handleFilter} className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" onClick={handleExport} className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={handleCreateInvoice} className="bg-blue-700 hover:bg-blue-800 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
              </div>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle>Invoices</CardTitle>
                  <div className="relative mt-2 sm:mt-0">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search invoices..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-full sm:w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="all" onValueChange={setCurrentTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="paid">Paid</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Invoice #
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Invoice Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Due Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
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
                          {filteredInvoices.length > 0 ? (
                            filteredInvoices.map((invoice) => (
                              <tr key={invoice.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                  {invoice.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {invoice.customerName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {invoice.invoiceDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {invoice.dueDate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {invoice.amount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusClass(invoice.status)}`}>
                                    {invoice.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-gray-500">
                                    •••
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="px-6 py-12 text-center">
                                <p className="text-gray-500 mb-2">No invoices found</p>
                                <Button onClick={handleCreateInvoice} className="mt-2">
                                  Create your first invoice
                                </Button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                      <div>
                        <p className="font-medium">INV-001</p>
                        <p className="text-sm text-gray-500">Acme Corporation</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-700">Ksh 25,000</p>
                        <p className="text-xs text-gray-500">May 20, 2025</p>
                      </div>
                    </div>
                    
                    <div className="text-center py-8">
                      <p className="text-gray-500">No more recent payments</p>
                      <Button variant="link" className="mt-2">
                        View all payments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                      <span className="font-medium">Total Invoices</span>
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                      <span className="font-medium">Paid</span>
                      <span className="text-lg font-bold text-green-600">1</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                      <span className="font-medium">Pending</span>
                      <span className="text-lg font-bold text-yellow-600">1</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                      <span className="font-medium">Overdue</span>
                      <span className="text-lg font-bold text-red-600">1</span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 rounded-md border">
                      <span className="font-medium">Total Amount</span>
                      <span className="text-lg font-bold">Ksh 73,300</span>
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

export default Invoicing;
