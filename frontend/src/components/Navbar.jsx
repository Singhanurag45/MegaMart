import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react"; // modern icons
import logo from "../../assets/Logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Kids", path: "/kids" },
  ];

  return (
    <nav className="bg-white shadow-md  top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
       
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-[4px]">
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
          <Link
            to="/signin"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 font-medium hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/cart"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Cart 🛒
          </Link>
          <Link
            to="/signin"
            className="block px-4 py-2 rounded-lg bg-blue-600 text-white text-center font-medium hover:bg-blue-700 transition"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
