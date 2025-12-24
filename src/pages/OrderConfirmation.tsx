import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiCheckCircle, FiTruck, FiHome } from 'react-icons/fi';

const OrderConfirmation: React.FC = () => {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || '123456';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className={`p-12 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="w-24 h-24 mx-auto mb-8 bg-green-500 rounded-full flex items-center justify-center">
            <FiCheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-xl mb-8">Thank you for your purchase. Your order has been successfully placed.</p>
          <div className="mb-8">
            <p className="text-lg mb-2">Order Number: <span className="font-semibold">#{orderId}</span></p>
            <p className="text-lg">You will receive an email confirmation shortly.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <FiTruck size={32} className="mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Shipping</h3>
              <p className="text-lg">Estimated delivery: 3-5 business days</p>
            </div>
            <div className="text-center">
              <FiHome size={32} className="mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Track Order</h3>
              <p className="text-lg">Check your email for tracking information</p>
            </div>
          </div>
          <div className="space-x-4">
            <Link
              to="/"
              className={`inline-flex items-center px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
                theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <FiHome className="mr-2" />
              Continue Shopping
            </Link>
            <Link
              to="/cart"
              className={`inline-flex items-center px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
                theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;