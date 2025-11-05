import React, { useContext, useEffect, useState } from "react";
import Title from "./Tittle";
import { ShopDataContext } from "../context/ShopContanier";
import Card from "./Card";

const LatestCollection = () => {
  const { products } = useContext(ShopDataContext);
  const [latestproduct, setlatestproduct] = useState([]);

  useEffect(() => {
    setlatestproduct(products.slice(0, 8));
  }, [products]);

  return (
    <div className="w-full bg-gray-50 py-10 px-5 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* ✅ Title Component */}
        <Title text1="Latest" text2="Collection" />

        {/* ✅ Subtitle */}
        <p className="text-gray-600 text-base sm:text-lg mt-3 mb-8">
          Shop into our new seasonal collection — fresh styles, premium quality,
          and exclusive trends.
        </p>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {latestproduct.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              image={item.image}
              id={item._id}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
