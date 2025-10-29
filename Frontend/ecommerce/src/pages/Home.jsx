import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero.jsx";
import Background from "../Components/Background.jsx";

const Home = () => {
  const herodata = [
    { text1: "New collection", text2: "Find the best products here!" },
    { text1: "Summer Collection", text2: "Explore the latest trends!" },
    { text1: "Exclusive Deals", text2: "Save big on your favorite items!" },
    { text1: "New Arrivals", text2: "Check out what's new!" },
  ];

  const [count, setCount] = useState(0);

  // ✅ Auto-shift logic (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % herodata.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] flex flex-col md:flex-row bg-gradient-to-r from-gray-900 to-black-900 overflow-hidden">
      {/* Left text section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-10 text-white space-y-4 z-10">
        <Hero herodata={herodata[count]} herocount={count} setherocount={setCount} />
      </div>

      {/* Right image section */}
      <Background herocount={count} />
    </div>
  );
};

export default Home;
