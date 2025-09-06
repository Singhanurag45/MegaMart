import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

const ProductSection = ({
  title,
  subtitle,
  products,
  categoryLink,
  addToCart,
}) => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-2 text-lg text-gray-500 max-w-2xl">{subtitle}</p>
          </div>
          <Link
            to={categoryLink}
            className="hidden sm:flex items-center whitespace-nowrap text-base font-semibold text-blue-600 hover:text-blue-500 transition-colors"
          >
            View All 
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* We only show a slice of products, e.g., the first 4 */}
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
