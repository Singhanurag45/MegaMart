import React from "react";
import { Link } from "react-router-dom"; // Use Link for internal navigation
import logo from "../../assets/Logo.jpg";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="MegaMart Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <h1 className="text-2xl font-extrabold tracking-wide">
                <span className="text-red-600">Mega</span>
                <span className="text-blue-600">Mart</span>
              </h1>
            </div>
            <p className="text-gray-400">
              Your one-stop shop for everything you need. Quality products,
              unbeatable prices, and exceptional customer service.
            </p>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Shop</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/men" className="hover:text-white transition-colors">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/women"
                  className="hover:text-white transition-colors"
                >
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-white transition-colors">
                  Kid's Wear
                </Link>
              </li>
              <li>
                <Link
                  to="/electronics"
                  className="hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Support</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="hover:text-white transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Stay Connected</h2>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest deals and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-gray-900 rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md">
                <Send size={20} />
              </button>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white">
                <Facebook />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* 👇 MODIFIED THIS LINE 👇 */}
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MegaMart. All rights reserved. |
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/anurag-singh-9598b4207/" // ⬅️ Change this link
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Anurag Singh
            </a>
          </p>

          <div className="flex space-x-4 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
