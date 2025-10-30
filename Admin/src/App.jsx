import React from 'react'
import Home from './pages/Home'
import Add from './pages/Add'
import Orders from './pages/Orders'
<<<<<<< HEAD
import Login from './pages/Login.jsx'
=======
import Login from './pages/Login'
>>>>>>> fdeddd59e69d173203b5f8895a1c23359ea30fb5
import List from './pages/List'
import { Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </div>
    )
}

export default App