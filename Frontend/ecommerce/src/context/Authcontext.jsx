import React, { createContext } from "react";

export const AuthDataContext = createContext();

const AuthDataContextProvider = ({ children }) => {
  const serverURL = "http://localhost:8000"; // your backend URL
  return (
    <AuthDataContext.Provider value={{ serverURL }}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthDataContextProvider;
