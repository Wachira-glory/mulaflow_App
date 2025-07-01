// // src/pages/DisbursementConfirmPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '@/lib/supabase';
// import { toast } from 'sonner';
// import { Button } from '@/components/ui/button';
// import { DollarSign, CheckCircle } from 'lucide-react'; // Example icons

// interface PaymentDetails {
//   id: string;
//   amount: number;
//   purpose: string;
//   recipient_name: string;
//   recipient_phone: string;
//   status: 'completed' | 'pending' | 'failed';
//   // Add other fields you might need to display from the payment record
// }

// const DisbursementConfirmPage: React.FC = () => {
//   const { paymentId } = useParams<{ paymentId: string }>();
//   const navigate = useNavigate();
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [confirmationLoading, setConfirmationLoading] = useState(false);
//   const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       if (!paymentId) {
//         toast.error('Invalid disbursement link.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const { data, error } = await supabase
//           .from('payments')
//           .select('id, amount, purpose, recipient_name, recipient_phone, status, paybill, uid') // Select relevant fields
//           .eq('id', paymentId)
//           .eq('category', 'outbound') // Ensure it's an outbound payment
//           .single();

//         if (error) {
//           console.error('Error fetching payment details:', error.message);
//           toast.error('Failed to load disbursement details.');
//           setLoading(false);
//           return;
//         }

//         if (data) {
//           setPaymentDetails(data as PaymentDetails);
//           if (data.status === 'completed') {
//             setShowConfirmationMessage(true);
//           }
//         } else {
//           toast.error('Disbursement not found or invalid.');
//         }
//       } catch (err) {
//         console.error('Unexpected error fetching payment details:', err);
//         toast.error('An unexpected error occurred.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentDetails();
//   }, [paymentId]);

//   const handleConfirmPayment = async () => {
//     if (!paymentDetails || paymentDetails.status === 'completed') {
//       toast.info('This payment has already been confirmed or is invalid.');
//       return;
//     }

//     setConfirmationLoading(true);
//     try {
//       // Here, you would ideally integrate with an actual disbursement API
//       // For this example, we'll just update the status in Supabase.
//       // In a real scenario, this would trigger the actual money transfer.

//       const { error } = await supabase
//         .from('payments')
//         .update({ status: 'completed', txn_id: `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}` }) // Mark as completed
//         .eq('id', paymentId);

//       if (error) {
//         console.error('Error confirming payment:', error.message);
//         toast.error(`Failed to confirm payment: ${error.message}`);
//       } else {
//         setPaymentDetails(prev => prev ? { ...prev, status: 'completed' } : null); // Update local state
//         setShowConfirmationMessage(true);
//         toast.success('Payment confirmed successfully!');
//       }
//     } catch (err) {
//       console.error('Unexpected error during payment confirmation:', err);
//       toast.error('An unexpected error occurred during confirmation.');
//     } finally {
//       setConfirmationLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <p>Loading disbursement details...</p>
//       </div>
//     );
//   }

//   if (!paymentDetails) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">
//         <p>Disbursement details could not be loaded. The link might be invalid.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
//         {/* Your image here */}
//         <img
//           src="/path/to/your/logo.png" // Replace with the actual path to your logo/image
//           alt="Company Logo"
//           className="mx-auto mb-6 w-32 h-auto"
//         />

//         {showConfirmationMessage ? (
//           <div className="text-center text-green-600">
//             <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
//             <h2 className="text-3xl font-bold mb-4">Payment Confirmed!</h2>
//             <p className="text-lg text-gray-700">The disbursement has been successfully processed.</p>
//             <p className="mt-4 text-sm text-gray-500">Thank you.</p>
//           </div>
//         ) : (
//           <>
//             <h1 className="text-2xl font-bold mb-4 text-gray-800">Disbursement Details</h1>
//             <p className="text-lg text-gray-700 mb-4">Hello, {paymentDetails.recipient_name || 'Recipient'}!</p>

//             <div className="space-y-3 text-left mb-6">
//               <p className="text-md text-gray-600"><strong>Purpose:</strong> {paymentDetails.purpose || 'General Disbursement'}</p>
//               <p className="text-md text-gray-600"><strong>Amount:</strong> Ksh {paymentDetails.amount.toLocaleString()}</p>
//               <p className="text-md text-gray-600"><strong>Recipient Phone:</strong> {paymentDetails.recipient_phone}</p>
//               {/* You might want to display the channel if relevant */}
//               {/* <p className="text-md text-gray-600"><strong>Channel:</strong> {paymentDetails.channel || 'N/A'}</p> */}
//               <p className="text-md text-gray-600"><strong>Status:</strong> <span className={`font-semibold ${paymentDetails.status === 'pending' ? 'text-yellow-600' : 'text-gray-600'}`}>{paymentDetails.status.charAt(0).toUpperCase() + paymentDetails.status.slice(1)}</span></p>
//             </div>

//             <p className="text-md text-red-600 mb-6 font-semibold">
//               Please ensure you have received the money before clicking "Confirm Payment".
//             </p>

//             <Button
//               onClick={handleConfirmPayment}
//               className="bg-blue-700 hover:bg-blue-800 text-white w-full py-3 text-lg"
//               disabled={confirmationLoading || paymentDetails.status === 'completed'}
//             >
//               <DollarSign className="mr-2 h-5 w-5" />
//               {confirmationLoading ? 'Confirming...' : 'Confirm Payment Received'}
//             </Button>
//             {paymentDetails.status === 'completed' && (
//               <p className="mt-4 text-green-600 font-semibold">This payment has already been confirmed.</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DisbursementConfirmPage;


// // src/pages/DisbursementConfirmPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '@/lib/supabase';
// import { toast } from 'sonner';
// import { Button } from '@/components/ui/button';
// import { Loader2 } from 'lucide-react'; // For loading spinner

// interface PaymentDetails {
//   id: string;
//   amount: number;
//   category: string;
//   status: 'completed' | 'pending' | 'failed';
//   created_at: string;
//   reference: string;
//   uid: string; // Recipient name for outbound
//   purpose?: string;
//   recipient_phone?: string;
//   recipient_name?: string;
//   disbursement_link?: string;
//   channels: {
//     name: string;
//   } | null;
//   // Add metadata or other relevant fields if you store them
//   metadata?: {
//     type?: string;
//     recipientName?: string;
//     amount?: number;
//     purpose?: string;
//     recipientPhone?: string;
//     channel?: string;
//     // Add other metadata fields you pass from the client or edge function
//   };
// }

// const DisbursementConfirmPage: React.FC = () => {
//   const { paymentId } = useParams<{ paymentId: string }>();
//   const navigate = useNavigate();
//   const [payment, setPayment] = useState<PaymentDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [confirmingPayment, setConfirmingPayment] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Placeholder for your image
//   const confirmationImage = 'https://via.placeholder.com/600x400?text=Disbursement+Confirmation'; // Replace with your actual image URL

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       if (!paymentId) {
//         setError('Payment ID is missing.');
//         setLoading(false);
//         return;
//       }
//       try {
//         const { data, error: fetchError } = await supabase
//           .from('payments')
//           .select(`
//             *,
//             channels ( name )
//           `)
//           .eq('id', paymentId)
//           .single();

//         if (fetchError) {
//           console.error('Error fetching payment details:', fetchError.message);
//           setError(`Failed to load payment details: ${fetchError.message}`);
//           setPayment(null); // Ensure payment is null on error
//         } else if (data) {
//           setPayment(data as PaymentDetails);
//         } else {
//           setError('Payment details not found.');
//           setPayment(null); // Ensure payment is null if no data
//         }
//       } catch (err: any) {
//         console.error('Unexpected error fetching payment details:', err.message);
//         setError(`An unexpected error occurred: ${err.message}`);
//         setPayment(null); // Ensure payment is null on unexpected error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPaymentDetails();
//   }, [paymentId]);

//   const handleConfirmDisbursement = async () => {
//     if (!payment) {
//       toast.error('No payment details to confirm.');
//       return;
//     }
//     if (payment.status === 'completed') {
//       toast.info('This disbursement has already been confirmed.');
//       return;
//     }

//     setConfirmingPayment(true);
//     try {
//       // Step 1: Trigger the actual B2C M-Pesa disbursement via an Edge Function
//       const { data, error } = await supabase.functions.invoke('trigger-b2c-disbursement', {
//         body: {
//           paymentId: payment.id,
//           recipientPhone: payment.recipient_phone,
//           amount: payment.amount,
//           // You might pass other details needed by your M-Pesa B2C API
//           purpose: payment.purpose || payment.metadata?.purpose || 'Disbursement',
//         }
//       });

//       if (error) {
//         console.error('B2C Disbursement Edge Function error:', error);
//         toast.error(`Disbursement failed: ${error.message || 'Unknown error'}`);
//         // Optionally update payment status to 'failed' in DB if the B2C call fails immediately
//          await supabase.from('payments').update({ status: 'failed' }).eq('id', payment.id);
//       } else if (data?.success) {
//         toast.success('Disbursement initiated! Please wait for confirmation.');
//         // The status update to 'completed' or 'failed' should happen via M-Pesa webhook
//         // For immediate feedback, you might update locally to 'pending_b2c'
//         setPayment(prev => prev ? { ...prev, status: 'pending' } : null); // Keep as pending until webhook confirmation
//       } else {
//         toast.error(`Disbursement failed: ${data?.message || 'Unknown reason from Edge Function.'}`);
//          await supabase.from('payments').update({ status: 'failed' }).eq('id', payment.id);
//       }
//     } catch (err: any) {
//       console.error('Error confirming disbursement:', err);
//       toast.error(`An unexpected error occurred: ${err.message}`);
//        await supabase.from('payments').update({ status: 'failed' }).eq('id', payment.id);
//     } finally {
//       setConfirmingPayment(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//         <p className="ml-2 text-gray-700">Loading disbursement details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
//         <p className="text-red-600 text-lg mb-4">Error: {error}</p>
//         <Button onClick={() => navigate('/')}>Go to Home</Button>
//       </div>
//     );
//   }

//   if (!payment) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
//         <p className="text-gray-700 text-lg mb-4">Disbursement not found or invalid link.</p>
//         <Button onClick={() => navigate('/')}>Go to Home</Button>
//       </div>
//     );
//   }

//   // Determine the name to display (prefer recipient_name, then uid, then a fallback)
//   const customerName = payment.recipient_name || payment.uid || 'Customer';

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
//       <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Disbursement Details</h1>

//         <img src={confirmationImage} alt="Disbursement Confirmation" className="w-full h-auto rounded-md mb-6" />

//         <p className="text-lg text-gray-700 mb-2">Hello, <span className="font-semibold">{customerName}</span>!</p>
//         <p className="text-md text-gray-600 mb-1">
//           You are about to receive a payment for the following purpose:
//         </p>
//         <p className="text-2xl font-bold text-blue-600 mb-4">
//           {payment.purpose || payment.metadata?.purpose || 'General Disbursement'}
//         </p>

//         <div className="grid grid-cols-2 gap-4 text-left mb-6">
//           <div>
//             <p className="text-sm text-gray-500">Amount:</p>
//             <p className="text-lg font-semibold text-gray-800">KES {payment.amount.toLocaleString()}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">To Phone:</p>
//             <p className="text-lg font-semibold text-gray-800">{payment.recipient_phone || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Channel:</p>
//             <p className="text-lg font-semibold text-gray-800">{payment.channels?.name || payment.metadata?.channel || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Status:</p>
//             <p className={`text-lg font-semibold ${payment.status === 'completed' ? 'text-green-600' : payment.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
//               {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//             </p>
//           </div>
//         </div>

//         <p className="text-gray-700 mb-6">
//           Please ensure you have paid the money to the indicated M-Pesa Till before confirming.
//         </p>

//         <Button
//           onClick={handleConfirmDisbursement}
//           disabled={confirmingPayment || payment.status === 'completed'}
//           className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-md transition duration-300"
//         >
//           {confirmingPayment ? (
//             <>
//               <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Confirming...
//             </>
//           ) : payment.status === 'completed' ? (
//             'Disbursement Completed'
//           ) : (
//             'Confirm Payment'
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default DisbursementConfirmPage;




import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react'; // For loading spinner

interface PaymentDetails {
  id: string;
  amount: number;
  category: string;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  reference: string;
  uid: string; // Recipient name for outbound
  purpose?: string;
  recipient_phone?: string;
  recipient_name?: string;
  disbursement_link?: string;
  channels: {
    name: string;
  } | null;
  // Add metadata or other relevant fields if you store them
  metadata?: {
    type?: string;
    recipientName?: string;
    amount?: number;
    purpose?: string;
    recipientPhone?: string;
    channel?: string;
    // Add other metadata fields you pass from the client or edge function
  };
}

const DisbursementConfirmPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder for your image - REPLACE WITH YOUR ACTUAL IMAGE URL
  const confirmationImage = 'YOUR_ACTUAL_IMAGE_URL_HERE'; // <<< IMPORTANT: Update this URL

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!paymentId) {
        setError('Payment ID is missing.');
        setLoading(false);
        return;
      }
      try {
        const { data, error: fetchError } = await supabase
          .from('payments')
          .select(`
            *,
            channels ( name )
          `)
          .eq('id', paymentId)
          .single();

        if (fetchError) {
          console.error('Error fetching payment details:', fetchError.message);
          setError(`Failed to load payment details: ${fetchError.message}`);
          setPayment(null); // Ensure payment is null on error
        } else if (data) {
          setPayment(data as PaymentDetails);
        } else {
          setError('Payment details not found.');
          setPayment(null); // Ensure payment is null if no data
        }
      } catch (err: any) {
        console.error('Unexpected error fetching payment details:', err.message);
        setError(`An unexpected error occurred: ${err.message}`);
        setPayment(null); // Ensure payment is null on unexpected error
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
    // Set up real-time listener for payment status changes
    const paymentChannel = supabase
      .channel(`payments_status_change:${paymentId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'payments', filter: `id=eq.${paymentId}` },
        (payload) => {
          console.log('Realtime update received:', payload);
          const updatedPayment = payload.new as PaymentDetails;
          setPayment(updatedPayment);
          if (updatedPayment.status === 'completed') {
            toast.success('Disbursement has been successfully completed!');
          } else if (updatedPayment.status === 'failed') {
            toast.error('Disbursement failed!');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(paymentChannel);
    };

  }, [paymentId]); // Add paymentId to dependency array for useEffect


  const handleConfirmDisbursement = async () => {
    if (!payment) {
      toast.error('No payment details to confirm.');
      return;
    }
    if (payment.status === 'completed') {
      toast.info('This disbursement has already been completed.');
      return;
    }
    // You might want to prevent re-triggering if it's already pending B2C
    if (payment.status === 'pending') {
      toast.info('Disbursement is already pending, awaiting M-Pesa confirmation.');
      return;
    }


    setConfirmingPayment(true);
    try {
      // Step 1: Trigger the actual B2C M-Pesa disbursement via an Edge Function
      const { data, error } = await supabase.functions.invoke('trigger-b2c-disbursement', {
        body: {
          paymentId: payment.id,
          recipientPhone: payment.recipient_phone,
          amount: payment.amount,
          // You might pass other details needed by your M-Pesa B2C API
          purpose: payment.purpose || payment.metadata?.purpose || 'Disbursement',
        }
      });

      if (error) {
        console.error('B2C Disbursement Edge Function error:', error);
        toast.error(`Disbursement failed: ${error.message || 'Unknown error'}`);
        // Optionally update payment status to 'failed' in DB if the B2C call fails immediately
         await supabase.from('payments').update({ status: 'failed' }).eq('id', payment.id);
         setPayment(prev => prev ? { ...prev, status: 'failed' } : null); // Update local state immediately
      } else if (data?.success) {
        toast.success('Disbursement initiated! Please wait for confirmation.');
        // The status update to 'completed' or 'failed' should happen via M-Pesa webhook
        // For immediate feedback, you might update locally to 'pending_b2c'
        // Setting it to 'pending' as it's the next logical step after initiation, awaiting external confirmation.
        setPayment(prev => prev ? { ...prev, status: 'pending' } : null);
      } else {
        toast.error(`Disbursement failed: ${data?.message || 'Unknown reason from Edge Function.'}`);
         await supabase.from('payments').update({ status: 'failed' }).eq('id', payment.id);
         setPayment(prev => prev ? { ...prev, status: 'failed' } : null); // Update local state immediately
      }
    } catch (err: any) {
      console.error('Error confirming disbursement:', err);
      toast.error(`An unexpected error occurred: ${err.message}`);
       await supabase.from('payments').update({ status: 'failed' }).eq('id', payment.id);
       setPayment(prev => prev ? { ...prev, status: 'failed' } : null); // Update local state immediately
    } finally {
      setConfirmingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2 text-gray-700">Loading disbursement details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
        <p className="text-red-600 text-lg mb-4">Error: {error}</p>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
        <p className="text-gray-700 text-lg mb-4">Disbursement not found or invalid link.</p>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }

  // Determine the name to display (prefer recipient_name, then uid, then a fallback)
  const customerName = payment.recipient_name || payment.uid || 'Recipient'; // Changed from Customer to Recipient for clarity in outbound

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Disbursement Details</h1>

        <img src={confirmationImage} alt="Disbursement Confirmation" className="w-full h-auto rounded-md mb-6" />

        <p className="text-lg text-gray-700 mb-2">Hello, <span className="font-semibold">{customerName}</span>!</p>
        <p className="text-md text-gray-600 mb-1">
          You are about to send a payment for the following purpose:
        </p>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {payment.purpose || payment.metadata?.purpose || 'General Disbursement'}
        </p>

        <div className="grid grid-cols-2 gap-4 text-left mb-6">
          <div>
            <p className="text-sm text-gray-500">Amount:</p>
            <p className="text-lg font-semibold text-gray-800">KES {payment.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">To Phone:</p>
            <p className="text-lg font-semibold text-gray-800">{payment.recipient_phone || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Channel:</p>
            <p className="text-lg font-semibold text-gray-800">{payment.channels?.name || payment.metadata?.channel || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status:</p>
            <p className={`text-lg font-semibold ${payment.status === 'completed' ? 'text-green-600' : payment.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </p>
          </div>
        </div>

        {/* Changed text to reflect sender initiating B2C, removed 'M-Pesa Till' reference */}
        <p className="text-gray-700 mb-6">
          Click 'Confirm Disbursement' to initiate the money transfer to {customerName}'s phone number.
        </p>

        <Button
          onClick={handleConfirmDisbursement}
          disabled={confirmingPayment || payment.status === 'completed' || payment.status === 'pending'} // Disable if already pending
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-md transition duration-300"
        >
          {confirmingPayment ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Initiating Transfer...
            </>
          ) : payment.status === 'completed' ? (
            'Disbursement Completed'
          ) : payment.status === 'pending' ? (
            'Disbursement Pending (Awaiting Confirmation)'
          ) : (
            'Confirm Disbursement'
          )}
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          The payment status will update automatically once the transfer is confirmed by the payment channel.
        </p>
      </div>
    </div>
  );
};

export default DisbursementConfirmPage;