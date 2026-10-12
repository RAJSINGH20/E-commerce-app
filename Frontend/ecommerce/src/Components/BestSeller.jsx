import React, { useContext, useEffect, useState } from "react";
import Title from "./Tittle";
import { ShopDataContext } from "../context/ShopDataContext.jsx";
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
    <section className="w-full border-y border-rule bg-white px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1360px] text-center">
        <Title text1="Best" text2="Sellers" />

        <p className="mx-auto mb-9 mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
          The pieces customers come back for, selected for fit, feel, and everyday versatility.
        </p>

        <div className="product-grid mt-6 grid grid-cols-2 gap-3 text-left sm:gap-5 lg:grid-cols-4 lg:gap-6">
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
            <p className="col-span-full py-12 text-center text-sm text-gray-500">
              No bestsellers available at the moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
