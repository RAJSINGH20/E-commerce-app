import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./Authcontext";
import axios from "axios";

// ✅ Create context properly
export const ShopDataContext = createContext();

const ShopContainer = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { serverURL } = useContext(AuthDataContext); // ✅ Get serverURL from Auth context
  const currency = "INR";
  const deliveryfees = 50;

  const getProductsData = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/product/GetProducts`);
      setProducts(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = { products, currency, deliveryfees, getProductsData };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContainer;
