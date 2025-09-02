import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetailPage({ addToCart }) {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        setError("Could not fetch product details. Please try again later.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]); // Re-run effect if the ID changes

  const handleAddToCart = () => {
    // Add the product to the cart 'quantity' times
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left Column: Product Image */}
        <div className="bg-gray-100 rounded-lg shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col h-full">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <p className="text-3xl text-gray-800 my-4">${product.price}</p>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="mt-auto">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-6">
              <label htmlFor="quantity" className="font-semibold">
                Quantity:
              </label>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded-md"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border rounded-md"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
