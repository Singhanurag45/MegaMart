// src/components/Testimonials.jsx

import React from "react";

// You can replace this with data fetched from an API
const testimonials = [
  {
    quote:
      "The quality is amazing! I'm so happy with my purchase. The MegaMart team was also very helpful. I'll definitely be shopping here again.",
    name: "Priya Sharma",
    title: "Fashion Enthusiast",
    image: "https://i.pravatar.cc/150?img=1", // Placeholder image
  },
  {
    quote:
      "My order arrived faster than I expected, and the packaging was great. The t-shirt fits perfectly. 10/10 would recommend to anyone.",
    name: "Rajesh Kumar",
    title: "Verified Customer",
    image: "https://i.pravatar.cc/150?img=32", // Placeholder image
  },
  {
    quote:
      "I was looking for a gift and found the perfect dress here. The entire shopping experience was smooth, from browsing to checkout.",
    name: "Anjali Singh",
    title: "Happy Shopper",
    image: "https://i.pravatar.cc/150?img=5", // Placeholder image
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Real stories from real people who love our products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-lg shadow-lg text-center"
            >
              <img
                className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-4 border-blue-500"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <blockquote className="text-gray-600 italic mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="font-bold text-gray-900">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
