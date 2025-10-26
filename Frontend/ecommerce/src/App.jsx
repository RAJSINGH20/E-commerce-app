import React from 'react'
import Registration from './pages/Registration.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Nav from './Components/Nav.jsx'

const App = () => {
  return (
    <>
    <Nav />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    </>
  )
}

export default App