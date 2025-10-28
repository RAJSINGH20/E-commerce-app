import React, { createContext, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthDataContext } from './Authcontext';

export const userdataContext = createContext();

function Usercontext({ children }) {
  let [user, Setuser] = useState(null);
  const { serverURL } = useContext(AuthDataContext);

  const getcurrentuser = async () => {
    try {
      console.log("Attempting to fetch current user data...");
      let result = await axios.post(`${serverURL}/api/user/getcurrentUser`, { withCredentials: true });
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

  let value = { user, Setuser , getcurrentuser};

  return (
    <div>
      <userdataContext.Provider value={value}>
        {children}
      </userdataContext.Provider>
    </div>
  );
}

export default Usercontext;
