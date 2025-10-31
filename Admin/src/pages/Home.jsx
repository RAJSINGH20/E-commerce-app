import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 to-lime-900">
    <Nav />
    <Sidebar />
      <h1 className="text-4xl font-bold">Home</h1>
    </div>
  )
}

export default Home