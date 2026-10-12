import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = ({ herodata, setherocount }) => {
  const next = () => setherocount((prev) => (prev + 1) % 4);
  const prev = () => setherocount((prev) => (prev - 1 + 4) % 4);
  const navigate = useNavigate();

  return (
    <div className="animate-enter flex h-full flex-col items-start justify-center px-5 py-10 text-white sm:px-10 md:px-12 lg:px-16">
      <p className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-leaf">
        <span className="h-px w-8 bg-leaf" /> OneCart / New season
      </p>
      <h1 className="font-display mb-4 max-w-xl text-4xl font-semibold leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">
        {herodata.text1}
      </h1>
      <p className="mb-8 max-w-md text-sm leading-6 text-white/70 sm:text-base">{herodata.text2}</p>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => navigate("/COLLECTIONS")} className="group inline-flex min-h-12 items-center gap-3 bg-leaf px-5 text-xs font-bold uppercase tracking-[0.1em] text-ink transition hover:bg-white">
          Explore collection <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </button>
        <div className="ml-2 flex items-center gap-2">
        <button
          type="button"
          aria-label="Previous collection"
          onClick={prev}
          className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition hover:border-leaf hover:text-leaf"
        >
          <FaArrowLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next collection"
          onClick={next}
          className="flex h-11 w-11 items-center justify-center border border-white/25 text-white transition hover:border-leaf hover:text-leaf"
        >
          <FaArrowRight aria-hidden="true" />
        </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
