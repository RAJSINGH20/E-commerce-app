import React, { useContext } from "react";
import { ShopDataContext } from "../context/ShopContanier";
import { useNavigate } from "react-router-dom";

function Card({ name, image, id, price }) {
  const { currency } = useContext(ShopDataContext);
  const navigate = useNavigate(); // ✅ correct hook usage

  return (
    <div
      key={id}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={() => navigate(`/ProductDetails/${id}`)} // ✅ proper navigation
    >
      {/* 🖼️ Product Image */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-[22rem] bg-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {/* 🔘 Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* 🛍️ Product Info */}
      <div className="p-4 sm:p-5 lg:p-6 text-center space-y-2">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 truncate">
          {name}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          {currency} {price}
        </p>
      </div>
    </div>
  );
}

export default Card;
