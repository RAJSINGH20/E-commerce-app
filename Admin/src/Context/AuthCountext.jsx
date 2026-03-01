import React from 'react'
import dotenv from 'dotenv';


export const AuthDataContext = React.createContext();

function AuthProvider({ children }) {

    let serverURL = "https://e-commerce-app-mu-lemon.vercel.app/";

    let value = {serverURL};
  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  )
}

export default AuthProvider;