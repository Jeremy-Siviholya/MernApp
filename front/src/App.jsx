import React from 'react'
import { Users } from './components/Users/Users';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Upbar from './components/Upbar/Upbar';
import { BrowserRouter as Router} from 'react-router-dom'
import AnimateRoutes from './components/Routes/animateRoutes';
import Blob from './components/Blobs/Blob';



const App = () => {
  return (
    <Router>
      <AnimateRoutes />
      <div className="bg-gray-200 flex justify-center relative items-center h-screen w-screen">
        <Blob/>
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
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App