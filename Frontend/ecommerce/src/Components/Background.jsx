import React from "react";
import img1 from "../assets/girl.webp";
import img2 from "../assets/jacket for women.jpg";
import img3 from "../assets/jacket for women3.jpg";
import img4 from "../assets/kidswear3.jpg";

const images = [img1, img2, img3, img4];


const Background = ({ herocount }) => {
  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-forest">
      <img
        key={herocount}
        src={images[herocount]}
        alt="Featured seasonal fashion"
        className="hero-image absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/35 via-transparent to-ink/10" />
      <div className="absolute bottom-5 left-5 flex items-center gap-3 border-l-2 border-leaf pl-3 text-white sm:bottom-8 sm:left-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Curated for now</span>
        <span className="text-[10px] text-white/70">0{herocount + 1} / 04</span>
      </div>
    </div>
  );
};

export default Background;
