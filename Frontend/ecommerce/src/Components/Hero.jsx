import React from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Hero = ({ herodata, herocount, setherocount }) => {
  const next = () => setherocount((prev) => (prev + 1) % 4);
  const prev = () => setherocount((prev) => (prev - 1 + 4) % 4);

  return (
    <div className="absolute left-0 top-0 w-1/2 h-full flex flex-col justify-center items-start px-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {herodata.text1}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">{herodata.text2}</p>

      <div className="flex gap-4">
        <button
          onClick={prev}
          className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaRegArrowAltCircleLeft />

        </button>
        <button
          onClick={next}
          className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
        >
          <FaRegArrowAltCircleRight />

        </button>
      </div>
    </div>
  );
};

export default Hero;
