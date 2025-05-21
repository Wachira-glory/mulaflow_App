
import React from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const handleSaveChanges = () => {
    toast.success('Settings saved successfully!');
  };

  const handleUpdatePassword = () => {
    toast.success('Password updated successfully!');
  };

  const handleSaveAPIKey = () => {
    toast.success('API key regenerated successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>
            
            <Tabs defaultValue="account" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium">
                        J
                      </div>
                      <div>
                        <Button variant="outline">Change Photo</Button>
                        <Button variant="link" className="text-gray-500">Remove</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Johnathan" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="johnathan.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+254 712 345 678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <select id="country" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                          <option value="kenya">Kenya</option>
                          <option value="uganda">Uganda</option>
                          <option value="tanzania">Tanzania</option>
                          <option value="rwanda">Rwanda</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4">Business Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input id="businessName" defaultValue="Acme Corp" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessType">Business Type</Label>
                          <select id="businessType" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                            <option value="llc">LLC</option>
                            <option value="corporation">Corporation</option>
                            <option value="partnership">Partnership</option>
                            <option value="soleProprietorship">Sole Proprietorship</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <div className="pt-2">
                          <Button onClick={handleUpdatePassword}>Update Password</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable 2FA</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Successful Transactions</p>
                            <p className="text-sm text-gray-500">Receive notifications for successful transactions</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Failed Transactions</p>
                            <p className="text-sm text-gray-500">Receive notifications for failed transactions</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Payment Methods</p>
                            <p className="text-sm text-gray-500">Receive notifications when new payment methods are added</p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Account Updates</p>
                            <p className="text-sm text-gray-500">Receive notifications for account updates</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing</p>
                            <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="api">
                <Card>
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>Manage your API keys and integrations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <Label htmlFor="apiKey" className="block mb-2">API Key</Label>
                      <div className="flex">
                        <Input
                          id="apiKey"
                          value="sk_live_51LT7FGtq6kzP1A4LNeCveRdgGwD1..."
                          readOnly
                          className="flex-1 font-mono bg-white"
                        />
                        <Button variant="outline" className="ml-2">Copy</Button>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Keep this key secret. Do not share it in client-side code.</p>
                    </div>
                    
                    <div>
                      <Button onClick={handleSaveAPIKey}>Regenerate API Key</Button>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4">Webhooks</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="webhookUrl">Webhook URL</Label>
                          <Input id="webhookUrl" placeholder="https://your-app.com/webhook" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="webhookPayments"
                              className="rounded border-gray-300 text-blue-600"
                            />
                            <Label htmlFor="webhookPayments">Payment events</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="webhookAccounts"
                              className="rounded border-gray-300 text-blue-600"
                            />
                            <Label htmlFor="webhookAccounts">Account events</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSaveChanges}>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
