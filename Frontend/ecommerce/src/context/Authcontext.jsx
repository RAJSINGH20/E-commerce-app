import React, { createContext } from "react";

export const AuthDataContext = createContext();

const AuthDataContextProvider = ({ children }) => {
  const serverURL = "https://e-commerce-app-xi-kohl.vercel.app/"; // your backend URL
  return (
    <AuthDataContext.Provider value={{ serverURL }}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthDataContextProvider;
