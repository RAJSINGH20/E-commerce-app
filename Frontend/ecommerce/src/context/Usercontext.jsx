import React, { createContext, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthDataContext } from './Authcontext';

export const userdataContext = createContext();

function Usercontext({ children }) {
  const [userdata, setuserdata] = useState(null);
  const { serveruri } = useContext(AuthDataContext);

  const getcurrentuser = async () => {
    try {
      const result = await axios.get(`${serveruri}/api/user/getcurrentUser`, { withCredentials: true });
      setuserdata(result.data);
      console.log("Current user data fetched:", result.data.message);
    } catch (error) {
      console.log(`Error fetching current user: ${error.message}`);
    }
  };

  useEffect(() => {
    getcurrentuser();
  }, []);

  const value = { userdata, setuserdata };

  return (
    <userdataContext.Provider value={value}>
      {children}
    </userdataContext.Provider>
  );
}

export default Usercontext;
