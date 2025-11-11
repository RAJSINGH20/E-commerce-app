import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./Components/Nav.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";

const App = () => {
  const location = useLocation(); // ✅ React Router hook
  const hideNav =
    location.pathname === "/login" || location.pathname === "/Registration";

  return (
    <>
      {/* ✅ Navbar visible on all pages except login/register */}
      {!hideNav && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Collection" element={<Collection />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ProductDetails/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
      </Routes>
    </>
  );
};

export default App;
