// src/pages/MenPage.jsx

import CategoryPage from "./CategoryPage";

// 👇 Refactor to use the consistent CategoryPage component
export default function MenPage({ addToCart }) {
  return <CategoryPage category="men" addToCart={addToCart} />;
}
