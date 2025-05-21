
import React from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Filter, Calendar } from 'lucide-react';

const Reports = () => {
  const data = [
    { name: 'Jan', transactions: 400, revenue: 2400, average: 600 },
    { name: 'Feb', transactions: 300, revenue: 1398, average: 466 },
    { name: 'Mar', transactions: 200, revenue: 9800, average: 4900 },
    { name: 'Apr', transactions: 278, revenue: 3908, average: 1400 },
    { name: 'May', transactions: 189, revenue: 4800, average: 2500 },
    { name: 'Jun', transactions: 239, revenue: 3800, average: 1600 },
    { name: 'Jul', transactions: 349, revenue: 4300, average: 1230 },
  ];

  const downloadReport = (reportType: string) => {
    toast.success(`${reportType} report download started`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Reports</h1>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" /> Date Range
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
                <Button className="bg-blue-700 hover:bg-blue-800">
                  <Download className="h-4 w-4 mr-2" /> Export Reports
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="payouts">Payouts</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Overview Report</CardTitle>
                    <CardDescription>Summary of all your financial activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-sm text-gray-500">Total Revenue</div>
                          <div className="text-2xl font-bold mt-2">Ksh 256,420</div>
                          <div className="text-sm text-green-600 mt-1">+12.3% from last period</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-sm text-gray-500">Total Transactions</div>
                          <div className="text-2xl font-bold mt-2">1,543</div>
                          <div className="text-sm text-green-600 mt-1">+8.7% from last period</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-sm text-gray-500">Average Transaction</div>
                          <div className="text-2xl font-bold mt-2">Ksh 166.25</div>
                          <div className="text-sm text-green-600 mt-1">+3.2% from last period</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="h-80 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="transactions" fill="#8884d8" name="Transactions" />
                          <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="outline"
                        onClick={() => downloadReport('Overview')}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="transactions">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Transaction Report</CardTitle>
                    <CardDescription>Details of all your transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={data}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="transactions" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="average" stroke="#82ca9d" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="outline"
                        onClick={() => downloadReport('Transactions')}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="revenue">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Revenue Report</CardTitle>
                    <CardDescription>Analysis of your revenue streams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="outline"
                        onClick={() => downloadReport('Revenue')}
                      >
                        <Download className="h-4 w-4 mr-2" /> Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payouts">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Payouts Report</CardTitle>
                    <CardDescription>Summary of all your payouts</CardDescription>
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
                        <h3 className="text-lg font-medium mb-2">No Payout Data Available</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                          There are no payouts to display yet. Once you have processed some payouts, your data will appear here.
                        </p>
                        <Button variant="outline" onClick={() => toast.info('Payout feature coming soon!')}>
                          Go to Payouts
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <Card>
              <CardHeader>
                <CardTitle>Saved Reports</CardTitle>
                <CardDescription>Access your previously generated reports</CardDescription>
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
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No Saved Reports</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      You haven't saved any reports yet. Generate and save reports to access them quickly later.
                    </p>
                    <Button 
                      className="bg-blue-700 hover:bg-blue-800"
                      onClick={() => toast.info('Report generation feature coming soon!')}
                    >
                      Generate New Report
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

export default Reports;
