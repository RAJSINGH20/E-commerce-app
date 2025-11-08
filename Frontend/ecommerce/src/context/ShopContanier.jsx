// ShopContainer.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./Authcontext.jsx";
import { userdataContext } from "./Usercontext.jsx";
import axios from "axios";

export const ShopDataContext = createContext();

const ShopContainer = ({ children }) => {
  const [products, setProducts] = useState([]);
  const { serverURL } = useContext(AuthDataContext);
  const { userData } = useContext(userdataContext);
  const [cartitem, setcartitem] = useState({});
  const currency = "INR";
  const deliveryfees = 50;

  const getProductsData = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/product/GetProducts`, { withCredentials: true });
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

    // local cart update
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
    console.log("Updated cart (local):", cartData);

    if (userData) {
      try {
        // NOTE: use /add endpoint and match backend field names
        const result = await axios.post(
          `${serverURL}/api/cart/add`,
          { itemId: itemid, size },
          { withCredentials: true }
        );
        console.log("Item added to cart successfully", result.data);
        // update local cart with server response (if sent)
        if (result.data?.cart) {
          setcartitem(result.data.cart);
        } 
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  const getUserCart = async () => {
    try {
      console.log("entered get user cart");
      const result = await axios.post(`${serverURL}/api/cart/get`, {}, { withCredentials: true });
      setcartitem(result.data);
    } catch (error) {
      console.log("get user cart is not loaded", error.message);
    }
  };
  const updatequantity = async(itemId , size , quantity)=>{
    try {
      let cartData= structuredClone(cartitem)
      cartData[itemId][size]= quantity
      setcartitem(cartData)

      if(userData){
        try {
          await axios.post(serverURL+'/api/cart//update',{itemId,size,quantity},{withCredentials:true})
        } catch (error) {
          console.log(error)
        }
      }

    } catch (error) {
      console.log("error",error)
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
    getUserCart();
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
    updatequantity,
  };

  return <ShopDataContext.Provider value={value}>{children}</ShopDataContext.Provider>;
};

export default ShopContainer;
