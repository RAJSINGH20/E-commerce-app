import React from "react";
import img1 from "../assets/girl.webp";
import img2 from "../assets/jacket for women.jpg";
import img3 from "../assets/jacket for women3.jpg";
import img4 from "../assets/kidswear3.jpg";

const images = [img1, img2, img3, img4];


const Background = ({ herocount }) => {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center p-4">
      <img
        src={images[herocount]}
        alt="Hero Background"
        className="w-[80%] h-[80%] object-cover rounded-2xl shadow-xl transition-all duration-700 ease-in-out"
      />
    </div>
  );
};

export default Background;
