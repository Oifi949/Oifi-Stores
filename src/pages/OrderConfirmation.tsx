import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Confetti from "react-confetti";
import { FiCheckCircle, FiTruck, FiHome } from "react-icons/fi";

const OrderConfirmation: React.FC = () => {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "123456";
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center px-4">
      {" "}
      {showConfetti && <Confetti />}{" "}
      <div
        className={`w-full max-w-2xl p-10 rounded-2xl shadow-xl transition-colors ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {" "}
        {/* Success Icon */}{" "}
        <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
          {" "}
          <FiCheckCircle size={56} className="text-white" />{" "}
        </div>{" "}
        {/* Title & Message */}{" "}
        <h1 className="text-4xl font-extrabold mb-4 text-green-600 dark:text-green-400">
          {" "}
          Order Confirmed!{" "}
        </h1>{" "}
        <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
          {" "}
          Thank you for your purchase. Your order has been successfully placed.{" "}
        </p>{" "}
        {/* Order Info */}{" "}
        <div className="mb-8 bg-gray-100 text-black dark:bg-gray-700 rounded-lg p-4">
          {" "}
          <p className="text-lg mb-2">
            {" "}
            Order Number: <span className="font-semibold">#{orderId}</span>{" "}
          </p>{" "}
          <p className="text-lg">
            You will receive an email confirmation shortly.
          </p>{" "}
        </div>{" "}
        {/* Shipping & Tracking */}{" "}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {" "}
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow">
            {" "}
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
              {" "}
              <FiTruck
                size={28}
                className="text-blue-600 dark:text-blue-400"
              />{" "}
            </div>{" "}
            <h3 className="text-xl font-semibold mb-1 text-black">Shipping</h3>{" "}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {" "}
              Estimated delivery: 3-5 business days{" "}
            </p>{" "}
          </div>{" "}
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow">
            {" "}
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-full">
              {" "}
              <FiHome
                size={28}
                className="text-green-600 dark:text-green-400"
              />{" "}
            </div>{" "}
            <h3 className="text-xl font-semibold mb-1 text-black">
              Track Order
            </h3>{" "}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {" "}
              Check your email for tracking information{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Buttons */}{" "}
        <div className="flex justify-center gap-4">
          {" "}
          <Link
            to="/"
            className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium shadow transition-transform transform hover:scale-105 ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {" "}
            <FiHome className="mr-2" /> Continue Shopping{" "}
          </Link>{" "}
          <Link
            to="/cart"
            className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-medium shadow transition-transform transform hover:scale-105 ${
              theme === "dark"
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-900"
            }`}
          >
            {" "}
            View Cart{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default OrderConfirmation;
