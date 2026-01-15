import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { dispatch } = useCart();
  const navigate = useNavigate();

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

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // prevents auto-redirect, lets you handle success manually
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // ✅ Clear cart from localStorage
      localStorage.removeItem("cart");

      // ✅ Reset cart state in context
      dispatch({ type: "CLEAR_CART" });

      // ✅ Generate orderId
      const orderId = Math.floor(Math.random() * 1000000);

      // ✅ Navigate to success page
      navigate(`/payment-success?amount=${amount}&orderId=${orderId}`);
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
        className="w-full py-3 bg-green-500 rounded-lg font-bold disabled:opacity-50"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default PaymentForm;
