import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./Authcontext";
import axios from "axios";

// ✅ Create context properly
export const ShopDataContext = createContext();

const ShopContainer = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { serverURL } = useContext(AuthDataContext); // ✅ Get serverURL from Auth context
  let [cartitem , setcartitem]= useState({})
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

  const addtocart = (itemid, size)=>{
    if(!size){
      console.log("select product size")
      return
}
    let cartData = structuredClone(cartitem)

    if(cartData[itemid]){

      if(cartData[itemid][size]){
        cartData[itemid][size]+=1
      }else{
        cartData[itemid][size]=1
      }
    }else{
      cartData[itemid]={}
      cartData[itemid][size]=1
    }
    setcartitem(cartData)
    console.log(cartData)

  }
  const getcardcount = () => {
  let totalcount = 0;
  for (const itemId in cartitem) {
    for (const size in cartitem[itemId]) {
      try {
        if (cartitem[itemId][size] > 0) {
          totalcount += cartitem[itemId][size];
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return totalcount; // Ensure you return the total count
};



  useEffect(() => {
    getProductsData();
  }, []);

  const value = { products, currency, deliveryfees, getProductsData , cartitem ,addtocart, getcardcount ,setcartitem ,  };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContainer;
