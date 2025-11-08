<<<<<<< HEAD
// Usercontext.jsx
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthDataContext } from "./Authcontext.jsx"; // keep extension consistent
=======
import React, { createContext, useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthDataContext } from "./Authcontext.jsx";
>>>>>>> 4527c894244b91a310113a385744b68fb90161bc

export const userdataContext = createContext();

const Usercontext = ({ children }) => {
  let [userData, setUserData] = useState(null);
<<<<<<< HEAD
  const { serverURL } = useContext(AuthDataContext); // <--- destructure

  const getcurrentuser = async () => {
    try {
      console.log("Fetching current user...");
      const result = await axios.get(`${serverURL}/api/user/get`, { withCredentials: true });
=======
  const serverURL = useContext(AuthDataContext)

  const getcurrentuser = async () => {
    try {
      console.log("Fetching current user..........");
      const result =await axios.get(serverURL + "/api/user/getcurrentUser", { withCredentials: true })

>>>>>>> 4527c894244b91a310113a385744b68fb90161bc
      setUserData(result.data);
      console.log("User fetched:", result.status);
    } catch (error) {
      console.error("Error fetching current user:", error.message);
<<<<<<< HEAD
      setUserData(null);
=======
      // setUserData(null);
>>>>>>> 4527c894244b91a310113a385744b68fb90161bc
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
