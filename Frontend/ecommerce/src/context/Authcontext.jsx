import React from 'react'


export const AuthDataContext = React.createContext();

function AuthProvider({ children }) {

    let serverURL = "http://localhost:8000";

    let value = {serverURL};
  return (
    <AuthDataContext.Provider value={value}>
      {children}
    </AuthDataContext.Provider>
  )
}

export default AuthProvider;