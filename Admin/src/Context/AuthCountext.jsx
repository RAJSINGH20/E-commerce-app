import React from 'react'
import { AuthDataContext } from './AuthDataContext.jsx';

function AuthProvider({ children }) {

    const serverURL = import.meta.env.DEV
      ? "http://localhost:8000"
      : "https://e-commerce-app-mu-lemon.vercel.app";

    const value = {serverURL};
  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  )
}

export default AuthProvider;