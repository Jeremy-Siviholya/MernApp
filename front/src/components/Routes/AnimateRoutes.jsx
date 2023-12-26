import {Routes,Route} from 'react-router-dom'
import App from '../../App';
import UpdateUser from '../Users/updateUser';

const AnimateRoutes = () => {
  return (
    <Routes>
      <Route path="/updateUser/:id" element={<UpdateUser />} />
    </Routes>
  );
}

export default AnimateRoutes