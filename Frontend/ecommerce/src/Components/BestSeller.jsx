import React, { useContext, useEffect, useState } from "react";
import Title from "./Tittle";
import { ShopDataContext } from "../context/ShopContanier";
import Card from "./Card";

const Bestseller = () => {
  const { products } = useContext(ShopDataContext);
  const [bestseller, setbestseller] = useState([]);

  useEffect(() => {
    // ✅ Filter products marked as bestseller
    const filtered = products.filter((item) => item.bestseller);
    setbestseller(filtered.slice(0, 4)); // limit to first 4
  }, [products]);

  return (
    <section className="w-full bg-white py-14 px-5 sm:px-10 lg:px-20 xl:px-32">
      <div className="max-w-7xl mx-auto text-center">
        {/* 🏷️ Section Title */}
        <Title text1="Best" text2="Sellers" />

        {/* 📝 Subtitle */}
        <p className="text-gray-600 text-base sm:text-lg mt-3 mb-10 max-w-2xl mx-auto">
          Discover our most popular products loved by customers worldwide.
        </p>

        {/* 🛍️ Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
          {bestseller.length > 0 ? (
            bestseller.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                image={item.image}
                id={item._id}
                price={item.price}
              />
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center">
              No bestsellers available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
