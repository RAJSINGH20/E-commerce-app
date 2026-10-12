import React, { useContext } from "react";
import { ShopDataContext } from "../context/ShopDataContext.jsx";
import { useNavigate } from "react-router-dom";

function Card({ name, image, id, price }) {
  const { currency } = useContext(ShopDataContext);
  const navigate = useNavigate(); // ✅ correct hook usage

  return (
    <article
      key={id}
      className="product-card group cursor-pointer overflow-hidden border border-rule bg-white transition duration-300 hover:-translate-y-1 hover:border-forest/30 hover:shadow-[0_18px_38px_rgba(23,37,29,0.12)]"
      onClick={() => navigate(`/ProductDetails/${id}`)} // ✅ proper navigation
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-3 right-3 translate-y-2 bg-paper px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">View item</span>
      </div>

      <div className="space-y-1.5 p-3.5 sm:p-4">
        <h3 className="truncate text-sm font-semibold text-ink sm:text-base">
          {name}
        </h3>
        <p className="text-sm font-medium text-forest">
          {currency} {price}
        </p>
      </div>
    </article>
  );
}

export default Card;
