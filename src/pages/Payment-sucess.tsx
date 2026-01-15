import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { BiCheckCircle } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

export default function PaymentSucess() {
  const [searchParams] = useSearchParams();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const amount = searchParams.get("amount");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 relative">
      {/* Confetti */}
      <Confetti width={windowSize.width} height={windowSize.height} />

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center z-10 relative">
        <BiCheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold mt-4 text-gray-800">
          Payment Successful!
        </h1>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your order of ${amount} has been
          confirmed.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}