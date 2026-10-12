import React from 'react'
import './App.css'
import Add from './pages/Add.jsx'
import Login from './pages/Login.jsx'
import List from './pages/List'
import { Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <div className="admin-app">
        
            <Routes>
                <Route path="/" element={<Add />} />
                <Route path="/login" element={<Login />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </div>
    )
}

export default App