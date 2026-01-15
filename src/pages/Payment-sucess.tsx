// src/pages/Orders.jsx
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function Orders() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "N/A";
  const amount = searchParams.get("amount") || "N/A";

  const statusSteps = ["Order Confirmed", "Processing", "Shipped", "Delivered"];
  const [currentStep, setCurrentStep] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [truckAnimation, setTruckAnimation] = useState(false);
  const [dustFade, setDustFade] = useState(false);

  useEffect(() => {
    if (currentStep < statusSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (currentStep === statusSteps.length - 1) {
      setShowConfetti(true);

      // Wait for box slide-in (2s), then truck drives off
      const truckTimer = setTimeout(() => {
        setTruckAnimation(true);
      }, 2000);

      // Fade dust after truck leaves
      const dustTimer = setTimeout(() => {
        setDustFade(true);
      }, 5000);

      const stopConfetti = setTimeout(() => setShowConfetti(false), 5000);

      return () => {
        clearTimeout(truckTimer);
        clearTimeout(dustTimer);
        clearTimeout(stopConfetti);
      };
    }
  }, [currentStep]);

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 relative">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
        />
      )}

      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Track Your Order
        </h1>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-lg">
            Order{" "}
            <span className="font-semibold text-gray-900">#{orderId}</span>
          </p>
          <p className="mt-2 text-gray-600">
            Amount Paid:{" "}
            <span className="font-semibold text-green-600">${amount}</span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8">
          <div className="flex justify-between mb-2">
            {statusSteps.map((step, index) => (
              <span
                key={step}
                className={`text-xs sm:text-sm font-medium ${
                  index <= currentStep ? "text-green-600" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-green-500 rounded-full transition-all duration-500"
              style={{
                width: `${(currentStep / (statusSteps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Current Status:{" "}
          <span className="font-semibold text-green-600">
            {statusSteps[currentStep]}
          </span>
        </p>

        {/* Truck + Box animation */}
        {currentStep === statusSteps.length - 1 && (
          <div className="mt-6 flex flex-col items-center">
            <div className="truck-scene">
              <div
                className={`truck-container ${truckAnimation ? "drive-off" : ""}`}
              >
                <div className="box">📦</div>
                <div className="truck">🚚</div>
              </div>
              <div className={`dust ${dustFade ? "fade-dust" : ""}`}>💨</div>
            </div>

            <p className="mt-4 text-xl font-sans font-bold text-green-600 animate-bounce">
              Delivered 🎉 Thank you for shopping with us!
            </p>
          </div>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-8 bg-green-500 hover:bg-green-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
