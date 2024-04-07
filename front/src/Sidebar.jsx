import * as React from 'react'
import { NavLink } from 'react-router-dom'
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";


import DashBoardIcon from '@mui/icons-material/Dashboard'



function Sidebar({open,darkMode}) {

    
  const menus = [
    {
      name: "DashBoard",
      link: "/",
      icon: DashBoardIcon,
      margin: true,
    },
    {
      name: "Users",
      link: "/Users",
      icon: AssignmentIndIcon,
      margin: true,
    },
    {
      name: "Personnel",
      link: "/Teacher",
      icon: AssignmentIcon,
      margin: true,
    },
    {
      name: "Notes",
      link: "/Notes",
      icon: AssignmentTurnedInIcon,
      margin: true,
    },
    {
      name: "Paiement",
      link: "/Fee",
      icon: MonetizationOnSharpIcon,
      margin: true,
    },
    // {
    //   name: "Users",
    //   link: "/Users",
    //   icon: UseIcon,
    //   margin: true,
    // },
  ];
  
  return (
    <div
    className={`${
      darkMode ? "bg-purple-200 shadow-md " : "bg-[#212121]  to-purple-800  shadow-md border-r-[0.1px] border-gray-500  text-gray-200"
    }  ${
      open ? "w-[4.5rem]" :'w-60 '
    }  duration-500    h-full px-4`}
  >

    <div
      className={`pt-28 flex flex-col gap-2 relative ${open && "mx-auto"} `}
    >
      {menus.map((menu, i) => (
      
          <NavLink 
          
          // className={({isActive})=>isActive? 'bg-pink-500':''}
            to={menu.link}
            key={i}
            className={`${menu?.margin && "mt-7"} 
            
            ${
              darkMode
                ? "hover:bg-blue-100  text-gray-600 "
                : "hover:bg-gray-600 "
            } ${
              menu.marge && "mt-[8rem] mb-10"
            } group flex items-center  text-sm gap-[25px] font-semibold     p-2  rounded-md`}
          >
            <div>{React.createElement(menu.icon, { size: "25" })}</div>
            <h2
              style={{ transitionDelay: `${i + 3} 500ms` }}
              className={`whitespace-pre duration-500  ${
                open && "opacity-0 translate-x-28    overflow-hidden "
              }`}
            >
              {menu.name.toUpperCase()}
            </h2>
            <h2
                className={` ${!open && "hidden"} ${
                  darkMode ? "bg-gray-600 fixed opacity-90   left-48 overflow-hidden":"bg-gray-600 overflow-hidden opacity-90 fixed left-48 "
                }  font-semibold whitespace-pre
                            text-gray-200 rounded-sm drop-shadow-lg px-0 py-0 w-0  group-hover:px-2 group-hover:py-1 group-hover:left-[4rem]
                             group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
          </NavLink>
      
      ))}
    </div>
  </div>
  )
}

export default Sidebar