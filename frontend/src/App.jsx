import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import MenPage from "./pages/MenPage.jsx";
import WomenPage from "./pages/WomenPage.jsx";
import KidsPage from "./pages/KidsPage.jsx";
import ProductDetailPage from "./components/ProductDetailPage.jsx";

// Main component to handle routing logic
function AppContent() {
  const location = useLocation();
  const [cart, setCart] = useState([]);

  // ✅ UPDATED LOGIC: Show Navbar on all pages except auth pages.
  const authPaths = ["/signin", "/signup"];
  const showNavbar = !authPaths.includes(location.pathname);

  // Advanced function to add items or increment quantity
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

  // Function to remove items or decrement quantity
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc, item) => {
        if (item._id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  return (
    <>
      {/* This will now render the Navbar on the desired pages */}
      {showNavbar && <Navbar cart={cart} />}

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/men" element={<MenPage addToCart={addToCart} />} />
        <Route path="/women" element={<WomenPage addToCart={addToCart} />} />
        <Route path="/kids" element={<KidsPage addToCart={addToCart} />} />
        <Route
          path="/product/:id"
          element={<ProductDetailPage addToCart={addToCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
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

// The main App component now just sets up the Router
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
