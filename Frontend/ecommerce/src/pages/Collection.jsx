import React, { useContext, useState, useEffect } from "react";
import Title from "../Components/Tittle";
import { ShopDataContext } from "../context/ShopDataContext.jsx";
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
    <section className="min-h-screen bg-paper px-4 py-10 sm:px-7 sm:py-14 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* 🏷️ Title */}
        <div className="text-center mb-10">
          <Title text1="Our" text2="Collection" />
          <p className="text-gray-600 text-base sm:text-lg mt-3">
            Find easy favorites and considered details, curated for everyday wear.
          </p>
        </div>

        {/* 🧭 Filter Bar */}
        <div className="mb-8 grid grid-cols-1 gap-3 border-y border-rule bg-white/75 py-4 sm:grid-cols-[minmax(220px,1fr)_auto_auto] sm:items-center">
          <input
            type="text"
            placeholder="Search the collection"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
            className="min-h-11 w-full border border-rule bg-paper px-4 text-sm text-ink placeholder:text-gray-400 outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10"
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category" className="min-h-11 border border-rule bg-white px-4 text-sm text-ink outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10">
              <option value="all">All Categories</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="accessories">Accessories</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products" className="min-h-11 border border-rule bg-white px-4 text-sm text-ink outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10">
              <option value="default">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="product-grid grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {filtered.map((item, i) => (
              <Card
                key={i}
                name={item.name}
                image={item.image}
                id={item._id}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-display text-xl font-semibold text-ink">No pieces found</p>
            <p className="mt-2 text-sm text-gray-500">Try another search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;
