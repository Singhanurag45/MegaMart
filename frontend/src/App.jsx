import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute"; // Make sure this is imported

// Pages
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import MenPage from "./pages/MenPage.jsx";
import WomenPage from "./pages/WomenPage.jsx";
import KidsPage from "./pages/KidsPage.jsx";
import ProductDetailPage from "./components/ProductDetailPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import MyOrdersPage from "./pages/MyOrdersPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function AppContent() {
  const location = useLocation();
  const [cart, setCart] = useState([]);

  const clearCart = () => setCart([]);
  const authPaths = ["/signin", "/signup"];
  const showNavbar = !authPaths.includes(location.pathname);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 👇 CORRECTED: This function now handles both decrementing and full removal
  const removeFromCart = (productId, removeAll = false) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === productId);

      // If removeAll is true or quantity is 1, filter out the item
      if (removeAll || existingItem?.quantity === 1) {
        return prevCart.filter((item) => item._id !== productId);
      }

      // Otherwise, just decrement the quantity
      return prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // A wrapper for removeFromCart to handle decrementing
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      setCart(
        cart.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      removeFromCart(productId, true); // Remove if quantity is 0 or less
    }
  };

  return (
    <>
      {showNavbar && <Navbar cart={cart} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/men" element={<MenPage addToCart={addToCart} />} />
        <Route path="/women" element={<WomenPage addToCart={addToCart} />} />
        <Route path="/kids" element={<KidsPage addToCart={addToCart} />} />
        <Route
          path="/product/:id"
          element={<ProductDetailPage addToCart={addToCart} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* 👇 CORRECTED: Pass all necessary functions to the Cart component */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />

        {/* Protected User Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage cart={cart} clearCart={clearCart} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrdersPage />
            </ProtectedRoute>
          }
        />

        {/* 👇 ADDED: The missing route for the admin dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="*"
          element={
            <h1 className="text-center mt-10 text-2xl">404 Not Found</h1>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
