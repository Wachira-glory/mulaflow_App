// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useCreateAccount } from '@/hooks/useAccounts';
// import { useToast } from '@/hooks/use-toast';
// import { supabase } from '@/lib/supabase'; // Add this import

// interface AddAccountModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const AddAccountModal: React.FC<AddAccountModalProps> = ({ open, onOpenChange }) => {
//   const [activeTab, setActiveTab] = useState('bank');
//   const [formData, setFormData] = useState({
//     account_name: '',
//     account_type: 'Business Account',
//     account_number: '',
//     bank_name: '',
//     branch_code: '',
//     paybill_number: '',
//     mpesa_account_type: 'Personal',
//     balance: 0,
//     status: 'Active' as const,
//   });

//   const createAccount = useCreateAccount();
//   const { toast } = useToast();

//   // Add authentication debugging
//   useEffect(() => {
//     const checkAuth = async () => {
//       console.log('=== AUTHENTICATION DEBUG ===');
      
//       // Check current session
//       const { data: { session }, error: sessionError } = await supabase.auth.getSession();
//       console.log('Current session:', session);
//       console.log('Session error:', sessionError);
      
//       // Check current user
//       const { data: { user }, error: userError } = await supabase.auth.getUser();
//       console.log('Current user:', user);
//       console.log('User error:', userError);
      
//       // Check if user is authenticated
//       console.log('Is authenticated:', !!user);
//       console.log('User ID:', user?.id);
//       console.log('User email:', user?.email);
      
//       console.log('=== END DEBUG ===');
//     };
    
//     if (open) {
//       checkAuth();
//     }
//   }, [open]);

//   const handleInputChange = (field: string, value: string | number) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };
// const handleSubmit = async () => {
//   try {
//     const accountData = {
//       account_name: formData.account_name.trim(),
//       account_type: activeTab === 'bank' ? formData.account_type : formData.mpesa_account_type,
//       account_number: formData.account_number.trim(),
//       bank_name: activeTab === 'bank' ? formData.bank_name.trim() : undefined,
//       branch_code: activeTab === 'bank' ? formData.branch_code.trim() : undefined,
//       paybill_number: activeTab === 'mpesa' ? formData.paybill_number.trim() : undefined,
//       balance: formData.balance,
//       status: formData.status,
//     };

//     await createAccount.mutateAsync(accountData);
    
//     // Success handling...
//   } catch (error) {
//     console.error('SUBMIT ERROR:', error);
//   }
// };
// //   const handleSubmit = async () => {
// //     console.log('=== SUBMIT DEBUG START ===');
    
// //     // Check authentication right before submit
// //     const { data: { user }, error: authError } = await supabase.auth.getUser();
// //     console.log('User at submit time:', user);
// //     console.log('Auth error at submit time:', authError);
    
// //     if (!user) {
// //       toast({
// //         title: "Authentication Error",
// //         description: "You must be logged in to create an account",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     // Validation
// //     if (!formData.account_name.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Account name is required",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     if (!formData.account_number.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Account number is required",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     if (activeTab === 'bank' && !formData.bank_name.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Bank name is required",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     if (activeTab === 'mpesa' && !formData.paybill_number.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Paybill number is required",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     try {
// //       const accountData = {
// //         account_name: formData.account_name.trim(),
// //         account_type: activeTab === 'bank' ? formData.account_type : formData.mpesa_account_type,
// //         account_number: formData.account_number.trim(),
// //         bank_name: activeTab === 'bank' ? formData.bank_name.trim() : '',
// //         branch_code: activeTab === 'bank' ? formData.branch_code.trim() : '',
// //         paybill_number: activeTab === 'mpesa' ? formData.paybill_number.trim() : '',
// //         balance: formData.balance,
// //         status: formData.status,
// //       };

// //       console.log('Account data being sent:', accountData);
// //       console.log('=== SUBMIT DEBUG END ===');

// //       await createAccount.mutateAsync(accountData);
      
// //       toast({
// //         title: "Success",
// //         description: "Account added successfully",
// //       });
      
// //       onOpenChange(false);
      
// //       // Reset form
// //       setFormData({
// //         account_name: '',
// //         account_type: 'Business Account',
// //         account_number: '',
// //         bank_name: '',
// //         branch_code: '',
// //         paybill_number: '',
// //         mpesa_account_type: 'Personal',
// //         balance: 0,
// //         status: 'Active',
// //       });
// //       setActiveTab('bank');
// //     } catch (error) {
// //       console.error('Submit error:', error);
// //       toast({
// //         title: "Error",
// //         description: "Failed to add account. Please try again.",
// //         variant: "destructive",
// //       });
// //     }
// //   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New Account</DialogTitle>
//           <DialogDescription>
//             Add your bank account or M-Pesa details to receive payments.
//           </DialogDescription>
//         </DialogHeader>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="bank">Bank</TabsTrigger>
//             <TabsTrigger value="mpesa">M-pesa</TabsTrigger>
//           </TabsList>

//           <TabsContent value="bank" className="space-y-4">
//             <div>
//               <Label htmlFor="bank_name">Bank Name</Label>
//               <Input
//                 id="bank_name"
//                 placeholder="e.g. Equity"
//                 value={formData.bank_name}
//                 onChange={(e) => handleInputChange('bank_name', e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_type">Account Type</Label>
//               <select
//                 id="account_type"
//                 className="w-full p-2 border rounded-md"
//                 value={formData.account_type}
//                 onChange={(e) => handleInputChange('account_type', e.target.value)}
//               >
//                 <option value="Current Account">Current Account</option>
//                 <option value="Business Account">Business Account</option>
//                 <option value="Savings Account">Savings Account</option>
//               </select>
//             </div>

//             <div>
//               <Label htmlFor="account_name">Account Name</Label>
//               <Input
//                 id="account_name"
//                 placeholder="e.g. John Doe"
//                 value={formData.account_name}
//                 onChange={(e) => handleInputChange('account_name', e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_number">Account Number</Label>
//               <Input
//                 id="account_number"
//                 value={formData.account_number}
//                 onChange={(e) => handleInputChange('account_number', e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="branch_code">Branch Code (optional)</Label>
//               <Input
//                 id="branch_code"
//                 value={formData.branch_code}
//                 onChange={(e) => handleInputChange('branch_code', e.target.value)}
//               />
//             </div>
//           </TabsContent>

//           <TabsContent value="mpesa" className="space-y-4">
//             <div>
//               <Label>M-pesa Account Type</Label>
//               <div className="space-y-2 mt-2">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="mpesa_type"
//                     value="Personal"
//                     checked={formData.mpesa_account_type === 'Personal'}
//                     onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
//                     className="mr-2"
//                   />
//                   Personal(Phone Number)
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="mpesa_type"
//                     value="Dedicated Paybill"
//                     checked={formData.mpesa_account_type === 'Dedicated Paybill'}
//                     onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
//                     className="mr-2"
//                   />
//                   Dedicated Paybill
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="mpesa_type"
//                     value="Shared Paybill"
//                     checked={formData.mpesa_account_type === 'Shared Paybill'}
//                     onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
//                     className="mr-2"
//                   />
//                   Shared Paybill
//                 </label>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="paybill_number">Paybill Number</Label>
//               <Input
//                 id="paybill_number"
//                 placeholder="e.g. 254712369947"
//                 value={formData.paybill_number}
//                 onChange={(e) => handleInputChange('paybill_number', e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_number_mpesa">Account Number</Label>
//               <Input
//                 id="account_number_mpesa"
//                 placeholder="e.g. ABC124"
//                 value={formData.account_number}
//                 onChange={(e) => handleInputChange('account_number', e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_name_mpesa">Account Name</Label>
//               <Input
//                 id="account_name_mpesa"
//                 placeholder="e.g. John Doe"
//                 value={formData.account_name}
//                 onChange={(e) => handleInputChange('account_name', e.target.value)}
//               />
//             </div>
//           </TabsContent>
//         </Tabs>

//         <div className="flex justify-end space-x-2 pt-4">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={createAccount.isPending}>
//             {createAccount.isPending ? 'Adding...' : 'Add account'}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddAccountModal;



 
// //src/components/add-account-modal.tsx
//   import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useCreateAccount } from '@/hooks/useAccounts';
// import { useToast } from '@/hooks/use-toast';
// import { supabase } from '@/lib/supabase'; // Add this import

// interface AddAccountModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const AddAccountModal: React.FC<AddAccountModalProps> = ({ open, onOpenChange }) => {
//   const [activeTab, setActiveTab] = useState<'bank' | 'mpesa'>('bank');
//   const [formData, setFormData] = useState({
//     account_name: '',
//     account_type: 'Business Account',
//     account_number: '',
//     bank_name: '',
//     branch_code: '',
//     paybill_number: '',
//     mpesa_account_type: 'Personal',
//     balance: 0,
//     status: 'Active' as const,
//   });

//   const createAccount = useCreateAccount();
//   const { toast } = useToast();

//   const handleInputChange = (field: string, value: string | number) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

// const handleSubmit = async () => {
//   try {
//     // 1. Get current authenticated user
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
//     if (authError || !user) {
//       throw new Error('Authentication failed. Please log in again.');
//     }

//     // 2. Prepare complete data with user_id
//     const accountData = {
//       user_id: user.id,  // Critical for RLS policy
//       account_name: formData.account_name.trim(),
//       account_type: activeTab === 'bank' ? formData.account_type : formData.mpesa_account_type,
//       account_number: formData.account_number.trim(),
//       balance: Number(formData.balance),
//       status: formData.status,
//       // Handle all fields explicitly
//       bank_name: activeTab === 'bank' ? formData.bank_name.trim() : null,
//       branch_code: activeTab === 'bank' ? formData.branch_code.trim() : null,
//       paybill_number: activeTab === 'mpesa' ? formData.paybill_number.trim() : null,
//       created_at: new Date().toISOString()  // If your table requires this
//     };

//     console.log('Submitting:', accountData);

//     // 3. Execute the mutation
//     const result = await createAccount.mutateAsync(accountData);
    
//     // 4. Handle success
//     toast({ title: 'Success', description: 'Account created!' });
//     onOpenChange(false);
    
//     // 5. Reset form
//     setFormData({
//       account_name: '',
//       account_type: 'Business Account',
//       account_number: '',
//       bank_name: '',
//       branch_code: '',
//       paybill_number: '',
//       mpesa_account_type: 'Personal',
//       balance: 0,
//       status: 'Active',
//     });

//   } catch (error) {
//     console.error('Detailed error:', {
//       message: error.message,
//       code: error.code,  // Supabase error code
//       details: error.details,
//       hint: error.hint
//     });

//     toast({
//       title: 'Error',
//       description: error.message || 'Failed to create account',
//       variant: 'destructive'
//     });
//   }
// };


// return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New Account</DialogTitle>
//           <DialogDescription>
//             Add your bank account or M-Pesa details to receive payments.
//           </DialogDescription>
//         </DialogHeader>

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="bank">Bank</TabsTrigger>
//             <TabsTrigger value="mpesa">M-pesa</TabsTrigger>
//           </TabsList>

//           <TabsContent value="bank" className="space-y-4">
//             <div>
//               <Label htmlFor="bank_name">Bank Name</Label>
//               <Input
//                 id="bank_name"
//                 placeholder="e.g. Equity"
//                 value={formData.bank_name}
//                 onChange={(e) => handleInputChange('bank_name', e.target.value)} required
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_type">Account Type</Label>
//               <select
//                 id="account_type"
//                 className="w-full p-2 border rounded-md"
//                 value={formData.account_type}
//                 onChange={(e) => handleInputChange('account_type', e.target.value)} required
//               >
//                 <option value="Current Account">Current Account</option>
//                 <option value="Business Account">Business Account</option>
//                 <option value="Savings Account">Savings Account</option>
//               </select>
//             </div>

//             <div>
//               <Label htmlFor="account_name">Account Name</Label>
//               <Input
//                 id="account_name"
//                 placeholder="e.g. John Doe"
//                 value={formData.account_name}
//                 onChange={(e) => handleInputChange('account_name', e.target.value)} required
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_number">Account Number</Label>
//               <Input
//                 id="account_number"
//                 value={formData.account_number}
//                 onChange={(e) => handleInputChange('account_number', e.target.value)} required
//               />
//             </div>

//             {/* <div>
//               <Label htmlFor="branch_code">Branch Code (optional)</Label>
//               <Input
//                 id="branch_code"
//                 value={formData.branch_code}
//                 onChange={(e) => handleInputChange('branch_code', e.target.value)}
//               />
//             </div> */}
//           </TabsContent>

//           <TabsContent value="mpesa" className="space-y-4">
//             <div>
//               <Label>M-pesa Account Type</Label>
//               <div className="space-y-2 mt-2">
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="mpesa_type"
//                     value="Personal"
//                     checked={formData.mpesa_account_type === 'Personal'}
//                     onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
//                     className="mr-2"
//                   />
//                   Personal(Phone Number)
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="mpesa_type"
//                     value="Dedicated Paybill"
//                     checked={formData.mpesa_account_type === 'Dedicated Paybill'}
//                     onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
//                     className="mr-2"
//                   />
//                   Dedicated Paybill
//                 </label>
//                 <label className="flex items-center">
//                   <input
//                     type="radio"
//                     name="mpesa_type"
//                     value="Shared Paybill"
//                     checked={formData.mpesa_account_type === 'Shared Paybill'}
//                     onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
//                     className="mr-2"
//                   />
//                   Shared Paybill
//                 </label>
//               </div>
//             </div>

//             <div>
//               <Label htmlFor="paybill_number">Paybill Number</Label>
//               <Input
//                 id="paybill_number"
//                 placeholder="e.g. 254712369947"
//                 value={formData.paybill_number}
//                 onChange={(e) => handleInputChange('paybill_number', e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_number_mpesa">Account Number</Label>
//               <Input
//                 id="account_number_mpesa"
//                 placeholder="e.g. ABC124"
//                 value={formData.account_number}
//                 onChange={(e) => handleInputChange('account_number', e.target.value)}
//               />
//             </div>

//             <div>
//               <Label htmlFor="account_name_mpesa">Account Name</Label>
//               <Input
//                 id="account_name_mpesa"
//                 placeholder="e.g. John Doe"
//                 value={formData.account_name}
//                 onChange={(e) => handleInputChange('account_name', e.target.value)}
//               />
//             </div>
//           </TabsContent>
//         </Tabs>

//         <div className="flex justify-end space-x-2 pt-4">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={createAccount.isPending}>
//             {createAccount.isPending ? 'Adding...' : 'Add account'}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );

// };

// export default AddAccountModal;


import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCreateAccount } from '@/hooks/useAccounts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface AddAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ open, onOpenChange }) => {
  const [activeTab, setActiveTab] = useState<'bank' | 'mpesa'>('bank');
  const [formData, setFormData] = useState({
    account_name: '',
    account_type: 'Business Account',
    account_number: '',
    bank_name: '',
    branch_code: '',
    paybill_number: '',
    mpesa_account_type: 'Personal',
    balance: 0,
    status: 'Active' as const,
  });

  const createAccount = useCreateAccount();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.account_name.trim()) {
      toast({ title: 'Error', description: 'Account name is required', variant: 'destructive' });
      return false;
    }
    if (!formData.account_number.trim()) {
      toast({ title: 'Error', description: 'Account number is required', variant: 'destructive' });
      return false;
    }
    if (formData.account_number.length !== 16) {
      toast({ title: 'Error', description: 'Account number must be exactly 16 digits', variant: 'destructive' });
      return false;
    }
    if (activeTab === 'bank' && !formData.bank_name.trim()) {
      toast({ title: 'Error', description: 'Bank name is required', variant: 'destructive' });
      return false;
    }
    if (activeTab === 'mpesa' && !formData.paybill_number.trim()) {
      toast({ title: 'Error', description: 'Paybill number is required', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('Authentication failed. Please log in again.');
      }

      const accountData = {
        user_id: user.id,
        account_name: formData.account_name.trim(),
        account_type: activeTab === 'bank' ? formData.account_type : formData.mpesa_account_type,
        account_number: formData.account_number.trim(),
        balance: Number(formData.balance),
        status: formData.status,
        bank_name: activeTab === 'bank' ? formData.bank_name.trim() : null,
        branch_code: activeTab === 'bank' ? formData.branch_code.trim() : null,
        paybill_number: activeTab === 'mpesa' ? formData.paybill_number.trim() : null,
        created_at: new Date().toISOString()
      };

      await createAccount.mutateAsync(accountData);
      
      toast({ title: 'Success', description: 'Account created successfully!' });
      onOpenChange(false);
      
      setFormData({
        account_name: '',
        account_type: 'Business Account',
        account_number: '',
        bank_name: '',
        branch_code: '',
        paybill_number: '',
        mpesa_account_type: 'Personal',
        balance: 0,
        status: 'Active',
      });

    } catch (error: any) {
      console.error('Error creating account:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Channel</DialogTitle>
          <DialogDescription>
            Add your bank account or M-Pesa details to receive payments.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bank">Bank</TabsTrigger>
            <TabsTrigger value="mpesa">M-pesa</TabsTrigger>
          </TabsList>

          <TabsContent value="bank" className="space-y-4">
            <div>
              <Label htmlFor="bank_name">Bank Name *</Label>
              <Input
                id="bank_name"
                placeholder="e.g. Equity"
                value={formData.bank_name}
                onChange={(e) => handleInputChange('bank_name', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="account_type">Account Type *</Label>
              <select
                id="account_type"
                className="w-full p-2 border rounded-md"
                value={formData.account_type}
                onChange={(e) => handleInputChange('account_type', e.target.value)}
                required
              >
                <option value="Current Account">Current Account</option>
                <option value="Business Account">Business Account</option>
                <option value="Savings Account">Savings Account</option>
              </select>
            </div>

            <div>
              <Label htmlFor="account_name">Account Name *</Label>
              <Input
                id="account_name"
                placeholder="e.g. John Doe"
                value={formData.account_name}
                onChange={(e) => handleInputChange('account_name', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="account_number">Account Number * (16 digits)</Label>
              <Input
                id="account_number"
                placeholder="1234567890123456"
                value={formData.account_number}
                onChange={(e) => {
                  // Only allow numbers and limit to 16 characters
                  const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                  handleInputChange('account_number', value);
                }}
                maxLength={16}
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.account_number.length}/16 digits
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mpesa" className="space-y-4">
            <div>
              <Label>M-pesa Account Type *</Label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mpesa_type"
                    value="Personal"
                    checked={formData.mpesa_account_type === 'Personal'}
                    onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
                    className="mr-2"
                  />
                  Personal(Phone Number)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mpesa_type"
                    value="Dedicated Paybill"
                    checked={formData.mpesa_account_type === 'Dedicated Paybill'}
                    onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
                    className="mr-2"
                  />
                  Dedicated Paybill
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mpesa_type"
                    value="Shared Paybill"
                    checked={formData.mpesa_account_type === 'Shared Paybill'}
                    onChange={(e) => handleInputChange('mpesa_account_type', e.target.value)}
                    className="mr-2"
                  />
                  Shared Paybill
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="paybill_number">Paybill Number *</Label>
              <Input
                id="paybill_number"
                placeholder="e.g. 254712369947"
                value={formData.paybill_number}
                onChange={(e) => handleInputChange('paybill_number', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="account_number_mpesa">Account Number * (16 digits)</Label>
              <Input
                id="account_number_mpesa"
                placeholder="1234567890123456"
                value={formData.account_number}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                  handleInputChange('account_number', value);
                }}
                maxLength={16}
                required
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.account_number.length}/16 digits
              </div>
            </div>

            <div>
              <Label htmlFor="account_name_mpesa">Account Name *</Label>
              <Input
                id="account_name_mpesa"
                placeholder="e.g. John Doe"
                value={formData.account_name}
                onChange={(e) => handleInputChange('account_name', e.target.value)}
                required
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={createAccount.isPending}>
            {createAccount.isPending ? 'Adding...' : 'Add Channel'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountModal;
