import React from "react";
import { BiLogoMongodb, BiLogoNodejs, BiLogoReact, BiLogoTailwindCss } from "react-icons/bi";

const Upbar = () => {
  return (
    <div className="bg-white/60 shadow-md rounded-b-lg  h-20 fixed top-0 w-[890px] z-40 px-7  flex justify-between">
      <div className=" h-full flex items-center text-[35px]  gap-3">
        <BiLogoMongodb className="text-emerald-500 p-1 bg-white/70 rounded-full shadow-sm" />
        <BiLogoTailwindCss className="text-blue-400 p-1 bg-white/70 rounded-full shadow-sm" />
        <BiLogoReact className="text-blue-500 p-1 bg-white/70 rounded-full shadow-sm" />
        <BiLogoNodejs className="text-emerald-600 p-1 bg-white/70 rounded-full shadow-sm"/>
      </div>
      <div className="text-gray-600 h-full flex items-center  text-2xl">
        <h1>MERN CRUD</h1>
      </div>
    </div>
  );
};

export default Upbar;
