import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AuthDataContext } from "../context/Authcontext.jsx";
import { ShopDataContext } from "../context/ShopContanier.jsx";

const Navbar = ({ userdata, onLogout }) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [showMenu, setShowMenu] = React.useState(false);
  const { serverURL } = React.useContext(AuthDataContext);
  const { getcardcount } = React.useContext(ShopDataContext);

  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowSearch(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowSearch(false);
    setShowDropdown(false);
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert("Logged out successfully!");
        if (onLogout) onLogout();
        navigate("/login");
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error while logging out. Try again!");
    }
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-3 bg-[#e7f1ef] shadow-md">
        {/* Left - Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="logo"
            className="w-6 h-6"
          />
          <div className="text-xl font-semibold text-gray-700">OneCart</div>
        </div>

        {/* Middle - Links (Hidden on mobile) */}
        <div className="hidden md:flex gap-4">
          <Link
            to="/"
            className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition"
          >
            HOME
          </Link>
          <Link
            to="/Collection"
            className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition"
          >
            COLLECTIONS
          </Link>
          <Link
            to="/About"
            className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition"
          >
            ABOUT
          </Link>
          <Link
            to="/Contact"
            className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-900 transition"
          >
            CONTACT
          </Link>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 text-gray-700 text-xl relative">
          {/* Search */}
          <div
            className="cursor-pointer hover:text-gray-900"
            onClick={toggleSearch}
          >
            <FaSearch />
          </div>

          {/* Profile */}
          
            <div
              className="cursor-pointer hover:text-gray-900"
              onClick={toggleDropdown}
            >
              <FaUserCircle />
            </div>
          

          {/* Cart */}
          <div className="relative cursor-pointer hover:text-gray-900">
            <FaShoppingCart />
            <div className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
              {getcardcount()}
            </div>
          </div>

          {/* Hamburger (Mobile only) */}
          <div
            className="md:hidden cursor-pointer hover:text-gray-900"
            onClick={toggleMenu}
          >
            {showMenu ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200 absolute top-14 left-0 w-full z-10 animate-slideDown">
          <div className="flex flex-col gap-3 p-4">
            <Link
              to="/"
              className="bg-gray-800 text-white px-4 py-2 rounded-full text-center text-sm hover:bg-gray-900 transition"
              onClick={() => setShowMenu(false)}
            >
              HOME
            </Link>
            <Link
              to="/Collection"
              className="bg-gray-800 text-white px-4 py-2 rounded-full text-center text-sm hover:bg-gray-900 transition"
              onClick={() => setShowMenu(false)}
            >
              COLLECTIONS
            </Link>
            <Link
              to="/About"
              className="bg-gray-800 text-white px-4 py-2 rounded-full text-center text-sm hover:bg-gray-900 transition"
              onClick={() => setShowMenu(false)}
            >
              ABOUT
            </Link>
            <Link
              to="/Contact"
              className="bg-gray-800 text-white px-4 py-2 rounded-full text-center text-sm hover:bg-gray-900 transition"
              onClick={() => setShowMenu(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}

      {/* Search Panel */}
      {showSearch && (
        <div className="absolute right-6 top-16 bg-white border border-gray-300 rounded-xl shadow-md p-4 w-64 z-20">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="flex-1 outline-none px-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400"
            />
            <div
              className="bg-gray-800 text-white px-3 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-900"
              onClick={() => alert(`Searching for: ${searchValue}`)}
            >
              Go
            </div>
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showDropdown && (
        <div className="absolute right-6 top-16 bg-white border border-gray-300 rounded-xl shadow-md p-3 w-40 z-20">
          <div
            className="text-gray-800 text-sm py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
