import axios from 'axios';
import React, { Children, useEffect } from 'react'

export const adminContext = React.createContext();

function Admincontext({ children }) {
    let [adminData,setAdminData]=React.useState(null);
    let serverURL = "http://localhost:8000";
    

    const getadmin = async () => {

      try {
        let response = await axios.post(`${serverURL}/api/user/getAdmin`, {
            withCredentials: true,
        });
  
        setAdminData(response.data);
        console.log("Admin data fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    }

    useEffect(() => {
      getadmin();
    }, []);

    let value = {adminData,setAdminData,getadmin};


  return (
    <>
    <adminContext.Provider value={value}>
        {children}
    </adminContext.Provider>
    </>
  )
}

export default Admincontext