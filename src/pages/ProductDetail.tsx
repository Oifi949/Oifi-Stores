// src/pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { products } from "../data/products";
import Header from "../components/Header";
import { FiShoppingCart, FiCheck } from "react-icons/fi";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const { theme } = useTheme();
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find((p) => p.id === id);
  if (!product) return <div className="p-8">Product not found</div>;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-2xl shadow-lg object-cover h-64 md:h-80 lg:h-96"
              />
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                <img src="" alt="" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  {product.title}
                </h1>
                <p
                  className={`text-base md:text-lg ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {product.category}
                </p>
              </div>

              <div className="text-2xl md:text-3xl font-bold text-indigo-600">
                ₦{product.price.toLocaleString()}
              </div>

              <div className="prose prose-gray max-w-none">
                <p
                  className={`leading-relaxed text-sm md:text-base ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`w-full flex items-center justify-center gap-3 py-3 md:py-4 px-6 rounded-xl font-semibold text-base md:text-lg transition-all  duration-300 ${
                    addedToCart
                      ? "bg-green-600"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>

                <Link
                  to="/cart"
                  className={`block w-full text-center py-3 px-6 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold transition-colors ${
                    theme === "dark"
                      ? "hover:bg-gray-700"
                      : "hover:bg-indigo-50"
                  }`}
                >
                  View Cart
                </Link>
              </div>

              <div
                className={`rounded-lg p-4 md:p-6 space-y-3 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <h3
                  className={`font-semibold text-base md:text-lg ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Why choose this product?
                </h3>
                <ul
                  className={`space-y-2 text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    High-quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    Free shipping on orders over ₦50,000
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    30-day return policy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
