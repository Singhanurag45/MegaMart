import React from "react";
import bannerImage from "../../assets/HomePage.png"; // Banner image

export default function Banner() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
      {/* Animated Glow Backgrounds */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative container mx-auto flex flex-col md:flex-row items-center min-h-[calc(100vh-80px)] py-16 px-6">
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            Discover{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent">
              MegaMart
            </span>
          </h1>

          <p className="text-lg md:text-xl max-w-lg mx-auto md:mx-0 text-gray-100/90 leading-relaxed">
            Trendy, stylish, and affordable collections for Men, Women, and Kids
            — all in one place. Upgrade your wardrobe with our latest arrivals.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center md:justify-start">
            <button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Shop Now
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium px-8 py-4 rounded-full hover:bg-white/30 hover:scale-105 transition-all duration-300">
              Explore Deals
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-200">
            🚚 Free Shipping on Orders Above ₹999
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <div className="relative w-4/5 md:w-full max-w-xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl"></div>
            <img
              src={bannerImage}
              alt="Fashion models wearing trendy clothing"
              className="relative w-full h-auto rounded-3xl shadow-2xl brightness-95 contrast-105 transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
