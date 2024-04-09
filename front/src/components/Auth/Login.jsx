import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiLightning } from "react-icons/si";
import { MdLightMode } from "react-icons/md";
import { AuthContext } from "../Contexts/AuthContext";
import { DarkModeContext } from "../Contexts/DarkModeContext";
import googleicon from '../../assets/google.png'
import githubicon from '../../assets/github.png'

export default function Login() {

 const { login,loginAuth } = React.useContext(AuthContext);

 const { darkMode, toggle } = React.useContext(DarkModeContext);


  return (
    <div
      className={`${
        darkMode ? "bg-gray-100" : "bg-[#363636]"
      } h-screen w-screen flex justify-center relative items-center`}
    >
      <div className="absolute top-0 w-full flex justify-center">
        <button
          onClick={toggle}
          className={`h-14  ${
            !darkMode ? "text-gray-200" : "text-gray-600"
          }  uppercase font-semibold flex items-center justify-start space-x-4 px-2`}
        >
          {!darkMode ? (
            <SiLightning className="text-[25px]" />
          ) : (
            <MdLightMode className="text-[25px]" />
          )}
          <span>{!darkMode ? "Dark" : "Light"}</span>
        </button>
      </div>

      <div
        className={`${
          darkMode ? "bg-white border-blue-600" : "bg-black/60 border-gray-300"
        }  rounded-md backdrop-blur-md  shadow-lg absolute  h-[400px] w-[400px]   overflow-hidden`}
      >
        <div
          className={`${
            darkMode ? "border-gray-300" : "border-gray-600"
          }  h-[20%] border-b flex justify-center items-center  relative`}
        >
          <h1
            className={`text-xl ${
              darkMode ? "text-gray-600" : "text-gray-200"
            }  font-semibold`}
          >
            SIGN IN
          </h1>
        </div>
        <div className="h-[80%] flex pt-16 ">
          <div className="space-y-10 w-full px-10 ">
            <div className="flex justify-center">

          <button  onClick={login}
          className="bg-violet-100 shadow-sm border px-3 py-2 flex items-center gap-4 rounded-full text-gray-600 uppercase font-semibold"
          >
           <img src={googleicon} className="w-6 h-6" alt="" />
           <span>Google</span>
          </button>
            </div>

          <div className="h-1 bg-gray-300 w-full relative divider ">

          </div>
          <div className="flex justify-center">
          <button  onClick={loginAuth}
          className="bg-violet-100 shadow-sm border px-3 py-2 flex items-center gap-4 rounded-full text-gray-600 uppercase font-semibold"
          >
           <img src={githubicon} className="w-6 h-6" alt="" />
           <span>Github</span>
          </button>
          </div>
        
          </div>
        
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
