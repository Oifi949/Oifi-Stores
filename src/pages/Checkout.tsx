import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { FiCreditCard, FiTruck, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

const Checkout: React.FC = () => {
  const { state, dispatch } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { items, total } = state;

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    dispatch({ type: 'CLEAR_CART' });
    navigate(`/order-confirmation?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
              theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-16 px-6">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
          <button
            onClick={() => navigate('/cart')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors self-start ${
              theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <FiArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-bold">Checkout</h1>
          <div></div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              <FiTruck size={24} />
              <span className="text-lg font-medium">Shipping</span>
            </div>
            <div className={`w-1 h-16 sm:w-16 sm:h-1 ${step >= 2 ? 'bg-blue-500' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              <FiCreditCard size={24} />
              <span className="text-lg font-medium">Payment</span>
            </div>
            <div className={`w-1 h-16 sm:w-16 sm:h-1 ${step >= 3 ? 'bg-blue-500' : theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              <FiCheckCircle size={24} />
              <span className="text-lg font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className={`p-10 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        className={`w-full px-4 py-3 rounded-lg text-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        className={`w-full px-4 py-3 rounded-lg text-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-lg font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 rounded-lg text-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className={`w-full px-4 py-3 rounded-lg text-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-lg font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        className={`w-full px-4 py-3 rounded-lg text-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        className={`w-full px-4 py-3 rounded-lg text-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        className={`w-full px-4 py-3 rounded-lg text-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className={`p-10 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={handlePaymentChange}
                      className={`w-full px-4 py-3 rounded-lg text-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 rounded-lg text-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-3 rounded-lg text-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handlePaymentChange}
                        placeholder="123"
                        className={`w-full px-4 py-3 rounded-lg text-lg border ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className={`p-10 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                    <p className="text-lg">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                    <p className="text-lg">{shippingInfo.email}</p>
                    <p className="text-lg">{shippingInfo.address}</p>
                    <p className="text-lg">{shippingInfo.city}, {shippingInfo.zipCode}, {shippingInfo.country}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                    <p className="text-lg">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                    <p className="text-lg">{paymentInfo.nameOnCard}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Order Items</h3>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2">
                        <span className="text-lg">{item.title} x {item.quantity}</span>
                        <span className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg sticky top-6`}>
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-lg">{item.title} x {item.quantity}</span>
                  <span className="text-lg font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-4 text-xl font-bold">
                <span>Total</span>
                <span>${(total + total * 0.08).toFixed(2)}</span>
              </div>
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg text-lg font-medium transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-4 rounded-lg text-lg font-medium transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {isLoading ? 'Processing...' : 'Place Order'}
                </button>
              )}
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className={`w-full mt-4 py-4 rounded-lg text-lg font-medium transition-colors ${
                    theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
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
