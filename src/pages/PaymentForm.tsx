import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clientSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setErrorMessage("Stripe has not loaded yet.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 rounded-lg bg-white dark:bg-gray-800 shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold">Payment</h2>

      <PaymentElement />

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-3 bg-black text-black rounded-lg font-bold disabled:opacity-50"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default PaymentForm;
