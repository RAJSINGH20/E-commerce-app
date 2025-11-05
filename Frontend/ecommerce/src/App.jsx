import React from 'react'
import Registration from './pages/Registration.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Nav from './Components/Nav.jsx'
import Collection from './pages/Collection.jsx'
import Product from './pages/Product.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

const App = () => {
  const hideNav = location.pathname === '/login' || location.pathname === '/Registration';
  return (
    <>
      {/* ✅ Navbar visible only when logged in and not on login/register pages */}
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
      </Routes>
    </>
  )
}

export default App