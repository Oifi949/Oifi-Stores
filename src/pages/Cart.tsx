import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const { theme } = useTheme();

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header />
        <div className="px-4 py-16">
          <div className="max-w-md mx-auto">
            <div className={`rounded-lg shadow-sm p-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-6xl mb-4">🛒</div>
              <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Your cart is empty</h2>
              <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Add some products to get started!</p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="px-4 py-8">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className={`rounded-lg shadow-sm overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              {state.items.map((item) => (
                <div key={item.id} className="p-4 md:p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className={`text-base md:text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{item.category}</p>
                      <p className="text-indigo-600 font-semibold mt-1">₦{item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center border rounded-lg ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`rounded-lg shadow-sm p-6 sticky top-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Subtotal ({state.items.length} items)</span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>₦{state.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Shipping</span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Tax</span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>₦{(state.total * 0.08).toLocaleString()}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₦{(state.total + state.total * 0.08).toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors block text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/"
                className={`block text-center mt-4 font-medium ${theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'}`}
              >
                Continue Shopping
              </Link>
            </div>
              </div>
            </div>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;