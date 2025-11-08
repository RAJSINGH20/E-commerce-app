// Usercontext.jsx
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthDataContext } from "./Authcontext.jsx"; // keep extension consistent

export const userdataContext = createContext();

const Usercontext = ({ children }) => {
  let [userData, setUserData] = useState(null);
  const { serverURL } = useContext(AuthDataContext); // <--- destructure

  const getcurrentuser = async () => {
    try {
      console.log("Fetching current user...");
      const result = await axios.get(`${serverURL}/api/user/get`, { withCredentials: true });
      setUserData(result.data);
      console.log("User fetched:", result.status);
    } catch (error) {
      console.error("Error fetching current user:", error.message);
      setUserData(null);
    }
  };

  useEffect(() => {
    getcurrentuser();
  }, []);

  const value = { userData, setUserData, getcurrentuser };
  return (
    <userdataContext.Provider value={value}>
      {children}
    </userdataContext.Provider>
  );
};

export default Usercontext;
