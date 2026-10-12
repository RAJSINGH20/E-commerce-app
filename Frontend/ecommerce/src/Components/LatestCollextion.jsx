import React, { useContext, useEffect, useState } from "react";
import Title from "./Tittle";
import { ShopDataContext } from "../context/ShopDataContext.jsx";
import Card from "./Card";

const LatestCollection = () => {
  const { products } = useContext(ShopDataContext);
  const [latestproduct, setlatestproduct] = useState([]);

  useEffect(() => {
    setlatestproduct(products.slice(0, 8));
  }, [products]);

  return (
    <section className="w-full bg-paper px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1360px] text-center">
        <Title text1="Latest" text2="Collection" />

        <p className="mx-auto mb-9 mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
          New pieces, considered details, and easy-to-wear favorites for the season ahead.
        </p>

        <div className="product-grid mt-6 grid grid-cols-2 gap-3 text-left sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
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
    </section>
  );
};

export default LatestCollection;
