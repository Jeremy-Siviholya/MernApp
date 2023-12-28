import React from "react";
import { BiLogoMongodb } from "react-icons/bi";

const Upbar = () => {
  return (
    <div className="bg-white/60 shadow-md rounded-b-lg  h-20 fixed top-0 w-[890px] z-40  flex justify-between">
      <div className="text-emerald-500 h-full flex items-center text-[35px] pr-5">
        <BiLogoMongodb />
      </div>
      <div className="text-gray-600 h-full flex items-center pr-5 text-2xl">
        <h1>MERN CRUD</h1>
      </div>
    </div>
  );
};

export default Upbar;
