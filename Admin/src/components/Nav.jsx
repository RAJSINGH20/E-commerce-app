import React from 'react';
import { useNavigate } from 'react-router-dom';
import vcart_logo from '../assets/vcart_logo.png';
import axios from 'axios';

const Nav = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const serverURL = "http://localhost:8000";
    try {
      const response = await axios.post(
        `${serverURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white flex items-center justify-between px-6 shadow-lg z-50">
      {/* Left section: Logo and title */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={vcart_logo} alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </div>

      {/* Right section: Logout button */}
      <button
        type="button"
        onClick={logoutHandler}
        className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md text-sm font-medium"
      >
        Logout
      </button>
    </nav>
  );
};

export default Nav;
