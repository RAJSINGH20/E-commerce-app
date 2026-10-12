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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setCount((prev) => (prev + 1) % herodata.length), 5000);
    return () => clearInterval(interval);
  }, [herodata.length]);

  return (
    <>
      <section className="grid overflow-hidden bg-forest text-white md:min-h-[min(700px,calc(100svh-72px))] md:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 order-1 min-h-[390px] md:min-h-[620px]">
          <Hero
            herodata={herodata[count]}
            setherocount={setCount}
          />
        </div>
        <div className="relative order-2 h-[48vh] min-h-[320px] md:h-auto md:min-h-[620px]">
          <Background herocount={count} />
        </div>
      </section>

      <Product />
      <OurrPolicy />
    </>
  );
};

export default Home;
