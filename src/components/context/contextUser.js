
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({
    email: '',
    isAuth: false 
  });

  const loginContext = (email, token) => {
    setUserAuth({
        email,
        isAuth: true
    });
    localStorage.setItem("token", token)
    localStorage.setItem("email", email)
  };

  const logoutContext = () => {
    setUserAuth({
        email: '',
        isAuth: false
    });
    localStorage.removeItem("token")
    localStorage.removeItem("email")
  };

  return (
    <AuthContext.Provider value={{ userAuth, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
export default AuthProvider
