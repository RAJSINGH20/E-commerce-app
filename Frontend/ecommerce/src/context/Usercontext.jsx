import React, { createContext, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthDataContext } from './Authcontext.jsx';

export const userdataContext = createContext();

function Usercontext({ children }) {
  let [user, Setuser] = useState(null);
  const { serverURL } = useContext(AuthDataContext);

  const getcurrentuser = async () => {
    try {
      console.log("Attempting to fetch current user data...");
      // ✅ Use GET and move withCredentials into config
      let result = await axios.get(`${serverURL}/api/user/getcurrentUser`, {
        withCredentials: true,
      });
      Setuser(result.data);
      console.log("Current user data fetched:", result.data);
    } catch (error) {
      console.log(`Error fetching current user: ${error.message}`);
      Setuser(null);
    }
  };

  useEffect(() => {
    getcurrentuser();
  }, []);

  let value = { user, Setuser, getcurrentuser };

  return (
    <userdataContext.Provider value={value}>
      {children}
    </userdataContext.Provider>
  );
}

export default Usercontext;
