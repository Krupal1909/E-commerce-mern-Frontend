import React from "react";
import Category from "../category/category"; 
const Home = () => {
  return (
    <>
    <div className="w-full flex justify-center items-center mt-12 mb-12">
      {/* Banner Container with max width and center alignment */}
      <div className="relative w-full max-w-7xl h-[420px] md:h-[520px] rounded-2xl overflow-hidden bg-[#e4fbef] shadow-lg flex items-center">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-repeat opacity-60"
          style={{
            backgroundImage:
              "url('../../../public/assets/main_banner_bg-BUDbdxCy.png')",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Content Row */}
        <div className="relative z-10 flex items-center h-full w-full px-10 md:px-20 py-8">
          {/* Left: Text */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[oklch(.373_.034_259.733)] font-outfit leading-tight mb-10">
              Freshness You Can Trust, Savings You
              <br className="hidden md:block" /> will Love!
            </h2>

            <div className="flex gap-6 items-center">
              <button className="bg-[#4FBF8B] hover:bg-[#44ae7c] text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-md text-lg">
                Shop now
              </button>
              <button className="text-slate-800 hover:text-black font-semibold flex items-center gap-2 transition-colors duration-300 text-lg">
                Explore deals
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Right: Vegetables Image */}
          <div className="flex-1 h-full hidden md:flex items-end justify-end">
            <img
              src="/assets/main_banner_veg_crop.png"
              alt="Vegetables arrangement"
              className="object-contain h-[125%] w-auto drop-shadow-2xl"
              style={{
                borderBottomRightRadius: "1.25rem",
                borderTopRightRadius: "1.25rem",
                marginRight: "-2rem",
                marginBottom: "-2rem",
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <Category />
    </>
  );
};

export default Home;
