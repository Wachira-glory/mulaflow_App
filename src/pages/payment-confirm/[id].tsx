import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_ANON_KEY");

export default function PaymentConfirm() {
  const router = useRouter();
  const { id } = router.query;

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPayment = async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Invalid payment link or payment not found.");
        router.push("/");
        return;
      }

      setPayment(data);
      setLoading(false);
    };

    fetchPayment();
  }, [id, router]);

  const handleConfirmPayment = async () => {
    setConfirming(true);

    const { error } = await supabase
      .from("payments")
      .update({ status: "completed" })
      .eq("id", id);

    setConfirming(false);

    if (error) {
      alert("Failed to confirm payment, please try again.");
      return;
    }

    setConfirmed(true);
  };

  if (loading) return <p>Loading...</p>;

  if (confirmed) {
    return (
      <div className="max-w-md mx-auto text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Confirmed!</h2>
        <p>Thank you, {payment.customer_name}.</p>
        <p>
          Your payment of KES {payment.amount} for "{payment.purpose_of_bill}" has
          been successfully received.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow">
      <img
        src="/your-payment-image.png" // Replace this with your actual image path
        alt="Payment"
        className="mb-4 mx-auto"
      />
      <h1 className="text-xl font-semibold mb-2">Hello, {payment.customer_name}!</h1>
      <p className="mb-2">
        Purpose of Bill: <strong>{payment.purpose_of_bill}</strong>
      </p>
      <p className="mb-2">
        Amount to Pay: <strong>KES {payment.amount}</strong>
      </p>
      <p className="mb-4">
        Pay to M-Pesa Till Number: <strong>{payment.mpesa_till}</strong>
      </p>
      <p className="mb-4">
        Please complete the payment manually via M-Pesa to the above till number.
      </p>
      <button
        onClick={handleConfirmPayment}
        disabled={confirming}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {confirming ? "Confirming..." : "Confirm Payment"}
      </button>
    </div>
  );
}
