import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero.jsx";
import Background from "../Components/Background.jsx";
import Product from "./Product.jsx";
import OurrPolicy from "../Components/OurrPolicy.jsx";

const Home = () => {
  const herodata = [
    { text1: "New Collection", text2: "Find the best products here!" },
    { text1: "Summer Collection", text2: "Explore the latest trends!" },
    { text1: "Exclusive Deals", text2: "Save big on your favorite items!" },
    { text1: "New Arrivals", text2: "Check out what's new!" },
  ];

  const [count, setCount] = useState(0);

  // ✅ Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % herodata.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🟣 HERO SECTION */}
      <section className="relative w-full min-h-[80vh] flex flex-col md:flex-row items-center bg-gradient-to-r from-gray-900 to-white-900 text-white overflow-hidden">
        
        {/* Left Text Area */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start px-8 sm:px-12 md:px-16 lg:px-20 py-12 space-y-5 z-10">
          <Hero
            herodata={herodata[count]}
            herocount={count}
            setherocount={setCount}
          />
        </div>

        {/* Right Background/Image */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh]">
          <Background herocount={count} />
        </div>
      </section>

      {/* 🟢 PRODUCT SECTION */}
      <section className="w-full bg-gray-50 py-16 px-5 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <Product />
        </div>
      </section>


      <footer>
      <OurrPolicy/>
      </footer>

    </>
  );
};

export default Home;
