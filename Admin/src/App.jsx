import React from 'react'
import Home from './pages/Home'
import Add from './pages/Add'
import Orders from './pages/Orders'
import Login from './pages/Login'
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