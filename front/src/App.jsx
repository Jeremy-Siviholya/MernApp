import * as React from 'react'
import "react-toastify/dist/ReactToastify.css";
import AnimateRoutes from './components/Routes/animateRoutes';
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
    
        <AnimateRoutes />
     
    </ThemeProvider>
  );
}

export default App