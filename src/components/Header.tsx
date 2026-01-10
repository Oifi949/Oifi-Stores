import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { state } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Top bar */}
      <div
        className={`py-2 px-2 md:px-4 text-center text-sm ${
          theme === "dark"
            ? "bg-gray-700 text-gray-300"
            : "bg-gray-50 text-gray-600"
        }`}
      >
        Free shipping on orders over ₦50,000 | 24/7 Customer Support
      </div>
      <div
        className={`border-b px-2 md:px-4 py-2 md:py-4 ${
          theme === "dark"
            ? "border-gray-700 bg-gray-800 text-white"
            : "border-gray-200 bg-white text-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl font-bold hover:text-indigo-600 transition-colors"
          >
            <div className="w-8 logo-spin h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            OifiStores
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Desktop search */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 text-gray-500 -translate-y-1/2"
              >
                <svg
                  className="w-4 h-4 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Mobile search button */}
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="md:hidden p-2 rounded-lg transition-colors text-gray-500  hover:bg-gray-100"
              aria-label="Search"
              aria-expanded={mobileSearchOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5 text-gray-500 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-500 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <div
                className={`p-2 rounded-lg transition-colors ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 ${
                    theme === "dark"
                      ? "text-gray-200 group-hover:text-indigo-400"
                      : "text-gray-700 group-hover:text-indigo-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {itemCount > 0 && (
                <span
                  aria-live="polite"
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1"
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Backdrop overlay */}
          {(mobileSearchOpen || mobileMenuOpen) && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300"
              onClick={() => {
                setMobileSearchOpen(false);
                setMobileMenuOpen(false);
              }}
            />
          )}

          {/* Mobile search dropdown */}
          <div
            className={`absolute top-full left-0 w-full shadow-md transform transition-all duration-300 ${
              mobileSearchOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 pointer-events-none"
            } ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
          >
            <form onSubmit={handleSearch} className="flex p-4">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setMobileSearchOpen(false)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`px-2 md:px-4 py-2 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } border-b`}
      >
        <div className="max-w-7xl mx-auto">
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                to="/"
                className={`hover:text-indigo-600 transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#products"
                className={`hover:text-indigo-600 transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:text-indigo-600 transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:text-indigo-600 transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Deals
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:text-indigo-600 transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`hover:text-indigo-600 transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
