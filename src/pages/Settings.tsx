
// import React from 'react';
// import { toast } from 'sonner';
// import Sidebar from '@/components/sidebar';
// import Header from '@/components/header';
// import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Label } from '@/components/ui/label';

// const Settings = () => {
//   const handleSaveChanges = () => {
//     toast.success('Settings saved successfully!');
//   };

//   const handleUpdatePassword = () => {
//     toast.success('Password updated successfully!');
//   };

//   const handleSaveAPIKey = () => {
//     toast.success('API key regenerated successfully!');
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
        
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-2xl font-semibold mb-6">Settings</h1>
            
//             <Tabs defaultValue="account" className="mb-8">
//               <TabsList className="grid w-full grid-cols-4">
//                 <TabsTrigger value="account">Account</TabsTrigger>
//                 <TabsTrigger value="security">Security</TabsTrigger>
//                 <TabsTrigger value="notifications">Notifications</TabsTrigger>
//                 <TabsTrigger value="api">API</TabsTrigger>
//               </TabsList>
//               <TabsContent value="account">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Account Settings</CardTitle>
//                     <CardDescription>Manage your account details</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="flex items-center space-x-4">
//                       <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium">
//                         J
//                       </div>
//                       <div>
//                         <Button variant="outline">Change Photo</Button>
//                         <Button variant="link" className="text-gray-500">Remove</Button>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <Label htmlFor="firstName">First Name</Label>
//                         <Input id="firstName" defaultValue="Johnathan" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="lastName">Last Name</Label>
//                         <Input id="lastName" defaultValue="Doe" />
//                       </div>
//                       <div className="space-y-2 md:col-span-2">
//                         <Label htmlFor="email">Email Address</Label>
//                         <Input id="email" type="email" defaultValue="johnathan.doe@example.com" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="phone">Phone Number</Label>
//                         <Input id="phone" type="tel" defaultValue="+254 712 345 678" />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="country">Country</Label>
//                         <select id="country" className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                           <option value="kenya">Kenya</option>
//                           <option value="uganda">Uganda</option>
//                           <option value="tanzania">Tanzania</option>
//                           <option value="rwanda">Rwanda</option>
//                         </select>
//                       </div>
//                     </div>
                    
//                     <div className="border-t pt-6">
//                       <h3 className="font-medium mb-4">Business Information</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div className="space-y-2">
//                           <Label htmlFor="businessName">Business Name</Label>
//                           <Input id="businessName" defaultValue="Acme Corp" />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="businessType">Business Type</Label>
//                           <select id="businessType" className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                             <option value="llc">LLC</option>
//                             <option value="corporation">Corporation</option>
//                             <option value="partnership">Partnership</option>
//                             <option value="soleProprietorship">Sole Proprietorship</option>
//                           </select>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="justify-end">
//                     <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSaveChanges}>
//                       Save Changes
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="security">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Security Settings</CardTitle>
//                     <CardDescription>Manage your security preferences</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="border-b pb-6">
//                       <h3 className="font-medium mb-4">Change Password</h3>
//                       <div className="grid gap-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="currentPassword">Current Password</Label>
//                           <Input id="currentPassword" type="password" />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="newPassword">New Password</Label>
//                           <Input id="newPassword" type="password" />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                           <Input id="confirmPassword" type="password" />
//                         </div>
//                         <div className="pt-2">
//                           <Button onClick={handleUpdatePassword}>Update Password</Button>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div>
//                       <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium">Enable 2FA</p>
//                           <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
//                         </div>
//                         <Switch />
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="notifications">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Notification Settings</CardTitle>
//                     <CardDescription>Manage how you receive notifications</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-6">
//                       <div className="flex flex-col gap-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Successful Transactions</p>
//                             <p className="text-sm text-gray-500">Receive notifications for successful transactions</p>
//                           </div>
//                           <Switch defaultChecked />
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Failed Transactions</p>
//                             <p className="text-sm text-gray-500">Receive notifications for failed transactions</p>
//                           </div>
//                           <Switch defaultChecked />
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">New Payment Methods</p>
//                             <p className="text-sm text-gray-500">Receive notifications when new payment methods are added</p>
//                           </div>
//                           <Switch />
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Account Updates</p>
//                             <p className="text-sm text-gray-500">Receive notifications for account updates</p>
//                           </div>
//                           <Switch defaultChecked />
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="font-medium">Marketing</p>
//                             <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
//                           </div>
//                           <Switch />
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="justify-end">
//                     <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSaveChanges}>
//                       Save Changes
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="api">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>API Settings</CardTitle>
//                     <CardDescription>Manage your API keys and integrations</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="bg-gray-50 p-4 rounded-md">
//                       <Label htmlFor="apiKey" className="block mb-2">API Key</Label>
//                       <div className="flex">
//                         <Input
//                           id="apiKey"
//                           value="sk_live_51LT7FGtq6kzP1A4LNeCveRdgGwD1..."
//                           readOnly
//                           className="flex-1 font-mono bg-white"
//                         />
//                         <Button variant="outline" className="ml-2">Copy</Button>
//                       </div>
//                       <p className="mt-2 text-xs text-gray-500">Keep this key secret. Do not share it in client-side code.</p>
//                     </div>
                    
//                     <div>
//                       <Button onClick={handleSaveAPIKey}>Regenerate API Key</Button>
//                     </div>
                    
//                     <div className="border-t pt-6">
//                       <h3 className="font-medium mb-4">Webhooks</h3>
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="webhookUrl">Webhook URL</Label>
//                           <Input id="webhookUrl" placeholder="https://your-app.com/webhook" />
//                         </div>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="flex items-center space-x-2">
//                             <input
//                               type="checkbox"
//                               id="webhookPayments"
//                               className="rounded border-gray-300 text-blue-600"
//                             />
//                             <Label htmlFor="webhookPayments">Payment events</Label>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <input
//                               type="checkbox"
//                               id="webhookAccounts"
//                               className="rounded border-gray-300 text-blue-600"
//                             />
//                             <Label htmlFor="webhookAccounts">Account events</Label>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="justify-end">
//                     <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSaveChanges}>
//                       Save Changes
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Settings;


//src/pages/Settings.tsx
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import AddAccountModal from '@/components/add-account-modal';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useUserProfile, useUpdateProfile, useUpdatePassword } from '@/hooks/useUserProfile';
import { useAccounts } from '@/hooks/useAccounts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Settings = () => {
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const { data: accounts = [], isLoading: accountsLoading } = useAccounts();
  const updateProfile = useUpdateProfile();
  const updatePassword = useUpdatePassword();
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: ''
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Update form when profile data loads
  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        email: userProfile.email || '',
        phone: userProfile.phone || '',
        country: userProfile.country || ''
      });
    }
  }, [userProfile]);

  // const handleProfileSubmit = async () => {
  //   // Validate required fields
  //   if (!profileForm.first_name.trim() || !profileForm.last_name.trim() || 
  //       !profileForm.email.trim() || !profileForm.phone.trim() || !profileForm.country.trim()) {
  //     toast.error('All fields are required');
  //     return;
  //   }

  //   try {
  //     await updateProfile.mutateAsync(profileForm);
  //     toast.success('Profile updated successfully!');
  //   } catch (error) {
  //     toast.error(error.message || 'Failed to update profile');
  //   }
  // };


  // In your Settings component, modify the handleProfileSubmit function:

const handleProfileSubmit = async () => {
  // Validate required fields
  if (!profileForm.first_name.trim() || !profileForm.last_name.trim() || 
      !profileForm.email.trim() || !profileForm.phone.trim() || !profileForm.country.trim()) {
    toast.error('All fields are required');
    return;
  }

  try {
    console.log('Submitting profile update:', profileForm);
    
    const result = await updateProfile.mutateAsync(profileForm);
    
    console.log('Profile update result:', result);
    
    toast.success('Profile updated successfully!');
    
    // Optional: Force a small delay to ensure cache update propagates
    setTimeout(() => {
      console.log('Profile update should be reflected in sidebar now');
    }, 100);
    
  } catch (error) {
    console.error('Profile update error:', error);
    toast.error(error.message || 'Failed to update profile');
  }
};
  const handlePasswordSubmit = async () => {
    // Validate required fields
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('All password fields are required');
      return;
    }

    // Validate password match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    // Validate password length
    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    try {
      await updatePassword.mutateAsync({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      toast.success('Password updated successfully!');
      // Reset form
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
    }
  };

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber;
    const start = accountNumber.substring(0, 2);
    const end = accountNumber.substring(accountNumber.length - 3);
    const middle = '*'.repeat(Math.max(0, accountNumber.length - 5));
    return `${start}${middle}${end}`;
  };

  const getAccountIcon = (accountType: string, bankName?: string) => {
    if (accountType.toLowerCase().includes('mpesa') || accountType === 'Personal') {
      return (
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 text-xs font-semibold">MP</span>
        </div>
      );
    }
    
    return (
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <span className="text-red-600 text-xs font-semibold">
          {bankName ? bankName.substring(0, 2).toUpperCase() : 'BK'}
        </span>
      </div>
    );
  };

  const displayName = userProfile?.first_name || 'User';
  const initials = userProfile?.first_name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>
            
            <Tabs defaultValue="profile" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="channels">Channels</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {profileLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium">
                            {initials}
                          </div>
                          <div>
                            <Button variant="outline">Change Photo</Button>
                            <Button variant="link" className="text-gray-500">Remove</Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input 
                              id="firstName" 
                              value={profileForm.first_name}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, first_name: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input 
                              id="lastName" 
                              value={profileForm.last_name}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, last_name: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={profileForm.email}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country *</Label>
                            <select 
                              id="country" 
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              value={profileForm.country}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, country: e.target.value }))}
                              required
                            >
                              <option value="">Select a country</option>
                              <option value="kenya">Kenya</option>
                              <option value="uganda">Uganda</option>
                              <option value="tanzania">Tanzania</option>
                              <option value="rwanda">Rwanda</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button 
                      className="bg-blue-700 hover:bg-blue-800" 
                      onClick={handleProfileSubmit}
                      disabled={updateProfile.isPending}
                    >
                      {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
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
                    <div>
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password *</Label>
                          <Input 
                            id="currentPassword" 
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password * (min 6 characters)</Label>
                          <Input 
                            id="newPassword" 
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                          <Input 
                            id="confirmPassword" 
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="pt-2">
                          <Button 
                            onClick={handlePasswordSubmit}
                            disabled={updatePassword.isPending}
                          >
                            {updatePassword.isPending ? 'Updating...' : 'Update Password'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="channels">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Channels</CardTitle>
                        <CardDescription>Manage your payment channels</CardDescription>
                      </div>
                      <Button 
                        onClick={() => setIsAddChannelModalOpen(true)}
                        className="bg-blue-700 hover:bg-blue-800"
                      >
                        <Plus size={18} className="mr-2" />
                        Add Channel
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {accountsLoading ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    ) : accounts.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">No channels found</p>
                        <Button 
                          onClick={() => setIsAddChannelModalOpen(true)}
                          className="bg-blue-700 hover:bg-blue-800"
                        >
                          <Plus size={18} className="mr-2" />
                          Add your first channel
                        </Button>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Channel Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Account Number</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {accounts.map((account) => (
                            <TableRow key={account.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  {getAccountIcon(account.account_type, account.bank_name)}
                                  <div>
                                    <div className="font-medium">
                                      {account.bank_name || 'M-pesa'}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {account.account_name}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm">
                                  {account.account_type}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="font-mono text-sm">
                                  {maskAccountNumber(account.account_number)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="font-semibold">
                                  Ksh {account.balance.toLocaleString()}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  account.status === 'Active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {account.status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <AddAccountModal 
        open={isAddChannelModalOpen} 
        onOpenChange={setIsAddChannelModalOpen} 
      />
    </div>
  );
};

export default Settings;
