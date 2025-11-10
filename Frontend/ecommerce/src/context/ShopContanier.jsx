// ShopContainer.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthDataContext } from "./Authcontext.jsx";
import { userdataContext } from "./Usercontext.jsx";
import axios from "axios";

export const ShopDataContext = createContext();

const ShopContainer = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartitem, setcartitem] = useState({});
  const { serverURL } = useContext(AuthDataContext);
  const { userData } = useContext(userdataContext);

  const currency = "INR";
  const deliveryfees = 50;

  // ✅ Fetch all products
  const getProductsData = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/product/GetProducts`, {
        withCredentials: true,
      });
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
  };

  // ✅ Add item to cart
  const addtocart = async (itemId, size) => {
    if (!size) {
      console.log("Select product size");
      return;
    }

    // local cart update
    const cartData = structuredClone(cartitem);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setcartitem(cartData);
    console.log("Updated cart (local):", cartData);

    // sync with backend if user logged in
    if (userData) {
      try {
        const result = await axios.post(serverURL+"/api/cart/add",{ itemId, size },{ withCredentials: true });
        console.log("Item added to cart successfully:", result.data);

        if (result.data?.cart) setcartitem(result.data.cart);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      console.log("User not logged in");
    }
  };

  // ✅ Get user cart from backend
  const getUserCart = async () => {
    try {
      console.log("Fetching user cart...");
      const result = await axios.post(serverURL+"/api/cart/get",{},{ withCredentials: true }
      );
      setcartitem(result.data);
    } catch (error) {
      console.log("Error loading user cart:", error.message);
    }
  };

  // ✅ Update quantity of item
  const updatequantity = async (itemId, size, quantity) => {
    try {
      const cartData = structuredClone(cartitem);
      cartData[itemId][size] = quantity;
      setcartitem(cartData);

      if (userData) {
        await axios.post(
          `${serverURL}/api/cart/update`,
          { itemId, size, quantity },
          { withCredentials: true }
        );
      }
    } catch (error) {
      console.log("Error updating quantity:", error);
    }
  };

  

  const getcartCount = ()=>{
    try {
      let totalamount=0
      for (const items in cartitem) {
        let iteminfo = products.find((products)=>products._id ===items)
        for(const item in cartitem[items]){
          try {
            if(cartitem[items][item] >0){
              totalamount+= iteminfo.price * cartitem[items][item]
            }
          } catch (error) {
            console.log("error",error)
          }
        }
      }
      return totalamount
    } catch (error) {
      console.log("error",error)
    }
  }

  // ✅ useEffects
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
    cartitem,
    addtocart,
    setcartitem,
    updatequantity,
    getcartCount
  };

  return (
    <ShopDataContext.Provider value={value}>
      {children}
    </ShopDataContext.Provider>
  );
};

export default ShopContainer;
