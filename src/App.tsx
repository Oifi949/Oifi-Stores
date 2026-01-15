import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import PaymentSuccess from "./pages/Payment-sucess.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutWrapper />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
          </Elements>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

function CheckoutWrapper() {
  const storedCart = localStorage.getItem("cartItems");
  const cartItems = storedCart ? JSON.parse(storedCart) : [];

  const amount = cartItems.reduce(
    (total: number, item: { price: number; quantity: number }) =>
      total + item.price * item.quantity,
    0
  );

  return <Checkout amount={amount} />;
}

export default App;
