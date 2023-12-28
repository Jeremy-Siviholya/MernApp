import * as React from 'react'
import { Users } from './components/Users/Users';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Upbar from './components/Upbar/Upbar';
import { BrowserRouter as Router} from 'react-router-dom'
import AnimateRoutes from './components/Routes/animateRoutes';
import Blob from './components/Blobs/Blob';
import { ThemeProvider, createTheme, IconButton } from '@mui/material';
import {BiSolidMoon, BiSolidSun } from 'react-icons/bi';
import { DarkModeContext } from './components/Contexts/DarkModeContext';

const App = () => {
const {darkMode,toggle}=React.useContext(DarkModeContext)


  const theme = createTheme({
    palette: {
      mode: darkMode ? "light" : "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AnimateRoutes />
        <div
          className={`${
            darkMode ? "bg-gray-200 " : "bg-black/30"
          } flex justify-center relative items-center h-screen w-screen`}
        >
          <Blob />
          <div className="space-y-10 absolute right-16 w-40 text-center h-40 ">
            <div className="flex justify-center my-6">
              <div
                className={` ${
                  !darkMode ? "bg-white/70" : "bg-white/60"
                }  rounded-full  flex justify-center w-10 h-10  items-center `}
              >
                <IconButton onClick={toggle}>
                  {darkMode ? (
                    <BiSolidSun />
                  ) : (
                    <BiSolidMoon className="text-gray-500" />
                  )}
                </IconButton>
              </div>
            </div>
            <div className={`font-semibold ${darkMode ?'text-gray-600':'text-white'}`}>
              <p>{darkMode ? "LIGHT" : "DARK"}</p>
            </div>
          </div>
          <Upbar />
          <Users />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={!darkMode?'dark':'light'}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App