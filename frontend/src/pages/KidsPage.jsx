// src/pages/KidsPage.jsx

import CategoryPage from "./CategoryPage";

// 👇 Accept addToCart and pass it down
export default function KidsPage({ addToCart }) {
  return <CategoryPage category="kids" addToCart={addToCart} />;
}
