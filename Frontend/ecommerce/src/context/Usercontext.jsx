
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthDataContext } from "./AuthDataContext.jsx";
import { userdataContext as UserDataContext } from "./UserDataContext.jsx";

const Usercontext = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { serverURL } = useContext(AuthDataContext);

  const getcurrentuser = useCallback(async () => {
    try {
      console.log("Fetching current user..........");
      const result = await axios.post(`${serverURL}/api/user/getcurrentUser`, {}, { withCredentials: true });

      setUserData(result.data);
      console.log("User fetched:", result.status);
    } catch (error) {
      console.error("Error fetching current user:", error.message);
      setUserData(null);
      // setUserData(null);
    }
  }, [serverURL]);

  useEffect(() => {
    getcurrentuser();
  }, [getcurrentuser]);

  const value = { userData, setUserData, getcurrentuser };
  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default Usercontext;
