import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart.tsx'
import Checkout from './pages/Checkout.tsx'
import OrderConfirmation from './pages/OrderConfirmation.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

function App() {

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App
