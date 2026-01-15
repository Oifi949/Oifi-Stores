import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import PaymentSucess from "./pages/Payment-sucess.tsx";
import ConvertToSubcurrency from "./lib/ConvertToSubcurrency.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const StripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Elements
            stripe={StripePromise}
            options={{
              mode: "payment",
              amount: ConvertToSubcurrency(600), //cents
              currency: "usd",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />}></Route>{" "}
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />
              <Route path="/payment-success" element={<PaymentSucess />} />
            </Routes>
          </Elements>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
