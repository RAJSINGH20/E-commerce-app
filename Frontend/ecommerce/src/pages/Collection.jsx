import React, { useContext, useState, useEffect } from "react";
import Title from "../Components/Tittle";
import { ShopDataContext } from "../context/ShopContanier";
import Card from "../Components/Card.jsx";

const Collection = () => {
  const { products } = useContext(ShopDataContext);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let result = products;

    // 🔍 Filter by search
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷️ Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // 💰 Sort logic
    if (sort === "lowToHigh") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sort === "highToLow") {
      result = result.sort((a, b) => b.price - a.price);
    }

    setFiltered([...result]);
  }, [search, category, sort, products]);

  return (
    <section className="w-full min-h-screen bg-gray-50 py-12 px-5 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* 🏷️ Title */}
        <div className="text-center mb-10">
          <Title text1="Our" text2="Collection" />
          <p className="text-gray-600 text-base sm:text-lg mt-3">
            Explore our exclusive collection of fashion, lifestyle, and more —
            curated just for you.
          </p>
        </div>

        {/* 🧭 Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm mb-8">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-gray-400 outline-none"
          />

          <div className="flex gap-4 flex-wrap justify-center">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
            >
              <option value="all">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="accessories">Accessories</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
            >
              <option value="default">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 🛍️ Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <Card
                key={i}
                name={item.name}
                image={item.image}
                id={item.id}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No products match your filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default Collection;
