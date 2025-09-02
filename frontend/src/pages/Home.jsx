import { useEffect, useState } from "react";
import api from "../api/axios";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection"; // ⬅️ Import the new component
import Testimonials from "../components/Testimonials";

export default function Home({ addToCart }) {
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
  const [kidsProducts, setKidsProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setMenProducts(res.data.filter((p) => p.category === "men"));
        setWomenProducts(res.data.filter((p) => p.category === "women"));
        setKidsProducts(res.data.filter((p) => p.category === "kids"));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />

      {/* Popular in Men */}
      <ProductSection
        title="Popular in Men"
        subtitle="Check out the latest trends in men's fashion."
        products={menProducts}
        categoryLink="/men"
        addToCart={addToCart}
      />

      {/* Popular in Women */}
      <ProductSection
        title="Popular in Women"
        subtitle="Discover our new collection of stylish and trendy outfits."
        products={womenProducts}
        categoryLink="/women"
        addToCart={addToCart}
      />

      {/* Popular in Kids */}
      <ProductSection
        title="Popular in Kids"
        subtitle="Fun, comfy, and durable styles for your little ones."
        products={kidsProducts}
        categoryLink="/kids"
        addToCart={addToCart}
      />

      {/* Testimonials section here */}
      <Testimonials />

      <Footer />
    </div>
  );
}
