// src/pages/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

export default function Cart({ cart, removeFromCart, updateQuantity }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle the empty cart case
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Shopping Cart
        </h1>
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-lg shadow-md p-6">
            <ul role="list" className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item._id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </h3>
                        <p className="ml-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="p-2 text-gray-500 hover:text-gray-800"
                        >
                          <Minus size={16} />
                        </button>
                        <p className="px-4">{item.quantity}</p>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-2 text-gray-500 hover:text-gray-800"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id, true)} // Pass true to remove all quantities
                          className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 border-b pb-4">
                Order Summary
              </h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">Free</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">
                    Order total
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                {/* ✅ Updated Proceed to Checkout button */}
                <Link
                  to="/checkout"
                  className="w-full block text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  Proceed to Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link
                    to="/"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Continue Shopping <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
