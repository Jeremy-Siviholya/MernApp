import * as React from 'react'
import ky from 'ky'

function App() {
  const [ListUsers,setListUsers]=React.useState([])
  ky.get('',)
  return (
    <div className="bg-[linear-gradient(145deg,#39A7FF,pink)] w-[100vw] h-[100vh]"></div>
  );
}

export default App;
