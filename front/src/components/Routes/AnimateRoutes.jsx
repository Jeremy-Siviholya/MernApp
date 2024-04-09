import {Routes,Route, createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from '../../App';
import UpdateUser from '../Users/updateUser';
import Login from '../Auth/Login';
import Error404 from '../Errors/Error404';

import Root from '../Root/Root';
import Users from '../Users/Users';
import Galery from '../Galery/Galery';

const router=createBrowserRouter([
  {
    path:'/',
    element:<Root/>,
    errorElement:<Error404/>,
  children:[
{
  path:'/users',
  element:<Users/>
},

{
  path:'/galery',
  element:<Galery/>
}

  ]


  },
  {
    path:'/Login',
    element:<Login/>,
  }
])

const AnimateRoutes = () => {
  return (
    <RouterProvider router={router}/>
    // <Routes>
    //   <Route path="/Login" element={<Login />} />
      
    //   <Route path="/updateUser/:id" element={<UpdateUser />} />
    // </Routes>
  );
}

export default AnimateRoutes