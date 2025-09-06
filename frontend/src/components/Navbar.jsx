// frontend/src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, User as UserIcon } from "lucide-react";
import logo from "../../assets/Logo.jpg";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const profileMenuRef = useRef(null);

  const navigate = useNavigate();

  // --- Check login status and get user name ---
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        setIsLoggedIn(true);
        const parsedUser = JSON.parse(user);
        setIsAdmin(parsedUser.isAdmin || false);
        setUserName(parsedUser.name.split(" ")[0]); // First name only
      } else {
        setIsLoggedIn(false);
        setUserName("");
        setIsAdmin(false);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // --- Logic to close dropdown when clicking outside ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    setIsAdmin(false);
    setIsProfileOpen(false);
    navigate("/signin");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Kids", path: "/kids" },
  ];

  return (
    <nav className="bg-white shadow-md top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="MegaMart Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h1 className="text-2xl font-extrabold tracking-wide">
            <span className="text-red-600">Mega</span>
            <span className="text-blue-600">Mart</span>
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Cart & Auth */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/cart"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <ShoppingCart className="mr-1" size={20} /> Cart
          </Link>

          {/* Auth Section */}
          {isLoggedIn ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                <UserIcon size={24} className="bg-gray-200 rounded-full p-1" />
                {userName}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                  <Link
                    to="/my-orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    View Profile
                  </Link>

                  {/* ✅ Admin Dashboard link */}
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu (not yet implemented) */}
    </nav>
  );
}
