import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import type { Product } from "../data/products";
import { FiShoppingCart } from "react-icons/fi";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { dispatch } = useCart();
  const { theme } = useTheme();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <article
      className={`rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700 hover:shadow-gray-700"
          : "bg-white border-gray-100"
      } group`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 bg-indigo-600 text-black p-2 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-700 shadow-lg"
          title="Add to Cart"
        >
          <FiShoppingCart className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">
        <h3
          className={`text-lg font-semibold mb-2 line-clamp-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {product.title}
        </h3>
        <p
          className={`text-sm mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {product.category}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ₦{product.price.toLocaleString()}
          </span>
          <Link
            to={`/product/${product.id}`}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
