import React from 'react'
import { Users } from './components/Users/Users';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Upbar from './components/Upbar/Upbar';
import { Pagination } from './components/Users/Pagination';

const App = () => {
  return (
    <div className="bg-[#323232] flex justify-center relative items-center h-screen w-screen">
      <Upbar/>
      <Users />
      <Pagination/>
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
        theme='dark'
      />
    </div>
  );
}

export default App