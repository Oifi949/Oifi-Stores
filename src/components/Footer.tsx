import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className={`py-12 px-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Ecommerce Store</h3>
            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Your one-stop shop for quality products at amazing prices. Discover the best deals and shop with confidence.
            </p>
            <div className="flex space-x-6">
              <a href="#" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <FiFacebook size={24} />
              </a>
              <a href="#" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <FiTwitter size={24} />
              </a>
              <a href="#" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                <FiInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Cart
                </Link>
              </li>
              <li>
                <a href="#" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Categories</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Electronics
                </a>
              </li>
              <li>
                <a href="#" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Clothing
                </a>
              </li>
              <li>
                <a href="#" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Home & Garden
                </a>
              </li>
              <li>
                <a href="#" className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  Sports
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FiMail size={20} />
                <span className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>support@ecommerce.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone size={20} />
                <span className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin size={20} />
                <span className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>123 Commerce St, City, State</span>
              </div>
            </div>
            {/* Theme Toggle */}
            <div className="mt-6">
              <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-lg text-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`border-t pt-8 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Ecommerce Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;