import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { FiArrowLeft } from "react-icons/fi";
import { useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import ConvertToSubcurrency from "../lib/ConvertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const amount = 1000;
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const { state, dispatch } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { items, total } = state;
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/create-payment-intent`;
      console.log("import.meta.env.VITE_BACKEND_URL");
      console.log(import.meta.env.VITE_BACKEND_URL);
      console.log("url");
      console.log(url);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: ConvertToSubcurrency(amount) }),
        });
        const data = (await res.json()) as { clientSecret: string };

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent:", err);
      }
    };

    createPaymentIntent();
  }, [amount]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    dispatch({ type: "CLEAR_CART" });
    navigate(`/order-confirmation?orderId=${orderId}`);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="absolute! -m-px! h-px! w-px! !overlow-hidden whitespace-nowrap! border-0! p-0! ![clip:rect(0,0,0,0)">
            Loading....
          </span>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/")}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <button
            onClick={() => navigate("/cart")}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors self-start ${
              theme === "dark"
                ? "text-gray-600 hover:text-gray-950 hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            <FiArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-bold">Checkout</h1>
          <div></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="">
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm clientSecret={clientSecret} amount={amount} />
              </Elements>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className={`py-8 rounded-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg sticky top-6`}
            >
              <h3
                className={`text-xl font-bold px-8 mb-4 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Order Summary
              </h3>

              <div className="max-h-50 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex justify-between px-8 text-start items-center py-2 border-b border-gray-200 dark:border-gray-700 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    <span className="text-lg">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="text-lg font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div
                className={`flex justify-between px-8 items-center py-4 text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <span>Total</span>
                <span>${(total + total * 0.08).toFixed(2)}</span>
              </div>
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="w-full bg-blue-500 mx-8 hover:bg-blue-600 text-black py-4 rounded-lg text-lg font-medium transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-lg text-lg font-medium transition-colors ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  } text-black`}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </button>
              )}
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className={`w-full mt-4 py-4 rounded-lg text-lg font-medium transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600 text-black"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  }`}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
