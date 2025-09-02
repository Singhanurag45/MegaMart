// src/pages/CategoryPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

// 👇 Accept addToCart as a prop
export default function CategoryPage({ category, addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const filtered = res.data.filter((p) => p.category === category);
        setProducts(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 capitalize">
        {category} Collection
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found for {category}.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart} // 👈 Pass addToCart to each product card
            />
          ))}
        </div>
      )}
    </div>
  );
}
