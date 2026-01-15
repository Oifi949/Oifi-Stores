import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { BiCheckCircle } from "react-icons/bi";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // ✅ Clear only the cart from localStorage
    localStorage.removeItem("cart");

    const updateSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const amount = searchParams.get("amount");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 relative">
      <Confetti width={windowSize.width} height={windowSize.height} />
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center z-10 relative">
        <BiCheckCircle className="h-16 w-16 text-green-500 mx-auto animate-bounce" />
        <h1 className="text-2xl font-bold mt-4 text-gray-800">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. {amount ? `Your order of $${amount} has been confirmed.` : "Your order has been confirmed."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
