import React from 'react'
import { BiLogoMongodb } from 'react-icons/bi';

const Upbar = () => {
  return (
    <div className="bg-black/50 border-l border-r border-b  border-gray-600 h-20 fixed top-0 w-[840px] rounded-b-md flex justify-between">
      <div className='text-emerald-500 h-full flex items-center text-[35px] pr-5'>
        <BiLogoMongodb/>
      </div>
      <div className='text-white h-full flex items-center pr-5 text-2xl'>
        <h1>MERN CRUD</h1>
      </div>
    </div>
  );
}

export default Upbar