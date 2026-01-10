// src/pages/Home.jsx
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featured = filteredProducts;
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-8">
        <section
          className={`w-full rounded-2xl shadow-sm mb-12 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="max-w-7xl mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-500 leading-tight">
                   quality products
                </h1>
                <p
                  className={`text-base md:text-lg lg:text-xl leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Handpicked items and clean design to showcase your work. Shop
                  the latest trends with fast, free shipping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#products"
                    className="bg-indigo-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl text-center"
                  >
                    Shop Now
                  </a>
                  <a
                    href="#products"
                    className={`border-2 border-indigo-600 text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors text-center ${
                      theme === "dark" ? "hover:bg-gray-700" : ""
                    }`}
                  >
                    View Collection
                  </a>
                </div>
              </div>
              <div className="relative mt-6 lg:mt-0">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                  alt="hero"
                  className="rounded-2xl shadow-2xl w-full object-cover h-64 md:h-80 lg:h-96"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-indigo-600/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className={`text-center p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-sm`}
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Handpicked items from trusted brands
                </p>
              </div>
              <div
                className={`text-center p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-sm`}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Free delivery on orders over ₦50,000
                </p>
              </div>
              <div
                className={`text-center p-6 rounded-xl ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-sm`}
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Customer support available anytime
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Products</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm md:text-base ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white"
                      : theme === "dark"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          {searchQuery && (
            <p
              className={`mb-4 text-sm md:text-base ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Showing results for "{searchQuery}"
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p
              className={`text-center py-8 text-lg md:text-xl ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No products found matching your criteria.
            </p>
          )}
        </section>

        <section className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-base md:text-xl mb-6 opacity-90">
              Get exclusive deals and updates on new arrivals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
