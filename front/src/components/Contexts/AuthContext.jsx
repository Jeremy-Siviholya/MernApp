import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async () => {
    window.open('http://localhost:7780/auth/google/callback','_self')
    setAuth(true);
  };


  const loginAuth = async () => {
    window.open('http://localhost:7780/auth/github/callback','_self')
    setAuth(true);
  };

  const logout=async ()=>{
    window.open('http://localhost:7780/auth/logout','_self')
    setAuth(false)
  }



 



  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')) ||   false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem('auth',JSON.stringify(auth))
  }, [currentUser,auth]);

  return (
    <AuthContext.Provider value={{ currentUser, login, auth,setAuth,loginAuth,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
