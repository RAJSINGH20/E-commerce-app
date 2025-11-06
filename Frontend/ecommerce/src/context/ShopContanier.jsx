import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./Authcontext.jsx";
import { userdataContext } from "./Usercontext.jsx";
import axios from "axios";

export const ShopDataContext = createContext();

const ShopContainer = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { serverURL } = useContext(AuthDataContext);
  const { user } = useContext(userdataContext) || {}; // ✅ safe destructuring
  const [cartitem, setcartitem] = useState({});
  const currency = "INR";
  const deliveryfees = 50;

  const getProductsData = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/product/GetProducts`,{withCredentials:true});
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  const addtocart = async (itemid, size) => {
    if (!size) {
      console.log("Select product size");
      return;
    }

    let cartData = structuredClone(cartitem);
    if (cartData[itemid]) {
      if (cartData[itemid][size]) {
        cartData[itemid][size] += 1;
      } else {
        cartData[itemid][size] = 1;
      }
    } else {
      cartData[itemid] = {};
      cartData[itemid][size] = 1;
    }

    setcartitem(cartData);
    console.log("Updated cart:", cartData);

    if (!user) {
      console.log(user)
      try {
        let result=await axios.post(
          `${serverURL}/api/cart/get`,
          { itemid, size },
          { withCredentials: true }
        );
        console.log("Item added to cart successfully",result.data);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  const getUserCart = async()=>{
    try {
      const result = await axios.post(`${serverURL}/api/cart/get`,{},{withCredentials:true})

      setcartitem(result.data)
    } catch (error) {
      console.log("get use cart is not loaded" ,error.message)
    }

  }

  const getcardcount = () => {
    let totalcount = 0;
    for (const itemId in cartitem) {
      for (const size in cartitem[itemId]) {
        totalcount += cartitem[itemId][size];
      }
    }
    return totalcount;
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
   getUserCart()
  }, []);

  const value = {
    products,
    currency,
    deliveryfees,
    getProductsData,
    cartitem,
    addtocart,
    getcardcount,
    setcartitem,
  };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContainer;
