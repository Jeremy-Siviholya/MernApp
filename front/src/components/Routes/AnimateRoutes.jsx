import {Routes,Route} from 'react-router-dom'
import App from '../../App';
import UpdateUser from '../Users/updateUser';
import Login from '../Auth/Login';

const AnimateRoutes = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login/>} />
      <Route path="/updateUser/:id" element={<UpdateUser />} />
    </Routes>
  );
}

export default AnimateRoutes