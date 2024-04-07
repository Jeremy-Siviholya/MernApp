import * as React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Sidebar";
import { IconButton } from "@mui/material";
import { BiMenu, BiSun } from "react-icons/bi";
import { DarkModeContext } from "../Contexts/DarkModeContext";







export default function Root() {

    const {darkMode,toggle}=React.useContext(DarkModeContext)
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`flex w-screen ${darkMode?'bg-purple-200':'bg-[#202020]'}  overflow-hidden `}>
      <div className={`fixed top-0 w-full h-20  ${darkMode?'bg-purple-200':'bg-[#242424]'}  z-50`}>
        <div className="w-full h-full px-7 flex items-center justify-between">
          <IconButton onClick={(e) => setOpen(!open)}>
            <BiMenu className="text-white" />
          </IconButton>


          <IconButton onClick={toggle}>
            <BiSun className="text-white" />
          </IconButton>
        </div>
      </div>
      <div className="h-screen">
        <Sidebar open={open} darkMode={darkMode} />
      </div>

      <div
        className={`${darkMode?'':'bg-[#202020]'}  ${
          !open ? "w-[80%]" : "w-[95%]"
        } h-screen pt-28  flex justify-center`}
      >
        <Outlet />
      </div>
    </div>
  );
}
